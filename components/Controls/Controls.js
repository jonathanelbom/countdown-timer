import { useCountdownProvider } from '../CountdownProvider/CountdownProvider';
import styles from "./Controls.module.scss";

export const Controls = () => {
    const {
		reset,
		stop,
		start,
		isRunning,
        remaining,
	} = useCountdownProvider();

    return (
        <div className={styles.root}>
            <button
                onClick={reset}
                disabled={remaining <= 0}
            >
                <span>{'Reset'}</span>
            </button>
            <button
                onClick={isRunning ? stop : start}
                disabled={remaining <= 0}
            >
                <span>{`${isRunning ? 'Stop' : 'Start'}`}</span>
            </button>
        </div>
   );
}
