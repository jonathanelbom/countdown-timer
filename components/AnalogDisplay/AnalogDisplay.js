import { useCountdownProvider } from '../CountdownProvider/CountdownProvider';
import {calculateProgress, calculateTransitionDuration} from '../../utils/utils';
import styles from "./AnalogDisplay.module.scss";

export const AnalogDisplay = () => {
    const {
        duration,
        remaining,
        elapsed,
        isRunning,
        updateInterval,
	} = useCountdownProvider();
    const diameter = 360;
    const strokeWidth = 14;
    const overlapAdj = 30;
    const handleWidth = 12;
    const center = (diameter / 2);
    const radius = (center - (strokeWidth / 2));
    // Circumference =  Pi times diameter with half a stroke on each side subtracted
    const circumference = Math.PI * (diameter - strokeWidth);
    const progress = calculateProgress({
        isRunning,
        updateInterval,
        remaining,
        duration
    });
    const transitionDuration = calculateTransitionDuration({
        isRunning,
        updateInterval,
        remaining,
        elapsed
    });
    const progressBarStyle = {
        strokeDasharray: circumference,
        strokeDashoffset: circumference * (1 - progress),
        transitionDuration
    };

    return (
        <div className={styles.root}>
            <svg
                className={styles.svg}
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
                            transform: `rotate(${360 * progress}deg)`,
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
