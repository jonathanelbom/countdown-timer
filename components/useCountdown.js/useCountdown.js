import { useRef, useState, useEffect, useCallback } from "react";
import { timeToMs } from "../../utils/utils";

export const useCountdown = ({updateInterval = 1000, initialDuration = 0} = {}) => {
    const previousRemaining = useRef(initialDuration);
    const elapsed = useRef(0);
    const elapsedForInterval = useRef(0);  
    const [seconds, setSeconds] = useState(initialDuration / 1000);
    const [isRunning, setIsRunning] = useState(false);
    const [duration, setDuration] = useState(initialDuration);
    
    // method to force a re-render by updating a 
    // state variable that is used by React.Context
    const [updateStateCount, setUpdateStateCount] = useState(0);
    const updateState = useCallback(() => {
        setUpdateStateCount(prevCount => prevCount + 1);
    }, [setUpdateStateCount]);

    const start = () => setIsRunning(true);
    const stop = () => setIsRunning(false);
    
    const reset = useCallback(() => {
        previousRemaining.current = duration;
        elapsed.current = 0;
        elapsedForInterval.current = 0;
        setSeconds(duration / 1000);
        setIsRunning(false);
        // needed because state might not change (and hence no DOM update)
        // from setSeconds value or setIsRunning value
        updateState();
    }, [setSeconds, setIsRunning, duration]);

    const onEnd = useCallback(() => {
        setSeconds(0);
        setIsRunning(false);
    }, [setSeconds, setIsRunning]);
    
    const _setDuration = ({hours, minutes, seconds}) => {
        const milliseconds = timeToMs({hours, minutes, seconds});
        previousRemaining.current = milliseconds;
        elapsed.current = 0;
        elapsedForInterval.current = 0;
        setDuration(milliseconds);
        setSeconds(milliseconds / 1000);
    };
    
    useEffect(() => {
        let remaining = duration - elapsed.current;
        let raqId;
        let previousTimestamp;
        if (isRunning && remaining >= 0) {
            // request animation frame handler
            const step = (timestamp) => {
                if (previousTimestamp) {
                    elapsed.current += timestamp - previousTimestamp;
                } else {
                    // for tracking sub-interval updates,
                    // reset the elapsedForInterval time
                    elapsedForInterval.current = elapsed.current;
                }
                previousTimestamp = timestamp;
                remaining = duration - elapsed.current;
                
                if (remaining <= 0) {
                    // countdown has no remaining time
                    // cancelAnimationFrame(raqId);
                    onEnd();
                } else {
                    // countdown still has remaining time
                    // compare current seconds to previous seconds to see if second has changed
                    const currentSecondsRemaining = Math.ceil(remaining / 1000);
                    const previousSecondsRemaining = Math.ceil(previousRemaining.current/ 1000);
                    // after comparison, update previous remaining to the current remaining for comparison on next step
                    previousRemaining.current = remaining;
                    // if seconds has changed, update state and DOM
                    if (currentSecondsRemaining !== previousSecondsRemaining) {
                        setSeconds(currentSecondsRemaining);
                    } else if (updateInterval < 1000) {
                        // if seconds hasn'haven't changed and
                        // the update interval is less than 1000ms,
                        // compare elapsed for sub-second updates
                        if (elapsed.current - elapsedForInterval.current >= updateInterval) {
                            elapsedForInterval.current = elapsed.current;
                            // we want to make sure the state updates
                            // to ensure DOM rerenders, even though there
                            // is no partcular state variable we are updating
                            // for use here
                            updateState();
                        }
                    }
                    raqId = window.requestAnimationFrame(step);
                }
            }
            
            raqId = window.requestAnimationFrame(step);
        }

        return () => {
            cancelAnimationFrame(raqId);
        };
    }, [isRunning, reset, duration, updateInterval]);

    return {
        start,
        stop,
        reset,
        setDuration: _setDuration,
        seconds,
        isRunning,
        updateInterval,
        duration,
        elapsed: elapsed.current,
        remaining: duration - elapsed.current,
    }
};
