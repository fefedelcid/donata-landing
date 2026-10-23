import { useEffect, useState } from "react";
import { BRANCH } from "./data/branches.js";
import { CartProvider } from "./cart/CartContext.jsx";
import BranchTabs from "./components/BranchTabs.jsx";
import Header from "./components/Header.jsx";
import BottomNav from "./components/BottomNav.jsx";
import Footer from "./components/Footer.jsx";
import CartDrawer, { CartBar } from "./components/CartDrawer.jsx";
import Home from "./pages/Home.jsx";
import Carta from "./pages/Carta.jsx";
import Branch from "./pages/Branch.jsx";

const TITLES = { "": "Donata · Cerveza artesanal de San Juan" };

// Rutas: #/  ·  #/punto  ·  #/punto/carta  (las viejas #/carta, #/sucursales
// e #/historia se redirigen)
const readRoute = () => window.location.hash.replace(/^#\/?/, "").split("?")[0].replace(/\/$/, "");
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

  const [slug, sub] = route.split("/");
  const branch = BRANCH[slug];
  const isCarta = Boolean(branch) && sub === "carta";
  const legacy = route === "carta" ? `#/${lastBranch}/carta` : route === "sucursales" || route === "historia" ? "#/" : null;

  useEffect(() => {
    if (legacy) window.location.replace(legacy);
  }, [legacy]);

  useEffect(() => {
    window.scrollTo({ top: 0, behavior: "instant" });
    document.title = branch
      ? isCarta
        ? `Carta · ${branch.name}`
        : `${branch.name} · Cerveza artesanal en ${branch.area}`
      : TITLES[""];
    // cada sucursal recolorea el sitio (ver [data-branch] en styles.css)
    if (branch) document.documentElement.dataset.branch = branch.slug;
    else delete document.documentElement.dataset.branch;
    // "Carta" del menú lleva a la carta de la última sucursal visitada
    if (branch) {
      setLastBranch(branch.slug);
      try { localStorage.setItem("donata-branch", branch.slug); } catch { /* sin almacenamiento */ }
    }
  }, [route, branch, isCarta]);

  return (
    <CartProvider slug={branch ? branch.slug : lastBranch}>
      <Header route={route} slug={lastBranch} />
      {branch && <BranchTabs current={branch.slug} carta={isCarta} />}
      <main>
        {legacy ? null : isCarta ? <Carta key={slug} branch={branch} /> : branch ? <Branch key={route} branch={branch} /> : <Home />}
      </main>
      {!isCarta && <Footer />}
      <BottomNav route={route} slug={lastBranch} />
      <CartBar />
      <CartDrawer />
    </CartProvider>
  );
}
