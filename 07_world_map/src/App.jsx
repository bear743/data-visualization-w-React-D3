import { useWorldAtlas } from "./useWorldAtlas";
import { Marks } from "./Marks";
import { useCities } from "./useCities";
import { scaleSqrt, max } from "d3";

const width = 960;
const height = 500;

const sizeValue = d => d.population;
const maxRadius = 5;



const App = () => {
    const world = useWorldAtlas();
    const cities = useCities();

    if(!world || !cities){
        return <pre>Loading...</pre>
    }

    const sizeScale = scaleSqrt()
        .domain([0, max(cities, sizeValue)])
        .range([0, maxRadius])

    return (
        <svg width={width} height={height}>
            <Marks world={world} cities={cities} sizeScale={sizeScale} sizeValue={sizeValue} />
        </svg>
    )
};

export default App
