import { useCountdownProvider } from '../CountdownProvider/CountdownProvider';
import styles from "./AnalogDisplay.module.scss";

const calculateProgress = (circumference, value) => {
    const progress = Math.max(value, 0) / 100;
    return circumference * (1 - progress);
}

export const AnalogDisplay = () => {
    const {
        duration,
        remaining,
        elapsed,
        isRunning,
        updateInterval,
	} = useCountdownProvider();
    const progress = ((remaining - (isRunning ? updateInterval : 0)) / duration) * 100 || 0;
    const diameter = 360;
    const strokeWidth = 14;
    const overlapAdj = 30;
    const handleWidth = 12;
    const center = (diameter / 2);
    const radius = (center - (strokeWidth / 2));
    // when running, transition duration is set to updateInterval, otherwise set it to 350ms,
    // unless just starting and stopping countdown, in which case, set it to 0ms
    const transitionDuration = `${isRunning ? updateInterval : elapsed > 0 ? 0 : 350}ms`
    // Circumference =  Pi times diameter. 
    // We subtact half a stroke width on either side to see where the circle center is
    const circumference = Math.PI * (diameter - strokeWidth);
    const progressBarStyle = {
        strokeDasharray: circumference,
        strokeDashoffset: calculateProgress(circumference, progress),
        transitionDuration
    };

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
                            x1={radius}
                            y1="0"
                            x2={radius - 30}
                            y2="0"    
                        />
                    ))}
                </g>
                <circle className={styles.meter} cx={center} cy={center} r={radius} strokeWidth={strokeWidth}/>
                <circle className={styles.value} style={progressBarStyle}  cx={center} cy={center} r={radius} strokeWidth={strokeWidth + 2} />
                <g style={{transform: `translate(${radius}px, ${center}px)`}}>
                    <g
                        className={styles.handle}
                        style={{
                            transform: `rotate(${360 * progress / 100}deg)`,
                            transitionDuration,
                        }}
                    >
                        <rect y={-7} x={0} width={center} height={`${handleWidth}px`} fill="#FADB4A"/>
                        <circle cy={0} cx={radius} r="30" fill="#FADB4A"/>
                    </g>
                </g>
            </svg>
        </div>
   );
}
