import { useMemo } from "react";
import { Marks } from "./Marks";
import { scaleSqrt, max } from "d3";

const sizeValue = d => d['Total Dead and Missing'];
const maxRadius = 15;

export const BubbleMap = ({ world, data, filteredData }) => {
    const sizeScale = useMemo(
        () =>
        scaleSqrt()
            .domain([0, max(data, sizeValue)])
            .range([0, maxRadius]),
        [data, sizeValue, maxRadius]
    );

    return (
        <Marks world={world} data={filteredData} sizeScale={sizeScale} sizeValue={sizeValue} />
    )
};
