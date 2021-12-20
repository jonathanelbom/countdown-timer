import React, { createContext, useCallback, useContext, useState } from 'react';

const initialState = {
    totalDuration: 0,
    elapsedDuration: 0,
    remainingDuration: 0,
    running: false
};
const CountdownContext = createContext();

export const CountdownProvider = ({ children }) => {
    const [state, setState] = useState(initialState);

    return <CountdownContext.Provider value={{ state, setState }}>{children}</CountdownContext.Provider>;
};

export const useCountdownProvider = () => {
    const context = useContext(CountdownContext);
    if (context === undefined) {
        throw new Error('useCountdown must be used within a CountdownProvider');
    }
    
    const { state, setState } = context;

    const setIsRunning = useCallback(isRunning => {
        if (typeof isRunning === 'undefined') {
            isRunning = !state.isRunning
        }
        setState(currentState => ({
            ...currentState,
            running: isRunning,
        }));
    }, []);

    const reset = useCallback(() => {
        setState(currentState => ({
            ...currentState,
            ...initialState,
        }));
    }, []);

    const setPageName = useCallback(pageName => {
        setState(currentState => ({ ...currentState, pageName }));
    }, []);

    return [state, { setIsRunning, reset}];
};