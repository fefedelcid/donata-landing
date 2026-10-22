import { BRANCHES, igUrl, mapsUrl } from "../data/branches.js";
import Plaque from "../components/Plaque.jsx";
import { IconInstagram, IconPin } from "../components/Icons.jsx";

export default function Branch({ branch }) {
  const others = BRANCHES.filter((b) => b.slug !== branch.slug);
  return (
    <>
      <section className="bhero">
        <img src={branch.hero} alt="" style={{ objectPosition: branch.heroPos }} />
        <div className="wrap bhero__text">
          <h1>{branch.name}</h1>
          <p className="lead">{branch.tagline}</p>
          <p className="addr">{branch.address}, {branch.area}</p>
          <div className="actions">
            <a className="btn btn--gold" href="#/carta">Ver la carta</a>
            <a className="btn btn--line" href={mapsUrl(branch)} target="_blank" rel="noopener noreferrer"><IconPin /> Cómo llegar</a>
            <a className="btn btn--line" href={igUrl(branch)} target="_blank" rel="noopener noreferrer"><IconInstagram /> @{branch.instagram}</a>
          </div>
        </div>
      </section>

      <section className="sec sec--cielo">
        <div className="wrap bstory">
          <div>
            <h2>Su historia</h2>
            {branch.story.map((p) => <p key={p}>{p}</p>)}
          </div>
          <dl className="datos">
            <dt>Formato</dt><dd>{branch.kind}</dd>
            <dt>Dirección</dt><dd>{branch.address}<br />{branch.area}</dd>
            <dt>Instagram</dt><dd><a href={igUrl(branch)} target="_blank" rel="noopener noreferrer">@{branch.instagram}</a></dd>
          </dl>
        </div>
      </section>

      <section className="sec">
        <div className="wrap">
          <h2>Las otras sucursales</h2>
          <div className="plaques">
            {others.map((b, i) => <Plaque key={b.slug} branch={b} index={i} />)}
          </div>
        </div>
      </section>
    </>
  );
}
