import { BRANCHES, PHOTOS } from "../data/branches.js";
import Plaque from "../components/Plaque.jsx";

export default function Home() {
  return (
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
        <div className="actions">
          <a className="btn btn--gold" href="#/carta">Ver la carta</a>
          <a className="btn btn--line" href="#/historia">Nuestra historia</a>
        </div>
      </div>
    </section>
  );
}
