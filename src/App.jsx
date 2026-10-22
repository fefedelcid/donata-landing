import { useEffect, useState } from "react";
import { BRANCH } from "./data/branches.js";
import { CartProvider } from "./cart/CartContext.jsx";
import Header from "./components/Header.jsx";
import BottomNav from "./components/BottomNav.jsx";
import Footer from "./components/Footer.jsx";
import CartDrawer, { CartBar } from "./components/CartDrawer.jsx";
import Home from "./pages/Home.jsx";
import Sucursales from "./pages/Sucursales.jsx";
import Historia from "./pages/Historia.jsx";
import Carta from "./pages/Carta.jsx";
import Branch from "./pages/Branch.jsx";

const VIEWS = { "": Home, carta: Carta, sucursales: Sucursales, historia: Historia };
const TITLES = {
  "": "Donata · Cerveza artesanal de San Juan",
  carta: "La carta · Donata",
  sucursales: "Sucursales · Donata",
  historia: "Nuestra historia · Donata",
};

const readRoute = () => window.location.hash.replace(/^#\/?/, "").split("?")[0];
const readBranch = () => {
  try {
    const s = localStorage.getItem("donata-branch");
    return BRANCH[s] ? s : "desierto";
  } catch {
    return "desierto";
  }
};

export default function App() {
  const [route, setRoute] = useState(readRoute);
  const [lastBranch, setLastBranch] = useState(readBranch);

  useEffect(() => {
    const onChange = () => setRoute(readRoute());
    window.addEventListener("hashchange", onChange);
    return () => window.removeEventListener("hashchange", onChange);
  }, []);

  const branch = BRANCH[route];
  const View = VIEWS[route];

  useEffect(() => {
    window.scrollTo({ top: 0, behavior: "instant" });
    document.title = branch
      ? `${branch.name} · Cerveza artesanal en ${branch.area}`
      : TITLES[route] ?? TITLES[""];
    // cada sucursal recolorea el sitio (ver [data-branch] en styles.css)
    if (branch) document.documentElement.dataset.branch = branch.slug;
    else delete document.documentElement.dataset.branch;
    // el pedido se envía por defecto a la última sucursal visitada
    if (branch) {
      setLastBranch(branch.slug);
      try { localStorage.setItem("donata-branch", branch.slug); } catch { /* sin almacenamiento */ }
    }
  }, [route, branch]);

  return (
    <CartProvider>
      <Header route={route} />
      <main>
        {branch ? <Branch key={route} branch={branch} /> : View ? <View /> : <Home />}
      </main>
      {route !== "carta" && <Footer />}
      <BottomNav route={route} />
      <CartBar />
      <CartDrawer defaultBranch={lastBranch} />
    </CartProvider>
  );
}
