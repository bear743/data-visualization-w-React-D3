import { useState, useEffect } from "react";
import { csv } from "d3";

const csvUrl ="https://gist.githubusercontent.com/bear743/8df529cd24555d63b442ed2565aa097c/raw/8c99bbc42b0bd1d06536601a7cad71acb69368c7/UN_PPP2024_Output_PopTot.csv";


export const useData = () => {
  const [data, setData] = useState(null)

  useEffect(() => {
        const row = d => {
            d.Population = +d["2024"] * 1000;
            return d;
        }
        csv(csvUrl, row).then(data => {
            setData(data.slice(0, 10));
        })
    }, [])

  return data
}