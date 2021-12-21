import { useEffect, useState } from 'react';
import { useCountdownProvider } from '../CountdownProvider/CountdownProvider';
import styles from "./Messaging.module.scss";

export const Messaging = () => {
    const {
		isRunning,
        seconds
	} = useCountdownProvider();
    const [hide, setHide] = useState(false);
    
    useEffect(() => {
        if (!hide && isRunning) {
            setHide(true);
        }
    }, [isRunning, hide]);
    
    return !hide && !isRunning && seconds <= 0
        ? (
            <div className={styles.root}>
                <div className={styles.message}>
                    {'Tap the numbers to set a countdown'}
                </div>
            </div>
        )
        : null;
}
