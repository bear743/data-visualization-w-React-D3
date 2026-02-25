const width = 190;
const height = 190;


const array = d3.range(6 * 3)

const App = () => array.map(() => (
    <Face 
        width={width}
        height={height}
        centerX = {width / 2}
        centerY = {height / 2}
        strokeWidth = {10 + Math.random() * 5}
        eyeOffsetX = {30 + Math.random() * 15}
        eyeOffsetY = {30 + Math.random() * 15}
        eyeRadius = {10 + Math.random() * 5}
        mouthWidth = {10 + Math.random() * 5}
        mouthRadius = {40 + Math.random() * 20}
    />
));



const BackgroundCircle = ({ radius, strokeWidth }) => (
    <circle
        r={radius}
        fill="yellow"
        stroke="black"
        stroke-width={strokeWidth}
    />
);

const Eyes = ({ eyeRadius, eyeOffsetX, eyeOffsetY }) => (
    <>
        <circle
            cx={ - eyeOffsetX}
            cy={ - eyeOffsetY}
            r={eyeRadius}
        >
        </circle>
        <circle
            cx={ + eyeOffsetX}
            cy={ - eyeOffsetY}
            r={eyeRadius}
        >
        </circle>
    </>
);

const Mouth = ({ mouthRadius, mouthWidth }) => {
    const mouthArc = d3.arc()
    .innerRadius(mouthRadius)
    .outerRadius(mouthRadius + mouthWidth)
    .startAngle(Math.PI / 2)
    .endAngle(Math.PI * 3 / 2);

    return <path d={mouthArc()}/>;
};

const FacecContainer = ({children, width, height, centerX, centerY}) => (
    <svg width={width} height={height}>
        <g transform={`translate(${centerX}, ${centerY})`}>
            {children}
        </g>
    </svg>
);

const Face = ({ width, height, centerX, centerY, strokeWidth, eyeRadius, eyeOffsetX, eyeOffsetY, mouthRadius, mouthWidth }) => (
    <FacecContainer width={width} height={height} centerX={centerX} centerY={centerY}>
        <BackgroundCircle radius={centerY - strokeWidth / 2} strokeWidth={strokeWidth}/>
        <Eyes eyeRadius={eyeRadius} eyeOffsetX={eyeOffsetX} eyeOffsetY={eyeOffsetY}/>
        <Mouth mouthRadius={mouthRadius} mouthWidth={mouthWidth}/>
    </FacecContainer>
);



const rootElement = document.getElementById('root');
ReactDOM.render(<App />, rootElement);