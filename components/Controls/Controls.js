import { useCountdownProvider } from '../CountdownProvider/CountdownProvider';
import styles from "./Controls.module.scss";

export const Controls = () => {
    const {
		reset,
		stop,
		start,
		isRunning,
        elapsed,
        remaining,
	} = useCountdownProvider();
    
    const onStartStop = (e) => isRunning ? stop() : start();
    
    return (
        <div className={styles.root}>
            <button
                className={styles.button}
                {...(elapsed > 0 && {onTouchStart: reset})}
                onTouchEnd={e => e.preventDefault()}
                onClick={reset}
                disabled={elapsed === 0}
            >
                <span>{'Reset'}</span>
            </button>
            <button
            className={styles.button}
                {...(remaining > 0 && {onTouchStart: onStartStop})}
                onTouchEnd={e => e.preventDefault()}
                onClick={onStartStop}
                disabled={remaining <= 0}
            >
                <span>{`${isRunning ? 'Stop' : 'Start'}`}</span>
            </button>
        </div>
   );
}
