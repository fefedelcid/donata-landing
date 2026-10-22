import { PHOTOS } from "../data/branches.js";

const TIMELINE = [
  ["2012", "Dos amigos del secundario, Carmelo y Juanjo, empiezan a hacer cerveza en casa con ollas de cocina."],
  ["2017", "La cerveza sale de la cocina: llegan el equipamiento especializado y el primer gran local."],
  ["2023", "Se capacitan en destilación y lanzan su propio Gin London Dry."],
  ["2026", "El 17 de julio abre Refugio Donata en Barreal, frente a la Cordillera."],
];

export default function Historia() {
  return (
    <>
      <section className="sec sec--cielo">
        <div className="wrap split">
          <img className="split__img" src={PHOTOS.tanques} alt="Tanques de fermentación y barriles dentro de la fábrica" />
          <div>
            <h1 className="h-page">De las ollas de casa a tres sucursales</h1>
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
          <h2>Hecha en el desierto, con cuidado</h2>
          <div className="facts">
            <div>
              <h3>Más de 25.000 litros por mes</h3>
              <p>Pasamos de ollas caseras a una producción propia, sin perder el carácter de cada estilo.</p>
            </div>
            <div>
              <h3>Agua tratada</h3>
              <p>El agua de San Juan es dura. Usamos ósmosis inversa para lograr buenas cervezas y cuidar un recurso escaso.</p>
            </div>
            <div>
              <h3>El bagazo vuelve al campo</h3>
              <p>Entregamos el residuo de la malta a productores locales como alimento para el ganado.</p>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
