import { BRANCHES, PHOTOS } from "../data/branches.js";
import Plaque from "../components/Plaque.jsx";

const TIMELINE = [
  ["2012", "Carmelo y Juanjo, amigos desde el secundario, empiezan a hacer cerveza en la cocina de casa, con ollas comunes."],
  ["2017", "En un asado, un invitado prueba la cerveza y les pide un plan de negocios. Lo arman, suman un socio y con ese capital compran equipamiento y arman el primer local grande."],
  ["2023", "Se capacitan en destilación y lanzan su propio gin London Dry."],
  ["2026", "El 17 de julio abre Refugio Donata en Barreal, frente a la Cordillera."],
];

export default function Home() {
  return (
    <>
      <section className="hero">
        <div className="hero__media">
          <img src={PHOTOS.cartel} alt="Cartel de Donata del Desierto, Fábrica de cerveza, de noche" />
        </div>
        <div className="hero__body">
          <h1>Cerveza artesanal de San Juan</h1>
          <p className="lead">Una fábrica, un taproom y un refugio frente a la Cordillera. Elegí dónde sentarte.</p>
          <div className="plaques">
            {BRANCHES.map((b, i) => <Plaque key={b.slug} branch={b} index={i} />)}
          </div>
        </div>
      </section>

      <section className="sec sec--cielo">
        <div className="wrap split">
          <img className="split__img" src={PHOTOS.tanques} alt="Tanques de fermentación y barriles dentro de la fábrica" />
          <div>
            <h2>De las ollas de casa a tres sucursales</h2>
            <p>
              Carmelo Letizia y Juanjo de los Ríos se conocen del secundario. En 2012 empezaron a hacer
              cerveza en casa, por gusto, para ellos y para los amigos que quisieran probarla. Nadie
              pensaba todavía en una marca.
            </p>
            <ol className="timeline">
              {TIMELINE.map(([year, text]) => (
                <li key={year}><strong>{year}</strong><p>{text}</p></li>
              ))}
            </ol>
          </div>
        </div>
      </section>

      <section className="sec">
        <div className="wrap">
          <h2>Hecha en el desierto</h2>
          <p className="intro">
            El “del Desierto” no es un adorno: es San Juan, con su sol, su sequía y su montaña, y de ahí
            sale la imagen de toda la marca. Crecer no nos cambió la forma de cuidar el producto ni el lugar.
          </p>
          <div className="facts">
            <div>
              <h3>Más de 25.000 litros por mes</h3>
              <p>Empezamos con ollas de cocina. Hoy la fábrica de Rivadavia elabora más de 25.000 litros por mes.</p>
            </div>
            <div>
              <h3>Agua dura, agua tratada</h3>
              <p>El agua de San Juan es muy dura y le juega en contra a estilos como la Pilsen o la IPA. La tratamos con ósmosis inversa y desalinización, y de paso cuidamos un recurso que acá no sobra.</p>
            </div>
            <div>
              <h3>El bagazo vuelve al campo</h3>
              <p>El bagazo, lo que queda de la malta, es cerca del 85% de los residuos de una cervecería. Lo entregamos a productores locales para alimentar ganado.</p>
            </div>
          </div>
          <p className="intro intro--next">
            Lo que viene: pasar a latas 100% reciclables y sumar paneles solares en la fábrica de Rivadavia.
          </p>
        </div>
      </section>
    </>
  );
}
