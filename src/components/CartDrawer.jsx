import { useEffect, useRef } from "react";
import { useCart } from "../cart/CartContext.jsx";
import { BRANCH } from "../data/branches.js";
import { money } from "../utils.js";
import { IconClose } from "./Icons.jsx";

// Por ahora el pedido NO se envía por WhatsApp (para evitar spam): es una lista
// para mostrarle al mozo. buildOrderMessage / whatsappUrl siguen en utils.js
// por si se retoma el envío.
export default function CartDrawer() {
  const { slug, open, setOpen, lines, count, total, inc, dec, clear } = useCart();
  const closeRef = useRef(null);

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
            <p className="empty">Todavía no sumaste nada. Elegí productos de la carta de {BRANCH[slug]?.name} con el botón “Agregar”.</p>
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
            <div className="total"><span>Total</span><strong>{money(total)}</strong></div>
            <p className="hint">Por ahora el pedido se hace en el local: mostrale esta lista al mozo.</p>
            <button className="linkbtn" onClick={() => { clear(); setOpen(false); }}>Vaciar pedido</button>
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
