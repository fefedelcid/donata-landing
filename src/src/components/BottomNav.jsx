import { IconHome, IconMenu } from "./Icons.jsx";

// La carta es individual: "Carta" lleva a la de la última sucursal visitada.
export const navItems = (slug) => [
  { key: "", label: "Inicio", href: "#/", Icon: IconHome },
  { key: "carta", label: "Carta", href: `#/${slug}/carta`, Icon: IconMenu },
];

// "-" = una página de sucursal: ningún ítem queda marcado (lo marcan las pestañas)
export const activeKey = (route) =>
  route === "" ? "" : route.endsWith("/carta") ? "carta" : "-";

export default function BottomNav({ route, slug }) {
  const active = activeKey(route);
  return (
    <nav className="bnav" aria-label="Principal">
      {navItems(slug).map(({ key, label, href, Icon }) => (
        <a key={key} href={href} aria-current={active === key ? "page" : undefined}>
          <Icon />
          {label}
        </a>
      ))}
    </nav>
  );
}
