// El letrero colgante de la entrada, convertido en botón de sucursal.
export default function Plaque({ branch, index = 0 }) {
  return (
    <a className="plaque chamfer" href={`#/${branch.slug}`} style={{ "--i": index }}>
      <span className="plaque__in chamfer">
        <strong>{branch.name}</strong>
        <span>{branch.blurb}</span>
      </span>
    </a>
  );
}
