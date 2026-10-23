import { igUrl, mapsUrl, waUrl } from "../data/branches.js";
import { IconInstagram, IconPin, IconWhatsapp } from "../components/Icons.jsx";

export default function Branch({ branch }) {
  return (
    <>
      <section className="bhero">
        <img src={branch.hero} alt="" style={{ objectPosition: branch.heroPos }} />
        <div className="wrap bhero__text">
          <h1>{branch.name}</h1>
          <p className="lead">{branch.tagline}</p>
          <p className="addr">{branch.address}, {branch.area}</p>
          <div className="actions">
            <a className="btn btn--gold" href={`#/${branch.slug}/carta`}>Ver la carta</a>
            <a className="btn btn--line" href={mapsUrl(branch)} target="_blank" rel="noopener noreferrer"><IconPin /> Cómo llegar</a>
            <a className="btn btn--line" href={igUrl(branch)} target="_blank" rel="noopener noreferrer"><IconInstagram /> @{branch.instagram}</a>
            <a className="btn btn--line" href={waUrl(branch)} target="_blank" rel="noopener noreferrer"><IconWhatsapp /> WhatsApp</a>
          </div>
        </div>
      </section>

      <div className="bsig" aria-hidden="true" />

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
            <dt>WhatsApp</dt><dd><a href={waUrl(branch)} target="_blank" rel="noopener noreferrer">Escribinos</a></dd>
          </dl>
        </div>
      </section>

      <section className="sec">
        <div className="wrap">
          <div className="bgallery">
            {branch.gallery.map((g) => (
              <img key={g.src} src={g.src} alt={g.alt} loading="lazy" style={{ objectPosition: g.pos }} />
            ))}
          </div>
        </div>
      </section>
    </>
  );
}
