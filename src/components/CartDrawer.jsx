import { useEffect, useRef, useState } from "react";
import { useCart } from "../cart/CartContext.jsx";
import { BRANCHES, BRANCH } from "../data/branches.js";
import { buildOrderMessage, money, whatsappUrl } from "../utils.js";
import { IconClose, IconWhatsapp } from "./Icons.jsx";

export default function CartDrawer({ defaultBranch = "desierto" }) {
  const { open, setOpen, lines, count, total, inc, dec, clear } = useCart();
  const [slug, setSlug] = useState(defaultBranch);
  const [mesa, setMesa] = useState("");
  const [sent, setSent] = useState(false);
  const closeRef = useRef(null);

  useEffect(() => setSlug(defaultBranch), [defaultBranch]);

  useEffect(() => {
    if (!open) return;
    document.body.style.overflow = "hidden";
    closeRef.current?.focus();
    const onKey = (e) => e.key === "Escape" && setOpen(false);
    window.addEventListener("keydown", onKey);
    return () => {
      document.body.style.overflow = "";
      window.removeEventListener("keydown", onKey);
    };
  }, [open, setOpen]);

  const branch = BRANCH[slug];
  const mesaOk = /^[A-Za-z0-9]{1,4}$/.test(mesa.trim());
  const ready = count > 0 && mesaOk;
  const href = ready
    ? whatsappUrl(branch, buildOrderMessage({ branch, mesa: mesa.trim(), lines, total }))
    : undefined;

  return (
    <>
      <div className="scrim" data-open={open} onClick={() => setOpen(false)} />
      <aside className="drawer" data-open={open} role="dialog" aria-modal="true" aria-label="Tu pedido">
        <div className="drawer__head">
          <h2>Tu pedido</h2>
          <button ref={closeRef} onClick={() => setOpen(false)} aria-label="Cerrar pedido"><IconClose /></button>
        </div>

        <div className="drawer__body">
          {count === 0 ? (
            <p className="empty">Todavía no sumaste nada. Elegí productos de la carta con el botón “Agregar”.</p>
          ) : (
            <ul className="lines">
              {lines.map(({ product: p, qty }) => (
                <li key={p.id}>
                  <div>
                    <strong>{p.name}</strong>
                    <span>{money(p.price)} c/u</span>
                  </div>
                  <div className="step" role="group" aria-label={p.name}>
                    <button onClick={() => dec(p.id)} aria-label={`Quitar una ${p.name}`}>−</button>
                    <output>{qty}</output>
                    <button onClick={() => inc(p.id)} aria-label={`Sumar una ${p.name}`}>+</button>
                  </div>
                </li>
              ))}
            </ul>
          )}
        </div>

        {count > 0 && (
          <div className="drawer__foot">
            <fieldset className="seg">
              <legend>Sucursal donde estás</legend>
              {BRANCHES.map((b) => (
                <button key={b.slug} type="button" aria-pressed={slug === b.slug} onClick={() => setSlug(b.slug)}>
                  {b.short}
                </button>
              ))}
            </fieldset>

            <label className="mesa">
              Número de mesa
              <input
                value={mesa}
                onChange={(e) => { setMesa(e.target.value); setSent(false); }}
                inputMode="text"
                autoCapitalize="characters"
                enterKeyHint="done"
                maxLength={4}
                placeholder="Ej: 18"
                aria-invalid={mesa !== "" && !mesaOk}
              />
            </label>

            <div className="total"><span>Total</span><strong>{money(total)}</strong></div>

            <a
              className="btn btn--gold btn--block"
              href={href}
              target="_blank"
              rel="noopener noreferrer"
              aria-disabled={!ready}
              onClick={(e) => (ready ? setSent(true) : e.preventDefault())}
            >
              <IconWhatsapp /> Enviar pedido a la cocina
            </a>
            {!mesaOk && <p className="hint">Ingresá tu número de mesa para enviar el pedido.</p>}
            {sent && (
              <p className="hint">
                Se abrió WhatsApp con tu pedido. Enviá el mensaje para confirmarlo.{" "}
                <button className="linkbtn" onClick={() => { clear(); setMesa(""); setSent(false); setOpen(false); }}>
                  Vaciar pedido
                </button>
              </p>
            )}
          </div>
        )}
      </aside>
    </>
  );
}

export function CartBar() {
  const { count, total, open, setOpen } = useCart();
  if (count === 0 || open) return null;
  return (
    <button className="cartbar" onClick={() => setOpen(true)}>
      <span>Ver pedido ({count})</span>
      <strong>{money(total)}</strong>
    </button>
  );
}
