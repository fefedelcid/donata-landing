import { useEffect, useMemo, useRef, useState } from "react";
import qrcode from "qrcode-generator";
import { useCart } from "../cart/CartContext.jsx";
import { BRANCH } from "../data/branches.js";
import { buildOrderMessage, money, whatsappUrl } from "../utils.js";
import { IconClose } from "./Icons.jsx";

// El pedido no se envía solo: el cliente genera un QR y el mozo lo escanea.
// Por ahora el QR codifica el link de WhatsApp con el pedido armado (al
// escanearlo se abre el chat de la sucursal con el mensaje listo).
// Para cambiar el destino del QR, editar orderPayload().
// el link va con el texto codificado (%XX): son solo caracteres ASCII, sin problemas de acentos

function makeQr(text) {
  const qr = qrcode(0, "L");
  qr.addData(text);
  qr.make();
  return qr.createSvgTag({ cellSize: 4, margin: 2, scalable: true });
}
export default function CartDrawer() {
  const { slug, open, setOpen, lines, count, total, inc, dec, clear } = useCart();
  const closeRef = useRef(null);
  const [showQr, setShowQr] = useState(false);

  // el QR vuelve a generarse a pedido si cambia el pedido
  const sig = lines.map((l) => `${l.product.id}x${l.qty}`).join(",");
  useEffect(() => setShowQr(false), [sig, slug]);

  const orderPayload = () => {
    const branch = BRANCH[slug];
    return whatsappUrl(branch, buildOrderMessage({ branch, mesa: "", lines, total }));
  };
  const qr = useMemo(() => {
    if (!showQr) return null;
    try {
      return { svg: makeQr(orderPayload()) };
    } catch {
      return { error: true };
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [showQr, sig, slug]);

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
            {!showQr ? (
              <button className="btn btn--gold btn--block" onClick={() => setShowQr(true)}>Generar QR para el mozo</button>
            ) : qr?.error ? (
              <p className="hint">El pedido es demasiado largo para un QR. Probá con menos productos.</p>
            ) : (
              <div className="qr">
                <div className="qr__code" role="img" aria-label="Código QR con tu pedido" dangerouslySetInnerHTML={{ __html: qr.svg }} />
                <button className="linkbtn" onClick={() => setShowQr(false)}>Ocultar QR</button>
              </div>
            )}
            <p className="hint">Mostrale al mozo el QR para que tome tu pedido.</p>
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
