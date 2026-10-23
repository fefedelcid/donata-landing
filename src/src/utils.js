const fmt = new Intl.NumberFormat("es-AR", {
  style: "currency",
  currency: "ARS",
  maximumFractionDigits: 0,
});
export const money = (n) => fmt.format(n);

export const clean = (s) =>
  s.normalize("NFD").replace(/\p{Diacritic}/gu, "").toLowerCase();

export function buildOrderMessage({ branch, mesa, lines, total }) {
  const rows = lines.map(
    ({ product: p, qty }) => `• ${qty} x ${p.name} — ${money(p.price * qty)}`
  );
  return [
    `*Pedido — ${branch.name}*`,
    ...(mesa ? [`Mesa: *${mesa}*`] : []),
    "",
    ...rows,
    "",
    `*Total: ${money(total)}*`,
  ].join("\n");
}

export const whatsappUrl = (branch, message) =>
  `https://wa.me/${branch.whatsapp}?text=${encodeURIComponent(message)}`;
