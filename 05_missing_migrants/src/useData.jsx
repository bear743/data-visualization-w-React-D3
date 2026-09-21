import { csv } from 'd3';
import { useState, useEffect } from 'react';

const csvUrl = "/MissingMigrants-Global-2019-10-08T09-47-14-subset.csv";

const row = d => {
    d.coords = d['Location Coordinates'].split(',').map(d => +d).reverse();
    d["Total Dead and Missing"] = +d["Total Dead and Missing"];
    d["Reported Date"] = new Date(d["Reported Date"]);
    return d;
}

export const useData = () => {
    const [data, setData] = useState(null);

    useEffect(() => {
        csv(csvUrl, row).then(setData);
    }, []);

    return data;
}