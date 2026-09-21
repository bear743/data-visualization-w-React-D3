import { useState, useEffect } from "react";
import { json } from "d3";
import { feature, mesh } from 'topojson';

const jsonUrl ="/countries-50m.json";


export const useWorldAtlas = () => {
  const [data, setData] = useState(null)

  useEffect(() => {
        json(jsonUrl).then(topojsonData => {
          const { countries, land } = topojsonData.objects;
          setData({
            land: feature(topojsonData, land),
            interiors: mesh(topojsonData, countries, (a, b) => a !== b),
          });
        })
    }, []);

  return data
}