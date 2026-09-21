import { geoNaturalEarth1, geoPath, geoGraticule } from "d3"
import { useMemo } from "react";

const projection = geoNaturalEarth1();
const path = geoPath(projection);
const graticule = geoGraticule();

export const Marks = ({ world: { land, interiors}, data, sizeScale, sizeValue }) => (
    <g className="marks">
      {useMemo(
        () => (
            <>
                <path className="sphere" d={path({type: "Sphere"})} />
                <path className="graticules" d={path(graticule())} />
                <path className="land" d={path(land.features[0])} />
                <path className="interiors" d={path(interiors)} />
            </>
        )
      )}
      {data.map((d, idx) => {
        const [x, y] = projection(d.coords);
        return <circle key={idx} cx={x} cy={y} r={sizeScale(sizeValue(d))} />
      })}
    </g>
);