import React, { createContext, useCallback, useContext, useState } from 'react';
import { useCountdown } from '../useCountdown.js/useCountdown';

export const CountdownContext = createContext();

export const CountdownProvider = ({ children }) => {
    const countdown = useCountdown();
    return <CountdownContext.Provider value={countdown}>{children}</CountdownContext.Provider>;
};

export const useCountdownProvider = () => {
    const context = useContext(CountdownContext);
    if (context === undefined) {
        throw new Error('useCountdownProvider must be used within a CountdownProvider');
    }
    return context;
};