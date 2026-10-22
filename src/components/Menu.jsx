import { useEffect, useMemo, useRef, useState } from "react";
import { MENU } from "../data/menu.js";
import { useCart } from "../cart/CartContext.jsx";
import { clean, money } from "../utils.js";
import logo from "../assets/logo.png";
import { IconClose, IconSearch } from "./Icons.jsx";

const PAGE = 8; // productos por tanda: la lista nunca se vuelve interminable
const HOLD_MS = 380;

function Stepper({ product }) {
  const { qtyOf, inc, dec } = useCart();
  const qty = qtyOf(product.id);
  if (qty === 0) {
    return (
      <button className="btn-add" onClick={() => inc(product.id)} aria-label={`Agregar ${product.name}`}>
        Agregar
      </button>
    );
  }
  return (
    <div className="step" role="group" aria-label={product.name}>
      <button onClick={() => dec(product.id)} aria-label={`Quitar una ${product.name}`}>−</button>
      <output aria-live="polite">{qty}</output>
      <button onClick={() => inc(product.id)} aria-label={`Sumar una ${product.name}`}>+</button>
    </div>
  );
}

function Card({ product, onPeek, onPeekEnd }) {
  const [imgOk, setImgOk] = useState(Boolean(product.image));
  const timer = useRef(null);
  const held = useRef(false);

  // Mantener presionado: vista ampliada mientras dura el toque (como en Instagram).
  const start = (e) => {
    if (e.pointerType === "mouse" && e.button !== 0) return;
    held.current = false;
    clearTimeout(timer.current);
    timer.current = setTimeout(() => {
      held.current = true;
      onPeek(product, false);
      navigator.vibrate?.(8);
    }, HOLD_MS);
    const stop = () => {
      clearTimeout(timer.current);
      if (held.current) onPeekEnd();
      window.removeEventListener("pointerup", stop);
      window.removeEventListener("pointercancel", stop);
    };
    window.addEventListener("pointerup", stop);
    window.addEventListener("pointercancel", stop);
  };

  // Toque corto (o clic): vista ampliada fija, para quien no use el toque largo.
  const click = () => {
    if (held.current) {
      held.current = false;
      return;
    }
    onPeek(product, true);
  };

  return (
    <article className="card">
      {imgOk ? (
        <button
          className="card__img"
          onPointerDown={start}
          onClick={click}
          onContextMenu={(e) => e.preventDefault()}
          aria-label={`Ampliar foto de ${product.name}`}
        >
          <img src={product.image} alt="" loading="lazy" decoding="async" draggable="false" onError={() => setImgOk(false)} />
        </button>
      ) : (
        <div className="card__img card__img--ph" aria-hidden="true">
          <img src={logo} alt="" />
        </div>
      )}
      <div className="card__body">
        <h4>{product.name}</h4>
        {product.description && <p>{product.description}</p>}
        <div className="card__foot">
          <span className="price">{money(product.price)}</span>
          <Stepper product={product} />
        </div>
      </div>
    </article>
  );
}

function Peek({ peek, onClose }) {
  const sticky = peek?.sticky;
  useEffect(() => {
    if (!sticky) return;
    const onKey = (e) => e.key === "Escape" && onClose();
    document.body.style.overflow = "hidden";
    window.addEventListener("keydown", onKey);
    return () => {
      document.body.style.overflow = "";
      window.removeEventListener("keydown", onKey);
    };
  }, [sticky, onClose]);

  if (!peek) return null;
  const p = peek.product;
  return (
    <div
      className="peek"
      data-sticky={Boolean(sticky)}
      onClick={sticky ? onClose : undefined}
      role={sticky ? "dialog" : undefined}
      aria-modal={sticky ? "true" : undefined}
      aria-label={sticky ? p.name : undefined}
    >
      <figure>
        <img src={p.image} alt={p.name} draggable="false" />
        <figcaption>
          <h4>{p.name}</h4>
          {p.description && <p>{p.description}</p>}
          <strong>{money(p.price)}</strong>
        </figcaption>
      </figure>
      {sticky && (
        <button className="peek__close" onClick={onClose} aria-label="Cerrar foto"><IconClose /></button>
      )}
    </div>
  );
}

export default function Menu({ banner }) {
  const [cat, setCat] = useState(MENU[0].id);
  const [q, setQ] = useState("");
  const [searching, setSearching] = useState(false);
  const [shown, setShown] = useState(PAGE);
  const [peek, setPeek] = useState(null);
  const listRef = useRef(null);

  const term = clean(q.trim());
  const current = MENU.find((c) => c.id === cat) ?? MENU[0];
  const results = useMemo(
    () =>
      term
        ? MENU.flatMap((c) => c.products).filter(
            (p) => clean(p.name).includes(term) || clean(p.description).includes(term)
          )
        : current.products,
    [term, current]
  );

  useEffect(() => setShown(PAGE), [term, cat]);

  const pick = (id) => {
    setCat(id);
    document.getElementById(`chip-${id}`)?.scrollIntoView({ inline: "center", block: "nearest", behavior: "smooth" });
    // si ya se había bajado por la lista, volver al inicio de la categoría nueva
    requestAnimationFrame(() => {
      const top = listRef.current?.getBoundingClientRect().top ?? 999;
      if (top < 120) window.scrollTo({ top: window.scrollY + top - 130, behavior: "instant" });
    });
  };

  const closeHold = () => setPeek((p) => (p && !p.sticky ? null : p));
  const closeAll = () => setPeek(null);

  return (
    <section className="carta">
      <div className="carta__banner">
        <img src={banner} alt="" />
        <div className="wrap">
          <h1>La carta</h1>
          <p>Una carta para las tres sucursales. Sumá lo que quieras y pedí desde tu mesa.</p>
        </div>
      </div>

      <div className="toolbar">
        <div className="wrap toolbar__in">
          {searching ? (
            <>
              <input
                autoFocus
                type="search"
                value={q}
                onChange={(e) => setQ(e.target.value)}
                placeholder="Buscar en la carta"
                aria-label="Buscar en la carta"
              />
              <button className="iconbtn iconbtn--dark" aria-label="Cerrar búsqueda" onClick={() => { setSearching(false); setQ(""); }}>
                <IconClose />
              </button>
            </>
          ) : (
            <>
              <button className="iconbtn iconbtn--dark" aria-label="Buscar en la carta" onClick={() => setSearching(true)}>
                <IconSearch />
              </button>
              <nav className="chips" aria-label="Categorías">
                {MENU.map((c) => (
                  <button key={c.id} id={`chip-${c.id}`} className="chip" aria-current={cat === c.id} onClick={() => pick(c.id)}>
                    {c.name}
                  </button>
                ))}
              </nav>
            </>
          )}
        </div>
      </div>

      <div className="wrap carta__list" ref={listRef}>
        <h2 className="carta__title">
          {term ? `${results.length} resultado${results.length === 1 ? "" : "s"}` : current.name}
        </h2>

        {results.length === 0 ? (
          <p className="empty">No encontramos “{q}”. Probá con otra palabra.</p>
        ) : (
          <div className="grid">
            {results.slice(0, shown).map((p) => (
              <Card key={p.id} product={p} onPeek={(product, sticky) => setPeek({ product, sticky })} onPeekEnd={closeHold} />
            ))}
          </div>
        )}

        {results.length > shown && (
          <button className="btn-more" onClick={() => setShown((s) => s + PAGE)}>
            Ver más ({results.length - shown})
          </button>
        )}
      </div>

      <Peek peek={peek} onClose={closeAll} />
    </section>
  );
}
