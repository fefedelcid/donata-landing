import { BRANCH } from "../data/branches.js";
import { IconHome, IconMenu, IconPin, IconStory } from "./Icons.jsx";

export const NAV = [
  { key: "", label: "Inicio", Icon: IconHome },
  { key: "carta", label: "Carta", Icon: IconMenu },
  { key: "sucursales", label: "Sucursales", Icon: IconPin },
  { key: "historia", label: "Historia", Icon: IconStory },
];

// una página de sucursal cuenta como parte de "Sucursales"
export const activeKey = (route) =>
  BRANCH[route] ? "sucursales" : NAV.some((n) => n.key === route) ? route : "";

export default function BottomNav({ route }) {
  const active = activeKey(route);
  return (
    <nav className="bnav" aria-label="Principal">
      {NAV.map(({ key, label, Icon }) => (
        <a key={key} href={`#/${key}`} aria-current={active === key ? "page" : undefined}>
          <Icon />
          {label}
        </a>
      ))}
    </nav>
  );
}
