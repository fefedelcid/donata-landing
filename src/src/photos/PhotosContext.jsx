import { createContext, useContext, useEffect, useMemo, useState } from "react";

// FOTOS DE PRUEBA (demo): las fotos que sacan los clientes se guardan solo en
// este dispositivo (localStorage), reducidas a ~720 px. No se suben a ningún
// servidor. Para borrarlas: localStorage.removeItem("donata-photos-v1").
const KEY = "donata-photos-v1";

function load() {
  try {
    const raw = JSON.parse(localStorage.getItem(KEY));
    return raw && typeof raw === "object" ? raw : {};
  } catch {
    return {};
  }
}

// Reduce la foto de la cámara (varios MB) a un JPEG liviano.
export function fileToDataUrl(file, max = 720, quality = 0.7) {
  return new Promise((resolve, reject) => {
    const url = URL.createObjectURL(file);
    const img = new Image();
    img.onload = () => {
      const k = Math.min(1, max / Math.max(img.naturalWidth, img.naturalHeight));
      const c = document.createElement("canvas");
      c.width = Math.round(img.naturalWidth * k);
      c.height = Math.round(img.naturalHeight * k);
      c.getContext("2d").drawImage(img, 0, 0, c.width, c.height);
      URL.revokeObjectURL(url);
      resolve(c.toDataURL("image/jpeg", quality));
    };
    img.onerror = () => { URL.revokeObjectURL(url); reject(new Error("No se pudo leer la foto")); };
    img.src = url;
  });
}

const Ctx = createContext(null);

export function PhotosProvider({ slug, children }) {
  const [photos, setPhotos] = useState(load);

  useEffect(() => {
    try {
      localStorage.setItem(KEY, JSON.stringify(photos));
    } catch {
      /* sin espacio o modo privado: las fotos duran lo que dure la pestaña */
    }
  }, [photos]);

  const value = useMemo(
    () => ({
      photosOf: (id) => photos[`${slug}:${id}`] || [],
      addPhoto: async (id, file) => {
        const dataUrl = await fileToDataUrl(file);
        setPhotos((p) => ({ ...p, [`${slug}:${id}`]: [...(p[`${slug}:${id}`] || []), dataUrl] }));
      },
    }),
    [photos, slug]
  );
  return <Ctx.Provider value={value}>{children}</Ctx.Provider>;
}

export const usePhotos = () => useContext(Ctx);
