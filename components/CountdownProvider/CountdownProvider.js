import React, { createContext, useContext } from 'react';
import { useCountdown } from '../useCountdown.js/useCountdown';


const getNumberParam = (params, name, defaultValue) => {
    if (params.has(name)) {
        const value =  parseInt(params.get(name), 10);
        if (!isNaN(value)) {
            return value;
        }
    }
    return defaultValue;
}

let updateInterval = 1000;
let initialDuration = 0;
let showStartMessage = false;

if (typeof document !== 'undefined') {
    const params = new URLSearchParams(document.location.search);
    updateInterval = getNumberParam(params, 'interval', updateInterval);
    // make sure update interval >= 16, aka 60 fps max update
    updateInterval = Math.max(updateInterval, 16);
    initialDuration = getNumberParam(params, 'duration', initialDuration);
    // make sure initial duration is >= 0 and is in seconds
    initialDuration = Math.max(initialDuration, 0);
    initialDuration = Math.round(initialDuration / 1000) * 1000;
    showStartMessage = params.has('message');
}

console.log('updateInterval:', updateInterval, ', initialDuration:', initialDuration)

export const CountdownContext = createContext();

export const CountdownProvider = ({ children }) => {
    const countdown = useCountdown({
        updateInterval,
        initialDuration,
    });
    return <CountdownContext.Provider value={{...countdown, showStartMessage}}>{children}</CountdownContext.Provider>;
};

export const useCountdownProvider = () => {
    const context = useContext(CountdownContext);
    if (context === undefined) {
        throw new Error('useCountdownProvider must be used within a CountdownProvider');
    }
    return context;
};