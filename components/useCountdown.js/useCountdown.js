import { useRef, useState, useEffect, useCallback } from "react";
import { timeToMs } from "../../utils/utils";

export const useCountdown = ({updateInterval = 1000, initialDuration = 0} = {}) => {
    const duration = useRef(initialDuration);
    const remaining = useRef(initialDuration);
    const previousRemaining = useRef(initialDuration);
    const elapsed = useRef(0);
    const elapsedInterval = useRef(0);  
    const [elapsedMS, setElapsedMS] = useState(0);
    const [seconds, setSeconds] = useState(initialDuration / 1000);
    const [isRunning, setIsRunning] = useState(false);

    const start = () => setIsRunning(true);
    const stop = () => setIsRunning(false);
    
    const reset = useCallback(() => {
        remaining.current = duration.current;
        previousRemaining.current = duration.current;
        elapsed.current = 0;
        elapsedInterval.current = 0;
        setSeconds(duration.current / 1000);
        setIsRunning(false);
        setElapsedMS(0);
    }, [setSeconds, setIsRunning]);

    const onEnd = useCallback(() => {
        // remaining.current = duration.current;
        // previousRemaining.current = duration.current;
        // elapsed.current = 0;
        // elapsedInterval.current = 0;
        setSeconds(0);
        setIsRunning(false);
        // setElapsedMS(0);
    }, [setSeconds, setIsRunning]);
    
    const setDuration = ({hours, minutes, seconds}) => {
        const milliseconds = timeToMs({hours, minutes, seconds});
        duration.current = milliseconds;
        remaining.current = milliseconds;
        previousRemaining.current = milliseconds;
        elapsed.current = 0;
        elapsedInterval.current = 0;
        setSeconds(milliseconds / 1000);
        setElapsedMS(0);
    };
    
    useEffect(() => {
        if (isRunning && remaining.current >= 0) {
            let raqId;
            let previousTimestamp;
            
            // request animation frame handler
            const step = (timestamp) => {
                if (previousTimestamp) {
                    elapsed.current += timestamp - previousTimestamp;
                } else {
                    elapsedInterval.current = elapsed.current;
                }
                previousTimestamp = timestamp;
                
                remaining.current = duration.current - elapsed.current;
                
                if (remaining.current <= 0) {
                    // countdown has no remaining time
                    cancelAnimationFrame(raqId);
                    onEnd();
                } else {
                    // countdown still has remaining time
                    // compare current seconds to previous seconds to see if second has change in order to update state and displau
                    const currentSecondsRemaining = Math.ceil(remaining.current / 1000);
                    const previousSecondsRemaining = Math.ceil(previousRemaining.current/ 1000);
                    // after comparison, update previous remaining to the current remaining for comparison on next step
                    previousRemaining.current = remaining.current;
                    if (currentSecondsRemaining !== previousSecondsRemaining) {
                        setSeconds(currentSecondsRemaining);
                    }
                    // compare elapsed for sub-second updates
                    const elapsedDiff = elapsed.current - elapsedInterval.current;
                    if (updateInterval < 1000 && elapsedDiff >= updateInterval) {
                        elapsedInterval.current = elapsed.current;
                        setElapsedMS(elapsed.current);
                    }
                    raqId = window.requestAnimationFrame(step);
                }
            }
            
            raqId = window.requestAnimationFrame(step);
        }

        return () => {
            cancelAnimationFrame(raqId);
        };
    }, [isRunning, reset, updateInterval]);

    return {
        start,
        stop,
        reset,
        setDuration,
        seconds,
        isRunning,
        updateInterval,
        duration: duration.current,
        elapsed: elapsed.current,
        remaining: remaining.current,
    }
};
