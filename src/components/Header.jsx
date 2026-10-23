import { useCart } from "../cart/CartContext.jsx";
import logo from "../assets/logo.png";
import { navItems, activeKey } from "./BottomNav.jsx";
import { IconCart } from "./Icons.jsx";

export default function Header({ route, slug }) {
  const { count, setOpen } = useCart();
  const active = activeKey(route);
  return (
    <header className="hdr">
      <div className="wrap">
        <a className="brand" href="#/" aria-label="Donata, ir al inicio">
          <img src={logo} alt="" width="40" height="40" />
          Donata
        </a>
        <nav className="hdr__nav" aria-label="Secciones">
          {navItems(slug).map(({ key, label, href }) => (
            <a key={key} href={href} aria-current={active === key ? "page" : undefined}>
              {label}
            </a>
          ))}
        </nav>
        <button className="hdr__cart" onClick={() => setOpen(true)} aria-label={`Abrir pedido, ${count} productos`}>
          <IconCart />
          <span className="hdr__count" data-empty={count === 0}>{count}</span>
        </button>
      </div>
    </header>
  );
}
