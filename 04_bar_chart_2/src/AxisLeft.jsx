export const AxisLeft = ({ yScale }) => (
    yScale.domain().map(tickValue => (
                    <g key={tickValue} className="tick">
                        <text
                            style={{textAnchor: "end"}}
                            dy=".32em"
                            y={yScale(tickValue) + yScale.bandwidth() / 2}
                            x={-3}
                        >
                            {tickValue}
                        </text>
                    </g>
                ))
)