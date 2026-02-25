const width = 960;
const height = 500;
const margin = { top: 20, bottom: 20, left: 200, right: 20 }
const innerWidth = width - margin.left - margin.right
const innerHeight = height - margin.top - margin.bottom

const App = () => {
    const [data, setData] = React.useState(null)

    const csvUrl ="https://gist.githubusercontent.com/bear743/8df529cd24555d63b442ed2565aa097c/raw/8c99bbc42b0bd1d06536601a7cad71acb69368c7/UN_PPP2024_Output_PopTot.csv";
        
    React.useEffect(() => {
        const row = d => {
            d.Population = +d["2024"];
            return d;
        }
        d3.csv(csvUrl, row).then(data => {
            setData(data.slice(0, 10));
        })
    }, [])

    if(!data){
        return <pre>Loading...</pre>
    }

    const yScale = d3.scaleBand()
        .domain(data.map(d => d.Country))
        .range([0, innerHeight]);

    const xScale = d3.scaleLinear()
        .domain([0, d3.max(data, d => d.Population)])
        .range([0, innerWidth]);
    
    return (
        <svg width={width} height={height}>
            <g transform={`translate(${margin.left}, ${margin.top})`} >
                {xScale.ticks().map(tickValue => (
                    <g key={tickValue} transform={`translate(${xScale(tickValue)}, 0)`}>
                        <line y2={innerHeight} stroke="black" />
                        <text y={innerHeight + 3} dy=".71em" style={{textAnchor: 'middle'}}>
                            {tickValue}
                        </text>
                    </g>
                ))}
                {yScale.domain().map(tickValue => (
                        <text 
                            key={tickValue}
                            style={{textAnchor: "end"}} 
                            dy=".32em"
                            y={yScale(tickValue) + yScale.bandwidth() / 2}
                            x={-3}
                        >
                            {tickValue}
                        </text>
                ))}
                {data.map(d => (
                    <rect key={d.Country} x={0} y={yScale(d.Country)} width={xScale(d.Population)} height={yScale.bandwidth()}></rect>
                ))}
            </g>
        </svg>
    )
};

const rootElement = document.getElementById('root');
ReactDOM.render(<App />, rootElement);