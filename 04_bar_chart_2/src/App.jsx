import { scaleBand, scaleLinear, max} from "d3";
import { useData } from "./useData";
import { AxisBottom } from "./AxisBottom";
import { AxisLeft } from "./AxisLeft";
import { Marks } from "./Marks";
import { format } from "d3";

const width = 960;
const height = 500;
const margin = { top: 20, bottom: 60, left: 220, right: 30 };
const xAxisLabelOffset = 50;

const App = () => {
    const data = useData();

    if(!data){
        return <pre>Loading...</pre>
    }

    const innerWidth = width - margin.left - margin.right
    const innerHeight = height - margin.top - margin.bottom

    const xValue = d => d.Population;
    const yValue = d => d.Country;

    const siFormat = format('.2s');
    const xAxisTickFormat = tickValue => siFormat(tickValue).replace('G', 'B');

    const yScale = scaleBand()
        .domain(data.map(yValue))
        .range([0, innerHeight])
        .paddingInner(0.15);

    const xScale = scaleLinear()
        .domain([0, max(data, xValue)])
        .range([0, innerWidth]);

    return (
        <svg width={width} height={height}>
            <g transform={`translate(${margin.left}, ${margin.top})`} >
                <AxisBottom xScale={xScale} innerHeight={innerHeight} xAxisTickFormat={xAxisTickFormat}/>
                <AxisLeft yScale={yScale} />
                <text className="axis-label" x={innerWidth / 2} textAnchor="middle" y={innerHeight + xAxisLabelOffset}>Population</text>
                <Marks data={data} yScale={yScale} xScale={xScale} xValue={xValue} yValue={yValue} toolTipFormat={xAxisTickFormat}/>
            </g>
        </svg>
    )
};

export default App
