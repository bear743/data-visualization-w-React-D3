import { useState, useEffect } from "react";
import { csv } from "d3";

const csvUrl ="iris.csv";


export const useData = () => {
  const [data, setData] = useState(null)

  useEffect(() => {
        const row = d => {
            d.sepal_length = +d.sepal_length;
            d.sepal_width = +d.sepal_width;
            d.petal_length = +d.petal_length;
            d.petal_width = +d.petal_width;
            return d;
        }
        csv(csvUrl, row).then(setData)
    }, [])

  return data
}