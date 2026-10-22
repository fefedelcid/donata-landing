import cartel from "../assets/cartel.webp";
import pizza from "../assets/pizza.webp";
import patio from "../assets/patio.webp";
import cerveza from "../assets/cerveza.webp";
import tanques from "../assets/tanques.webp";
import salon from "../assets/salon.webp";

export const PHOTOS = { cartel, pizza, patio, cerveza, tanques, salon };

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
    hero: PHOTOS.patio, heroPos: "50% 60%",
    thumb: PHOTOS.salon, banner: PHOTOS.salon,
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
    hero: PHOTOS.cerveza, heroPos: "50% 55%",
    thumb: PHOTOS.cerveza, banner: PHOTOS.pizza,
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
    hero: PHOTOS.pizza, heroPos: "50% 85%",
    thumb: PHOTOS.pizza, banner: PHOTOS.patio,
  },
];

export const BRANCH = Object.fromEntries(BRANCHES.map((b) => [b.slug, b]));

export const mapsUrl = (b) =>
  "https://www.google.com/maps/search/?api=1&query=" +
  encodeURIComponent(`${b.name}, ${b.address}, ${b.area}, Argentina`);

export const igUrl = (b) => `https://www.instagram.com/${b.instagram}/`;
