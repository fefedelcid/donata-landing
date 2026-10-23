import { BRANCHES } from "../data/branches.js";

// Barra de pestañas para saltar entre sucursales. Se ve en todas las vistas
// menos en el inicio, y conserva la vista (página o carta) al cambiar.
export default function BranchTabs({ current, carta = false }) {
  return (
    <nav className="bswitch" aria-label="Cambiar de sucursal">
      {BRANCHES.map((b) => (
        <a
          key={b.slug}
          href={`#/${b.slug}${carta ? "/carta" : ""}`}
          style={{ "--acc": b.accent }}
          aria-current={b.slug === current ? "page" : undefined}
        >
          {b.short}
        </a>
      ))}
    </nav>
  );
}
