// El letrero colgante de la entrada, convertido en botón de sucursal.
// Cada uno lleva el color y la foto de su sucursal.
export default function Plaque({ branch, index = 0 }) {
  return (
    <a className="plaque chamfer" href={`#/${branch.slug}`} style={{ "--i": index, "--acc": branch.accent }}>
      <span className="plaque__in chamfer">
        <img src={branch.thumb} alt="" loading="lazy" style={{ objectPosition: branch.thumbPos }} />
        <span className="plaque__txt">
          <strong>{branch.name}</strong>
          <span>{branch.blurb}</span>
        </span>
      </span>
    </a>
  );
}
