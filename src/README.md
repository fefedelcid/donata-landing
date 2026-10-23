# Donata · Landing demo

SPA en React + Vite. Tres sucursales, una carta, pedido por WhatsApp.

```bash
npm install && npm run dev      # desarrollo
npm run build                   # genera /dist
```

## Rutas (hash, compatibles con GitHub Pages)
- `/#/` inicio · `/#/carta` · `/#/sucursales` · `/#/historia`
- `/#/desierto` · `/#/punto` · `/#/refugio`: usá cada una como enlace de entrada desde su ficha de Google Maps.
- El pedido se envía por defecto a la última sucursal visitada.

## Antes de mostrar la demo
1. **WhatsApp**: en `src/data/branches.js` reemplazá `whatsapp` de cada sucursal (formato `549` + área + número, sin `+`).
2. **Fotos**: solo hay fotos de Donata del Desierto. Punto y Refugio reutilizan algunas; cambialas en `src/assets/` y `src/data/branches.js`.
3. **Carta**: `src/data/donata.js` contiene `PRODUCTS` y `CATEGORIES`. Con la API PRO de fu.do, pasá las respuestas en vivo a `buildMenu()` (`src/data/menu.js`).

## Deploy en GitHub Pages
1. Subí el repo a GitHub (rama `main`).
2. Settings → Pages → Source: **GitHub Actions**.
3. Cada push a `main` ejecuta `.github/workflows/deploy.yml`.
