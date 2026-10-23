import { P_DESIERTO, C_DESIERTO, P_PUNTO, C_PUNTO, P_REFUGIO, C_REFUGIO } from "./donata.js";

// Cada sucursal tiene su propia carta (y sus propios ids de producto).
// Si más adelante se usa la API oficial de fu.do (plan PRO), alcanza con
// llamar a buildMenu(products, categories) con las respuestas en vivo.
const SOURCES = {
  desierto: [P_DESIERTO, C_DESIERTO],
  punto: [P_PUNTO, C_PUNTO],
  refugio: [P_REFUGIO, C_REFUGIO],
};

// Renombres puntuales por sucursal (id de categoría → nombre)
const RENAME = {
  desierto: { 28: "Merchandising y para llevar" },
};

const prettyCategory = (c, slug) => {
  const fixed = RENAME[slug]?.[c.id];
  if (fixed) return fixed;
  // los nombres en MAYÚSCULAS pasan a "Capitalizado"; los demás se respetan
  const base = c.name === c.name.toUpperCase() ? c.name.charAt(0) + c.name.slice(1).toLowerCase() : c.name;
  return base.replace(/t\.?a\.?c\.?c\.?/gi, "TACC");
};

export function buildMenu(products, categories, slug) {
  const byCat = new Map();
  for (const p of products) {
    if (!p.isAvailable) continue;
    if (!byCat.has(p.productCategoryId)) byCat.set(p.productCategoryId, []);
    byCat.get(p.productCategoryId).push({
      id: String(p.id),
      name: p.name.replace(/\s+/g, " ").trim(),
      description: (p.description || "").trim(),
      price: p.price,
      image: p.image || null,
      position: p.position,
    });
  }
  // productos cuya categoría no viene en el listado: van a "Otros" en vez de perderse
  const known = new Set(categories.map((c) => c.id));
  const orphans = [...byCat].filter(([id]) => !known.has(id)).flatMap(([, list]) => list);
  const menu = categories
    .map((c) => ({
      id: String(c.id),
      name: prettyCategory(c, slug),
      position: c.position,
      products: (byCat.get(c.id) || []).sort((a, b) => a.position - b.position),
    }))
    .filter((c) => c.products.length > 0)
    .sort((a, b) => a.position - b.position);
  if (orphans.length) menu.push({ id: "otros", name: "Otros", position: Infinity, products: orphans.sort((a, b) => a.position - b.position) });
  return menu;
}

export const MENUS = Object.fromEntries(
  Object.entries(SOURCES).map(([slug, [p, c]]) => [slug, buildMenu(p.products, c.productCategories, slug)])
);

// clave "sucursal:id" → producto (el carrito guarda los pedidos por sucursal)
export const PRODUCT_BY_KEY = Object.fromEntries(
  Object.entries(MENUS).flatMap(([slug, menu]) =>
    menu.flatMap((c) => c.products).map((p) => [`${slug}:${p.id}`, p])
  )
);
