import { csv } from 'd3';
import { useState, useEffect } from 'react';

const csvUrl = "/worldcities_clean.csv";

const row = d => {
    d.lat = +d.lat;
    d.lng = +d.lng;
    d.population = +d.population;

    if (isNaN(d.lat) || isNaN(d.lng) || isNaN(d.population)){
        return null;
    }

    return d;
}

export const useCities = () => {
    const [data, setData] = useState(null);

    useEffect(() => {
        csv(csvUrl, row).then(setData);
    }, []);

    return data;
}