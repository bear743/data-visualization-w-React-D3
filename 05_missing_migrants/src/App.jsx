import { BubbleMap } from './BubbleMap/index.jsx';
import { DateHistogram } from './DateHistogram/index.jsx'
import { useData } from './useData'
import { useWorldAtlas } from './useWorldAtlas.jsx';
import { useState } from 'react';

const width = 960;
const height = 500;
const dateHistogramSize = 0.2;

const xValue = d => d["Reported Date"];

const App = () => {
    const data = useData();
    const world = useWorldAtlas();
    const [BrushExtent, setBrushExtent] = useState();

    if (!world || !data) {
        return <pre>Loading...</pre>;
    }

    const filteredData = BrushExtent ? data.filter(d => {
        const date = xValue(d);
        return date > BrushExtent[0] && date < BrushExtent[1];
    }) : data;

  return (
    <svg width={width} height={height}>
        <BubbleMap world={world} data={data} filteredData={filteredData} />
        <g transform={`translate(0, ${(1 - dateHistogramSize) * height})`}>
            <DateHistogram data={data} width={width} height={height * dateHistogramSize} setBrushExtent={setBrushExtent} xValue={xValue} />
        </g>
    </svg>
  )
}

export default App