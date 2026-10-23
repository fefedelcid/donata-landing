import { useEffect, useMemo, useRef, useState } from "react";
import { MENUS } from "../data/menu.js";
import { useCart } from "../cart/CartContext.jsx";
import { usePhotos } from "../photos/PhotosContext.jsx";
import { clean, money } from "../utils.js";
import logo from "../assets/logo.png";
import { IconCamera, IconClose, IconSearch } from "./Icons.jsx";

const PAGE = 8; // productos por tanda: la lista nunca se vuelve interminable
const HOLD_MS = 380;

// Botón "tomar foto": en el celular abre la cámara; en la compu, el selector de archivos.
function PhotoButton({ product, children, className = "" }) {
  const { addPhoto } = usePhotos();
  const [busy, setBusy] = useState(false);
  const onChange = async (e) => {
    const file = e.target.files?.[0];
    e.target.value = "";
    if (!file) return;
    setBusy(true);
    try { await addPhoto(product.id, file); } catch { /* foto ilegible: se ignora */ } finally { setBusy(false); }
  };
  return (
    <label className={`photobtn ${className}`} onClick={(e) => e.stopPropagation()}>
      <IconCamera />
      <span>{busy ? "Guardando…" : children}</span>
      <input type="file" accept="image/*" capture="environment" onChange={onChange} disabled={busy} />
    </label>
  );
}

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
  const { photosOf } = usePhotos();
  const [imgOk, setImgOk] = useState(Boolean(product.image));
  // portada: la foto del plato; si no hay, la primera que sacó un cliente
  const cover = (imgOk && product.image) || photosOf(product.id)[0] || null;
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
      {cover ? (
        <button
          className="card__img"
          onPointerDown={start}
          onClick={click}
          onContextMenu={(e) => e.preventDefault()}
          aria-label={`Ampliar foto de ${product.name}`}
        >
          <img src={cover} alt="" loading="lazy" decoding="async" draggable="false" onError={() => setImgOk(false)} />
        </button>
      ) : (
        <div className="card__img card__img--ph">
          <img src={logo} alt="" aria-hidden="true" />
          <PhotoButton product={product} className="photobtn--cover">Sacar foto</PhotoButton>
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

function Peek({ peek, onClose, slug }) {
  const sticky = peek?.sticky;
  const p = peek?.product;
  const { photosOf } = usePhotos();
  const [idx, setIdx] = useState(0);
  const mine = p ? photosOf(p.id) : [];
  // galería: la foto del plato (si hay) + las que sacaron los clientes
  const images = p ? [...(p.image ? [p.image] : []), ...mine] : [];

  useEffect(() => setIdx(0), [p?.id]);
  // al sumar una foto nueva, mostrarla
  useEffect(() => { if (mine.length) setIdx(images.length - 1); }, [mine.length]); // eslint-disable-line react-hooks/exhaustive-deps

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
  const shown = images[Math.min(idx, images.length - 1)] ?? p.image;
  return (
    <div
      className="peek"
      data-sticky={Boolean(sticky)}
      onClick={sticky ? onClose : undefined}
      role={sticky ? "dialog" : undefined}
      aria-modal={sticky ? "true" : undefined}
      aria-label={sticky ? p.name : undefined}
    >
      <figure onClick={(e) => e.stopPropagation()}>
        <img className="peek__main" src={shown} alt={p.name} draggable="false" />
        <figcaption>
          <h4>{p.name}</h4>
          {p.description && <p>{p.description}</p>}
          <strong>{money(p.price)}</strong>
          {sticky && (
            <div className="peek__photos">
              {images.length > 1 && (
                <div className="peek__thumbs" role="group" aria-label="Galería de fotos">
                  {images.map((src, i) => (
                    <button key={i} aria-label={`Ver foto ${i + 1}`} aria-current={i === idx} onClick={() => setIdx(i)}>
                      <img src={src} alt="" draggable="false" />
                    </button>
                  ))}
                </div>
              )}
              <PhotoButton product={p}>Tomar otra foto</PhotoButton>
            </div>
          )}
        </figcaption>
      </figure>
      {sticky && (
        <button className="peek__close" onClick={onClose} aria-label="Cerrar foto"><IconClose /></button>
      )}
    </div>
  );
}

export default function Menu({ branch }) {
  const MENU = MENUS[branch.slug];
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
      if (top < 170) window.scrollTo({ top: window.scrollY + top - 180, behavior: "instant" });
    });
  };

  const closeHold = () => setPeek((p) => (p && !p.sticky ? null : p));
  const closeAll = () => setPeek(null);

  return (
    <section className="carta">
      <div className="carta__banner">
        <img src={branch.hero} alt="" style={{ objectPosition: branch.heroPos }} />
        <div className="wrap">
          <h1>La carta</h1>
          <p>{branch.name}, {branch.area}. <a href={`#/${branch.slug}`}>Conocer la sucursal</a></p>
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

      <Peek peek={peek} onClose={closeAll} slug={branch.slug} />
    </section>
  );
}
