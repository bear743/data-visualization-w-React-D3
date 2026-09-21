import { Marks } from "./Marks";
import { scaleLinear, scaleTime, timeFormat, extent, bin, timeMonths, sum, max, brushX, select } from "d3";
import { AxisBottom } from './AxisBottom';
import { AxisLeft } from './AxisLeft';
import { useEffect, useMemo, useRef } from "react";

const margin = { top: 0, bottom: 20, left: 45, right: 30 };
const xAxisLabelOffset = 20;
const yAxisLabelOffset = 30;

const xAxisLabel = "Time";

const yValue = d => d["Total Dead and Missing"];
const yAxisLabel = "Total Dead and Missing";

const xAxisTickFormat = timeFormat('%m/%d/%Y');

export const DateHistogram = ({
  data,
  width,
  height,
  setBrushExtent,
  xValue
}) => {
    const innerWidth = width - margin.left - margin.right;
    const innerHeight = height - margin.top - margin.bottom;

    const brushRef = useRef();

    useEffect(() => {
      const brush = brushX().extent([[0, 0], [innerWidth, innerHeight]]);
      brush(select(brushRef.current));
      brush.on("brush end", (event) => {
        if (event.selection) {
          setBrushExtent(event.selection.map(xScale.invert));
        } else {
          setBrushExtent(null);
        }
      })
    }, [innerWidth, innerHeight]);

    const xScale = useMemo(
      () =>
        scaleTime()
        .domain(extent(data, xValue))
        .range([0, innerWidth])
        .nice(),
        [data, xValue, innerWidth]
    );

    const binnedData = useMemo(() => {
      const [start, stop] = xScale.domain();
      return bin()
        .value(xValue)
        .domain(xScale.domain())
        .thresholds(timeMonths(start, stop))(data)
        .map(array => ({
            y: sum(array, yValue),
            x0: array.x0,
            x1: array.x1
        }));
    }, [xValue, xScale, yValue, data]);

    const yScale = useMemo(
      () =>
        scaleLinear()
        .domain([0, max(binnedData, d => d.y)])
        .range([innerHeight, 0])
        .nice(),
      [binnedData, innerHeight]
    );

    return (
        <>
          <rect width={width} height={height} fill="white" />
          <g transform={`translate(${margin.left},${margin.top})`}>
            <AxisBottom
              xScale={xScale}
              innerHeight={innerHeight}
              tickFormat={xAxisTickFormat}
              tickOffset={5}
            />
            <text
              className="axis-label"
              textAnchor="middle"
              transform={`translate(${-yAxisLabelOffset},${innerHeight /
                2}) rotate(-90)`}
            >
              {yAxisLabel}
            </text>
            <AxisLeft yScale={yScale} innerWidth={innerWidth} tickOffset={5} />
            <text
              className="axis-label"
              x={innerWidth / 2}
              y={innerHeight + xAxisLabelOffset}
              textAnchor="middle"
            >
              {xAxisLabel}
            </text>
            <Marks
              data={binnedData}
              xScale={xScale}
              yScale={yScale}
              tooltipFormat={xAxisTickFormat}
              innerHeight={innerHeight}
            />
            <g ref={brushRef} />
          </g>
        </>
      );
};
