import { scaleLinear, extent, scaleOrdinal } from "d3";
import { useData } from "./useData";
import { AxisBottom } from "./AxisBottom";
import { AxisLeft } from "./AxisLeft";
import { Marks } from "./Marks";
import { Dropdown } from "./Dropdown";
import { useState } from "react";
import { ColorLegend } from "./ColorLegend";

const width = 960;
const height = 500;
const margin = { top: 20, bottom: 65, left: 90, right: 200 };
const xAxisLabelOffset = 50;
const yAxisLabelOffset = 45;
const fadeOpacity = 0.2;

const options = [
    {value: "sepal_length", label: "Sepal Length"},
    {value: "sepal_width", label: "Sepal Width"},
    {value: "petal_length", label: "Petal Length"},
    {value: "petal_width", label: "Petal Width"},
];

const getLabel = value => {
    for(let i = 0; i < options.length; i++){
        if(options[i].value === value){
            return options[i].label;
        }
    }
};

const App = () => {
    const data = useData();
    const [hoveredValue, setHoveredValue] = useState(null);

    const initialXAttribute = "sepal_length";
    const [xAttribute, setXAttribute] = useState(initialXAttribute);
    const xValue = d => d[xAttribute];
    const xAxisLabel = getLabel(xAttribute);

    const initialYAttribute = "sepal_width";
    const [yAttribute, setYAttribute] = useState(initialYAttribute);
    const yValue = d => d[yAttribute];
    const yAxisLabel = getLabel(yAttribute);

    const colorValue = d => d.species;
    const colorLegendLabel = "Species";

    if(!data){
        return <pre>Loading...</pre>
    }

    const innerWidth = width - margin.left - margin.right
    const innerHeight = height - margin.top - margin.bottom

    const yScale = scaleLinear()
        .domain(extent(data, yValue))
        .range([0, innerHeight]);

    const xScale = scaleLinear()
        .domain(extent(data, xValue))
        .range([0, innerWidth])
        .nice();

    const colorScale = scaleOrdinal()
        .domain(data.map(colorValue))
        .range(["#E6842A", "#137B80", "#8E6C8A"]);

    const filteredData = data.filter(d => hoveredValue === colorValue(d));

    return (
        <>
            <label htmlFor="x-dropdown">X:</label>
            <Dropdown options={options} id="x-dropdown" selectedValue={xAttribute}  onSelectedValueChange={setXAttribute} />
            <label htmlFor="y-dropdown">Y:</label>
            <Dropdown options={options} id="y-dropdown" selectedValue={yAttribute}  onSelectedValueChange={setYAttribute} />
            <svg width={width} height={height}>
                <g transform={`translate(${margin.left}, ${margin.top})`} >
                    <g transform={`translate(${innerWidth + 60}, 60)`}>
                        <ColorLegend colorScale={colorScale} tickSpacing={30} tickSize={10} tickTextOffset={20} onHover={setHoveredValue} hoveredValue={hoveredValue} fadeOpacity={fadeOpacity} />
                        <text className="axis-label" x={-30} y={-30}>{colorLegendLabel}</text>
                    </g>
                    <AxisBottom xScale={xScale} innerHeight={innerHeight} tickOffset={5}/>
                    <AxisLeft yScale={yScale} innerWidth={innerWidth} tickOffset={5}/>
                    <text className="axis-label" x={innerWidth / 2} textAnchor="middle" y={innerHeight + xAxisLabelOffset}>{xAxisLabel}</text>
                    <text className="axis-label" textAnchor="middle" transform={`translate(${-yAxisLabelOffset}, ${innerHeight / 2}) rotate(-90)`}>{yAxisLabel}</text>
                    <g opacity={hoveredValue ? fadeOpacity : 1}>
                        <Marks data={data} xScale={xScale} yScale={yScale} colorScale={colorScale} xValue={xValue} yValue={yValue} colorValue={colorValue} circleRadius={5}/>
                    </g>
                    <Marks data={filteredData} xScale={xScale} yScale={yScale} colorScale={colorScale} xValue={xValue} yValue={yValue} colorValue={colorValue} circleRadius={5}/>
                </g>
            </svg>
        </>
    )
};

export default App
