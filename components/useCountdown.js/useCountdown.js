import { useRef, useState, useEffect, useCallback } from "react";
import { timeToMs } from "../../utils/utils";

const initialDuration = 0 * 1000;

export const useCountdown = () => {
    const millisecond = useRef(initialDuration);
    const duration = useRef(initialDuration);
    const remaining = useRef(initialDuration);
    const previousRemaining = useRef(initialDuration);    
    const elapsed = useRef(0);
    const [seconds, setSeconds] = useState(initialDuration / 1000);
    const [isRunning, setIsRunning] = useState(false);
    
    const start = useCallback(() => {
        setIsRunning(true);
    }, [setIsRunning]);

    const stop = useCallback(() => {
        setIsRunning(false);
    }, [setIsRunning]);

    const reset = useCallback(() => {
        millisecond.current = 0;
        duration.current = 0;
        remaining.current = 0;
        previousRemaining.current = 0;
        elapsed.current = 0;
        setSeconds(0);
        setIsRunning(false);
    }, [setSeconds, setIsRunning]);

    const setDuration = useCallback(({hours, minutes, seconds}) => {
        const _milliseconds = timeToMs({hours, minutes, seconds});
        millisecond.current = _milliseconds;
        duration.current = _milliseconds;
        remaining.current = _milliseconds;
        previousRemaining.current = _milliseconds;
        elapsed.current = 0;
        setSeconds(Math.floor(_milliseconds / 1000));
    }, [setSeconds]);
    
    useEffect(() => {
        if (isRunning && remaining.current >= 0) {
            let raqId;
            let previousTimestamp;
            
            // request animation frame handler
            const step = (timestamp) => {
                if (previousTimestamp) {
                    elapsed.current += timestamp - previousTimestamp;
                }
                previousTimestamp = timestamp;
                remaining.current = duration.current - elapsed.current;
                
                if (remaining.current <= 0) {
                    // countdown has no remaining time
                    cancelAnimationFrame(raqId);
                    reset();   
                } else {
                    // countdown still has remaining time
                    // compare current seconds to previous seconds to see if second has change in order to update state and displau
                    const currentSecondsRemaining = Math.ceil(remaining.current / 1000);
                    const previousSecondsRemaining = Math.ceil(previousRemaining.current/ 1000);
                    const doUpdateSecond = currentSecondsRemaining !== previousSecondsRemaining;
                    // after comparison, update previous remaining to the current remaining for comparison on next step
                    previousRemaining.current = remaining.current;
                    if (doUpdateSecond) {
                        console.log('setSeconds >', currentSecondsRemaining);
                        setSeconds(currentSecondsRemaining);
                    }
                    raqId = window.requestAnimationFrame(step);
                }
            }

            raqId = window.requestAnimationFrame(step);
        }

        return () => {
            cancelAnimationFrame(raqId);
        };
    }, [isRunning, reset]);

    // return {timer, isPlaying, setIsPlaying};
    return {
        start,
        stop,
        reset,
        setDuration,
        seconds,
        isRunning,
        duration: duration.current,
        elapsed: elapsed.current,
        remaining: remaining.current,
    }
};
