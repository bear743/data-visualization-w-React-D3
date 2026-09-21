export const Marks = ({ data, xScale, yScale, colorScale, xValue, yValue, colorValue, circleRadius=10}) => (
  data.map((d, idx) => (
      <circle
      key={idx}
        className="mark"
        cx={xScale(xValue(d))}
        cy={yScale(yValue(d))}
        r={circleRadius}
        fill={colorScale(colorValue(d))}>
        <title>{`(${xValue(d)}, ${yValue(d)})`}</title>
      </circle>
                ))
)