import { useRef, useState, useEffect } from "react";

export const useCountdown = (duration = 0, initialPlaying = false) => {
    const milisecond = useRef(duration * 1000);
    const previous = useRef(milisecond);
    const [timer, setTimer] = useState(duration);
    const [isPlaying, setIsPlaying] = useState(initialPlaying);

    useEffect(() => {
        if (!isPlaying || milisecond.current <= 0) return;

        let effectInitialMs = milisecond.current;
        let effectInitialTimeStamp, handle;

        const step = (timestampMs) => {
            if (effectInitialTimeStamp === undefined)
                effectInitialTimeStamp = timestampMs;
            const elapsed = timestampMs - effectInitialTimeStamp;
            milisecond.current = effectInitialMs - elapsed;

            if (milisecond.current <= 0) {
                setTimer(0);
                console.log(
                    "cancelAnimationFrame(zero)",
                    handle,
                    milisecond.current
                );
                cancelAnimationFrame(handle);
            } else {
                const seconds = Math.floor(milisecond.current / 1000);
                const isUpdate =
                    seconds !== Math.floor(previous.current / 1000);
                previous.current = milisecond.current;

                if (isUpdate) {
                    setTimer(seconds);
                }

                if (isPlaying) {
                    handle = window.requestAnimationFrame(step);
                }
            }
        };

        handle = window.requestAnimationFrame(step);

        return () => {
            console.log(
                "cancelAnimationFrame(pause)",
                handle,
                milisecond.current
            );
            cancelAnimationFrame(handle);
        };
    }, [isPlaying]);

    return {timer, isPlaying, setIsPlaying};
};
