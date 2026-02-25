const width = 960;
const height = 500;
const centerX = width / 2;
const centerY = height / 2;

const pieArc = d3.arc().innerRadius(0).outerRadius(width);
const pie = d3.pie().value(1);

const App = () => {
    const [data, setData] = React.useState(null)

    const csvUrl ="https://gist.githubusercontent.com/bear743/1d1285e5326d54bac06bdab9c8003157/raw/css_named_colors.csv";
        
    React.useEffect(() => {
        d3.csv(csvUrl).then(setData)
    }, [])

    if(!data){
        return <pre>Loading...</pre>
    }

    console.log(pie(data)[0])
    
    return (
        <svg width={width} height={height}>
            <g transform={`translate(${centerX}, ${centerY})`}>
                {
                    pie(data).map((d) => (
                        <path fill={d.data["RGB hex value"]} 
                        d={pieArc(d)} />
                    ))
                }
            </g>
        </svg>
    )

        // <svg width={width} height={height}>
        //     <g transform={`translate(${centerX}, ${centerY})`}>
        //         {
        //             data.map((d, i) => (
        //                 <path fill={d["RGB hex value"]} 
        //                 d={pieArc({
        //                     startAngle: i / data.length * 2 * Math.PI,
        //                     endAngle: (i + 1) / data.length * 2 * Math.PI,
        //                 })} />
        //             ))
        //         }
        //     </g>
        // </svg>
};

const rootElement = document.getElementById('root');
ReactDOM.render(<App />, rootElement);