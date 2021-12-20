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
    const progress = (seconds / (duration / 1000)) * 100 || 0;
    const diameter = 340;
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
    const shadowAdj = 10;

    return (
        <>
            <div className={styles.root}>
                <div style={progressStyle}>
                    <svg
                        className={styles.svg}
                        width={diameter}
                        height={diameter}
                        viewBox={`${-shadowAdj} ${-shadowAdj} ${diameter + shadowAdj * 2} ${diameter + shadowAdj * 2}`}
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
                        <circle className={`${styles.value} ${!isRunning ? styles.value_not_running : ''}`} style={progressBarStyle}  cx={center} cy={center} r={radius} strokeWidth={strokeWidth + 2} />
                    </svg>
                </div>
            </div>
        </>
   );
}
