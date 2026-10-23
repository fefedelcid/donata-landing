import { createContext, useContext, useEffect, useMemo, useReducer, useState } from "react";
import { PRODUCT_BY_KEY } from "../data/menu.js";

const KEY = "donata-cart-v2"; // v2: los pedidos se guardan por sucursal ("sucursal:id")

function load() {
  try {
    const raw = JSON.parse(localStorage.getItem(KEY));
    if (!raw || typeof raw !== "object") return {};
    return Object.fromEntries(
      Object.entries(raw).filter(([id, q]) => PRODUCT_BY_KEY[id] && q > 0)
    );
  } catch {
    return {};
  }
}

function reducer(state, action) {
  switch (action.type) {
    case "inc":
      return { ...state, [action.id]: (state[action.id] || 0) + 1 };
    case "dec": {
      const next = { ...state };
      if ((next[action.id] || 0) > 1) next[action.id] -= 1;
      else delete next[action.id];
      return next;
    }
    case "clear":
      return Object.fromEntries(Object.entries(state).filter(([key]) => !key.startsWith(action.prefix)));
    default:
      return state;
  }
}

const Ctx = createContext(null);

export function CartProvider({ slug, children }) {
  const [items, dispatch] = useReducer(reducer, undefined, load);
  const [open, setOpen] = useState(false);

  useEffect(() => {
    try {
      localStorage.setItem(KEY, JSON.stringify(items));
    } catch {
      /* modo privado: el carrito vive solo en memoria */
    }
  }, [items]);

  const value = useMemo(() => {
    const k = (id) => `${slug}:${id}`;
    // solo los productos de la sucursal que se está viendo
    const lines = Object.entries(items)
      .filter(([key]) => key.startsWith(`${slug}:`))
      .map(([key, qty]) => ({ product: PRODUCT_BY_KEY[key], qty }));
    return {
      slug,
      open,
      setOpen,
      lines,
      count: lines.reduce((n, l) => n + l.qty, 0),
      total: lines.reduce((n, l) => n + l.qty * l.product.price, 0),
      qtyOf: (id) => items[k(id)] || 0,
      inc: (id) => dispatch({ type: "inc", id: k(id) }),
      dec: (id) => dispatch({ type: "dec", id: k(id) }),
      clear: () => dispatch({ type: "clear", prefix: `${slug}:` }),
    };
  }, [items, open, slug]);

  return <Ctx.Provider value={value}>{children}</Ctx.Provider>;
}

export const useCart = () => useContext(Ctx);
