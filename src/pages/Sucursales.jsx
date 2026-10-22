import { BRANCHES, igUrl, mapsUrl } from "../data/branches.js";
import { IconInstagram, IconPin } from "../components/Icons.jsx";

export default function Sucursales() {
  return (
    <section className="sec">
      <div className="wrap">
        <h1 className="h-page">Sucursales</h1>
        <p className="lead">Tres lugares, una misma cerveza y una misma carta.</p>
        <div className="blist">
          {BRANCHES.map((b) => (
            <article className="bitem" key={b.slug}>
              <a className="bitem__main" href={`#/${b.slug}`}>
                <img src={b.thumb} alt="" width="96" height="96" loading="lazy" />
                <span>
                  <strong>{b.name}</strong>
                  <span className="bitem__blurb">{b.blurb}</span>
                  <span className="bitem__addr">{b.address}</span>
                </span>
              </a>
              <div className="bitem__act">
                <a className="iconbtn" href={mapsUrl(b)} target="_blank" rel="noopener noreferrer" aria-label={`Cómo llegar a ${b.name}`}><IconPin /></a>
                <a className="iconbtn" href={igUrl(b)} target="_blank" rel="noopener noreferrer" aria-label={`Instagram de ${b.name}`}><IconInstagram /></a>
              </div>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}
