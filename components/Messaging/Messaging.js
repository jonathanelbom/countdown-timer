import { useEffect, useState } from 'react';
import { useCountdownProvider } from '../CountdownProvider/CountdownProvider';
import styles from "./Messaging.module.scss";

export const Messaging = () => {
    const {
        seconds
	} = useCountdownProvider();
    const [hide, setHide] = useState(false);
    
    useEffect(() => {
        if (!hide && seconds > 0) {
            setHide(true);
        }
    }, [seconds, hide]);
    
    return !hide && seconds <= 0
        ? (
            <div className={styles.root}>
                <div className={styles.message}>
                    {'Tap the numbers to set a countdown'}
                </div>
            </div>
        )
        : null;
}
