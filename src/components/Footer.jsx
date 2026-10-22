import { BRANCHES, igUrl, mapsUrl } from "../data/branches.js";
import { IconInstagram, IconPin } from "./Icons.jsx";

export default function Footer() {
  return (
    <footer className="ftr">
      <div className="wrap ftr__grid">
        {BRANCHES.map((b) => (
          <div className="ftr__item" key={b.slug}>
            <div>
              <h3><a href={`#/${b.slug}`}>{b.name}</a></h3>
              <p>{b.address}, {b.area}</p>
            </div>
            <div className="ftr__icons">
              <a className="iconbtn" href={mapsUrl(b)} target="_blank" rel="noopener noreferrer" aria-label={`Cómo llegar a ${b.name}`}><IconPin /></a>
              <a className="iconbtn" href={igUrl(b)} target="_blank" rel="noopener noreferrer" aria-label={`Instagram de ${b.name}`}><IconInstagram /></a>
            </div>
          </div>
        ))}
      </div>
    </footer>
  );
}
