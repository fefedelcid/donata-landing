import { BRANCHES, PHOTOS } from "../data/branches.js";
import Plaque from "../components/Plaque.jsx";

const TIMELINE = [
  ["2012", "Carmelo Letizia, arquitecto, y Juanjo de los Ríos, licenciado en Comercio Exterior, amigos desde el secundario, empiezan a hacer cerveza en casa. Los primeros lotes se envasaban en botellas PET."],
  ["2017", "En un asado, Michael Meding, ejecutivo alemán y cliente fiel de la casa, les pregunta si quieren vivir de la cerveza. Les pide un plan de negocios, lo aprueba y se suma como tercer socio."],
  ["2018–19", "Con ese impulso llegan los equipos importados y la fábrica pasa de unos 1.000 litros por mes a 25.000."],
  ["2020–22", "Abre el bar de la fábrica en Rivadavia, con los tanques a la vista. Crece hasta las 90 mesas y la Municipalidad lo toma como kilómetro cero de la Ruta de la Cerveza Artesanal. La cerveza empieza a envasarse en lata de aluminio."],
  ["Feb. 2023", "Firmamos un convenio con la UNSJ y el CONICET para encontrarle nuevos usos al bagazo."],
  ["Jun. 2023", "La Italian Grape Ale que hicimos junto a Angualasto gana el Oro en la Copa Argentina de Cervezas."],
  ["2023–24", "Con un maestro destilador capacitando al equipo, nace el Gin Donata. Después llega la línea 500 Noches."],
  ["2024", "Nuestros gines ganan cuatro medallas en los Argentina Spirits Awards, en Mendoza."],
  ["Mar. 2026", "Abre Punto Donata, el primer local fuera de Rivadavia, en el centro de San Juan."],
  ["Jul. 2026", "El 17 de julio abre Refugio Donata en Barreal, frente a la Cordillera."],
];

const AWARDS = [
  ["2023", "Oro, Cervezas Colaborativas", "Italian Grape Ale, con Angualasto · Copa Argentina de Cervezas"],
  ["2024", "Oro, London Dry", "500 Noches Medias Negras · Argentina Spirits Awards, Mendoza"],
  ["2024", "Oro, Gins Añejados", "500 Noches Golden y 500 Noches Blue Gin, una medalla cada uno"],
  ["2024", "Plata, London Dry", "Donata del Desierto Gin"],
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
              Donata nació en 2012 entre dos amigos de la infancia. Ninguno venía del mundo de la cerveza:
              Carmelo es arquitecto y Juanjo, licenciado en Comercio Exterior. Esa mezcla explica bastante
              de lo que vino después: uno sabía cómo armar un lugar y el otro, cómo traer lo que en San Juan
              no se conseguía, como maquinaria, maltas y lúpulos.
            </p>
            <p>
              Con los años la cerveza dejó de ser un hobby y pasó a ser el trabajo de los dos. En 2017 se
              sumó un tercer socio, Michael Meding, y la cervecería casera se convirtió en la fábrica que
              hoy abastece a las tres sucursales.
            </p>
          </div>
        </div>
      </section>

      <section className="sec">
        <div className="wrap">
          <h2>Año por año</h2>
          <ol className="timeline">
            {TIMELINE.map(([year, text]) => (
              <li key={year}><strong>{year}</strong><p>{text}</p></li>
            ))}
          </ol>
        </div>
      </section>

      <section className="sec sec--cielo">
        <div className="wrap">
          <h2>Lo que sale de la fábrica</h2>
          <div className="facts">
            <div>
              <h3>Dorada Pampeana, Session IPA y MandarIPA</h3>
              <p>La Dorada Pampeana es rubia y limpia, con malta que recuerda al pan y poco amargor.<br/>La Session IPA conserva el aroma frutal de los lúpulos con menos alcohol, ideal para los veranos de San Juan.<br/>La MandarIPA lleva jugo y aceites de mandarinas de la provincia.</p>
            </div>
            <div>
              <h3>Italian Grape Ale</h3>
              <p>Una cerveza con 18% de mosto de uva sanjuanina, hecha junto a la cervecería Angualasto.<br/>Une dos cosas que San Juan conoce bien: la malta y la vid.</p>
            </div>
            <div>
              <h3>Gin Donata y 500 Noches</h3>
              <p>El London Dry de la casa tiene notas de melón y pera, algo de pan tostado y un toque floral de lúpulo.<br/>La línea 500 Noches suma las versiones Golden, Blue Gin y Medias Negras.</p>
            </div>
          </div>
          <ul className="awards" aria-label="Premios">
            {AWARDS.map(([year, medal, what]) => (
              <li key={year + medal}>
                <strong>{year}</strong>
                <span>{medal}<small>{what}</small></span>
              </li>
            ))}
          </ul>
        </div>
      </section>

      <section className="sec">
        <div className="wrap">
          <h2>Hecha en el desierto, con cuidado</h2>
          <p className="intro">
            El “del Desierto” no es un adorno: es San Juan, con su sol, su sequía y su montaña, y de ahí
            sale la imagen de toda la marca. Acá el agua y la energía importan, y por eso las cuidamos.
          </p>
          <div className="facts">
            <div>
              <h3>Cuidar el agua</h3>
              <p>Hacer cerveza gasta entre cinco y siete litros de agua por cada litro. Una torre de enfriamiento de circuito cerrado recicla el agua de refrigeración y ahorra unos 3.000 litros por día. El agua de red, muy dura y salina, pasa por ósmosis inversa y los cerveceros le devuelven las sales justas para cada estilo.</p>
            </div>
            <div>
              <h3>Aprovechar el sol</h3>
              <p>Calefones solares de tubos de vacío precalientan el agua de maceración y bajan el consumo de gas. El próximo paso son paneles fotovoltaicos en el techo de la fábrica.</p>
            </div>
            <div>
              <h3>El bagazo, con la ciencia</h3>
              <p>Salen unos 1.500 kilos de bagazo húmedo por semana. Con el Instituto de Ingeniería Química de la UNSJ y el CONICET (las doctoras Rosa Rodríguez y Paula Fabani, y el doctor Germán Mazza) estudiamos cómo convertirlo en harina rica en fibra y proteínas y, por pirólisis, en biochar, bioaceite y gas de síntesis. El biochar ayuda a que los suelos áridos retengan agua. Mientras tanto, el bagazo sigue yendo a productores locales como alimento para ganado.</p>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
