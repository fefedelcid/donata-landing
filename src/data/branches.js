import cartel from "../assets/cartel.webp";
import pizza from "../assets/pizza.webp";
import patio from "../assets/patio.webp";
import cerveza from "../assets/cerveza.webp";
import tanques from "../assets/tanques.webp";
import salon from "../assets/salon.webp";

import puntoCartel from "../assets/punto-cartel.webp";
import puntoCartelAlto from "../assets/punto-cartel-alto.webp";
import puntoMural from "../assets/punto-mural.webp";
import puntoTrago from "../assets/punto-trago.webp";
import refugioFachada from "../assets/refugio-fachada.webp";
import refugioNoche from "../assets/refugio-noche.webp";
import refugioGaleria from "../assets/refugio-galeria.webp";
import refugioCartel from "../assets/refugio-cartel.webp";
import refugioSalon from "../assets/refugio-salon.webp";

export const PHOTOS = { cartel, pizza, patio, cerveza, tanques, salon };

// Cada sucursal tiene su "firma": color de acento (se aplica a todo el sitio
// cuando estás en su página, ver [data-branch] en styles.css), fotos propias y
// una galería.

// TODO: reemplazar `whatsapp` por el número real de cocina de cada sucursal
// (formato internacional, sin + ni espacios: 54 + 9 + código de área + número).
export const BRANCHES = [
  {
    slug: "desierto",
    name: "Donata del Desierto",
    short: "Del Desierto",
    blurb: "Brewpub en Rivadavia",
    kind: "Brewpub: fábrica y bar en el mismo galpón",
    tagline: "La fábrica donde nace nuestra cerveza.",
    address: "Av. Libertador Gral. San Martín Oeste 3311",
    area: "Rivadavia, San Juan",
    instagram: "donatadeldesierto",
    whatsapp: "5492645304639",
    story: [
      "Donata empezó en 2012, cuando Carmelo y Juanjo, amigos desde el secundario, hacían cerveza en casa con ollas de cocina. Esta es la casa grande de esa historia.",
      "Desde tu mesa ves los tanques de fermentación. La carta marida cada estilo con pizzas de estilo propio, hamburguesas gourmet y papas.",
    ],
    accent: "#e0b04e",
    hero: PHOTOS.patio, heroPos: "50% 60%",
    thumb: PHOTOS.salon, thumbPos: "50% 50%", banner: PHOTOS.salon,
    gallery: [
      { src: PHOTOS.tanques, alt: "Los tanques de fermentación a la vista del salón" },
      { src: PHOTOS.pizza, alt: "Pizza con queso estirado y una pinta de cerveza", pos: "50% 40%" },
      { src: PHOTOS.cartel, alt: "Cartel de Donata del Desierto, Fábrica de cerveza" },
    ],
  },
  {
    slug: "punto",
    name: "Punto Donata",
    short: "Punto Donata",
    blurb: "Taproom en San Juan Capital",
    kind: "Taproom: sala de grifos en el centro",
    tagline: "Los grifos de Donata, en pleno centro.",
    address: "Av. España y Santa Fe Oeste",
    area: "San Juan Capital",
    instagram: "puntodonata",
    whatsapp: "5492645304639",
    story: [
      "Punto Donata es nuestro taproom urbano: un local ágil, pensado para el after office y para salir a tomar algo sin vueltas.",
      "No tiene fábrica propia. Recibe cerveza de forma constante desde la matriz de Rivadavia, y por eso la rotación es rápida y los grifos nunca quedan quietos.",
    ],
    accent: "#f7c61b",
    hero: puntoCartel, heroPos: "42% 50%",
    thumb: puntoCartelAlto, thumbPos: "50% 30%", banner: PHOTOS.pizza,
    gallery: [
      { src: puntoMural, alt: "Mural de los tres rinocerontes de Donata brindando con cerveza", pos: "50% 45%" },
      { src: puntoTrago, alt: "Trago con rodaja de limón frente al salón de piso a cuadros", pos: "30% 60%" },
      { src: puntoCartelAlto, alt: "Cartel luminoso de Punto Donata sobre la vereda", pos: "50% 30%" },
    ],
  },
  {
    slug: "refugio",
    name: "Refugio Donata",
    short: "Refugio Donata",
    blurb: "Frente a la Cordillera, en Barreal",
    kind: "Refugio: punto de encuentro en el valle",
    tagline: "Cerveza frente a la Cordillera.",
    address: "Calle Belgrano S/N",
    area: "Barreal, Calingasta",
    instagram: "refugiodonata",
    whatsapp: "5492645304639",
    story: [
      "Refugio Donata abrió el 17 de julio de 2026 en Barreal, frente a la Cordillera de los Andes. Es nuestra forma de llevar la marca al valle.",
      "Está pensado para quienes llegan por el turismo rural, de montaña y astronómico: un punto de encuentro para visitantes del país y del exterior.",
    ],
    accent: "#ee9d3a",
    hero: refugioGaleria, heroPos: "40% 50%",
    thumb: refugioNoche, thumbPos: "60% 50%", banner: PHOTOS.patio,
    gallery: [
      { src: refugioNoche, alt: "Galería del Refugio iluminada de noche, con paredes color ocre", pos: "60% 50%" },
      { src: refugioSalon, alt: "Salón del Refugio con faroles de mimbre y ventanales de madera" },
      { src: refugioCartel, alt: "Cartel de Refugio Donata Barreal sobre pared de piedra de río" },
      { src: refugioFachada, alt: "Fachada del Refugio de día, con el cartel sobre el pilar de piedra", pos: "30% 50%" },
    ],
  },
];

export const BRANCH = Object.fromEntries(BRANCHES.map((b) => [b.slug, b]));

export const mapsUrl = (b) =>
  "https://www.google.com/maps/search/?api=1&query=" +
  encodeURIComponent(`${b.name}, ${b.address}, ${b.area}, Argentina`);

export const igUrl = (b) => `https://www.instagram.com/${b.instagram}/`;
