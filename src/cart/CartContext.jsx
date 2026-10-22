import { createContext, useContext, useEffect, useMemo, useReducer, useState } from "react";
import { PRODUCT_BY_ID } from "../data/menu.js";

const KEY = "donata-cart-v1";

function load() {
  try {
    const raw = JSON.parse(localStorage.getItem(KEY));
    if (!raw || typeof raw !== "object") return {};
    return Object.fromEntries(
      Object.entries(raw).filter(([id, q]) => PRODUCT_BY_ID[id] && q > 0)
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
      return {};
    default:
      return state;
  }
}

const Ctx = createContext(null);

export function CartProvider({ children }) {
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
    const lines = Object.entries(items).map(([id, qty]) => ({
      product: PRODUCT_BY_ID[id],
      qty,
    }));
    return {
      open,
      setOpen,
      lines,
      count: lines.reduce((n, l) => n + l.qty, 0),
      total: lines.reduce((n, l) => n + l.qty * l.product.price, 0),
      qtyOf: (id) => items[id] || 0,
      inc: (id) => dispatch({ type: "inc", id }),
      dec: (id) => dispatch({ type: "dec", id }),
      clear: () => dispatch({ type: "clear" }),
    };
  }, [items, open]);

  return <Ctx.Provider value={value}>{children}</Ctx.Provider>;
}

export const useCart = () => useContext(Ctx);
