import { useCountdownProvider } from '../CountdownProvider/CountdownProvider';
import styles from "./AnalogDisplay.module.scss";

const calculateProgress = (circumference, value) => {
    const progress = value / 100;
    return circumference * (1 - progress);
}

export const AnalogDisplay = () => {
    const {
        duration,
        seconds,
        isRunning
	} = useCountdownProvider();
    const progress = ((seconds - (isRunning ? 1 : 0)) / (duration / 1000)) * 100 || 0;
    const diameter = 360;
    const strokeWidth = 10;
    const center = (diameter / 2);
    const radius = (center - (strokeWidth / 2));
    const progressStyle = {
        width: `${diameter}px`,
        height: `${diameter}px`
    };
    // Circumference =  Pi times diameter. 
    // We subtact half a stroke width on either side to see where the circle center is
    const circumference = Math.PI * (diameter - strokeWidth);
    const progressBarStyle = {
        strokeDasharray: circumference,
        strokeDashoffset: calculateProgress(circumference, progress)
    };
    const overlapAdj = 30;

    return (
        <div className={styles.root}>
            <svg
                className={`${styles.svg} ${!isRunning ? styles.not_running : ''}`}
                width={diameter}
                height={diameter}
                viewBox={`${-overlapAdj} ${-overlapAdj} ${diameter + overlapAdj * 2} ${diameter + overlapAdj * 2}`}
            >   
                <g
                    className={styles.ticks}
                    style={{transform: `translate(${center}px, ${center}px)`}}
                >
                    {new Array(12).fill('').map((_, index) => (
                        <line
                            key={`tick-${index}`}
                            style={{transform: `rotate(calc(${index} * 30deg))`}}
                            x1={radius}
                            y1="0"
                            x2={radius - 30}
                            y2="0"    
                        />
                    ))}
                </g>
                <circle className={styles.meter} cx={center} cy={center} r={radius} strokeWidth={strokeWidth}/>
                <circle className={styles.value} style={progressBarStyle}  cx={center} cy={center} r={radius} strokeWidth={strokeWidth + 2} />
                <g style={{transform: `translate(${radius}px, ${radius}px)`}}>
                    <g
                        className={styles.handle}
                        style={{transform: `rotate(${Math.floor(360 * (progress/100))}deg)`}}
                    >
                        <rect y={-7} x={0} width={radius} height="14px" fill="#FADB4A"/>
                        <circle cy={0} cx={radius} r="30" fill="#FADB4A"/>
                    </g>
                </g>
            </svg>
        </div>
   );
}
