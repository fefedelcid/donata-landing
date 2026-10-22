import { PRODUCTS, CATEGORIES } from "./donata.js";

// Si más adelante se usa la API oficial de fu.do (plan PRO), alcanza con
// llamar a buildMenu(products, categories) con las respuestas en vivo.
const RENAME = {
  19: "Sin TACC",
  28: "Merchandising y para llevar",
  31: "Juegos de mesa",
};

const prettyCategory = (c) =>
  RENAME[c.id] ?? c.name.charAt(0) + c.name.slice(1).toLowerCase();

export function buildMenu(
  products = PRODUCTS.products,
  categories = CATEGORIES.productCategories
) {
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
  return categories
    .map((c) => ({
      id: String(c.id),
      name: prettyCategory(c),
      position: c.position,
      products: (byCat.get(c.id) || []).sort((a, b) => a.position - b.position),
    }))
    .filter((c) => c.products.length > 0)
    .sort((a, b) => a.position - b.position);
}

export const MENU = buildMenu();
export const PRODUCT_BY_ID = Object.fromEntries(
  MENU.flatMap((c) => c.products).map((p) => [p.id, p])
);
