import { geoNaturalEarth1, geoPath, geoGraticule } from "d3"

const projection = geoNaturalEarth1();
const path = geoPath(projection);
const graticule = geoGraticule();

export const Marks = ({ world: { land, interiors}, cities, sizeScale, sizeValue }) => (
    <g className="marks">
      <path className="sphere" d={path({type: "Sphere"})} />
      <path className="graticules" d={path(graticule())} />
      <path className="land" d={path(land.features[0])} />
      <path className="interiors" d={path(interiors)} />
      {cities.map(d => {
        const [x, y] = projection([d.lng, d.lat]);
        return <circle key={`${d.lng}${d.lat}`} cx={x} cy={y} r={sizeScale(sizeValue(d))} />
      })}
    </g>
);