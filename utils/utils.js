export const msToTime = (duration = 0) => {
    let _milliseconds = parseInt((duration % 1000));
    let _seconds = Math.floor((duration / 1000) % 60);
    let _minutes = Math.floor((duration / (1000 * 60)) % 60);
    let _hours = Math.floor((duration / (1000 * 60 * 60))); //  % 24);

    return {
        _hours,
        _minutes,
        _seconds,
        _milliseconds,
        hours: _hours.toString().padStart(2, '0'),
        minutes: _minutes.toString().padStart(2, '0'),
        seconds: _seconds.toString().padStart(2, '0'),
        milliseconds: _milliseconds.toString().padStart(3, '0'),
    };
};

export const timeToMs = ({hours = 0, minutes = 0, seconds = 0, milliseconds = 0}) => {
    let _milliseconds = parseInt(milliseconds, 10);
    let _seconds = parseInt(seconds, 10) * 1000;
    let _minutes = parseInt(minutes, 10) * 60 * 1000;
    let _hours = parseInt(hours, 10) * 60 * 60 * 1000;
    return _milliseconds + _seconds + _minutes + _hours;
}

export const getDurationOptions = (type) =>
    new Array(type === 'hours' ? 100 : 60).fill('').map((_, index) => {
        const value = index.toString().padStart(2, '0');
        return (
            <option key={`${type}-option-${index}`} value={value}>
                {value}
            </option>
        );
    });

export const calculateProgress = ({isRunning, updateInterval, remaining, duration}) => {
    // to accomdate for css transition, when running,
    // subtract updateInterval from remaining time
    const progressAdjust = isRunning ? updateInterval : 0;
    const progress = duration > 0
        ? (remaining - progressAdjust) / duration
        : 0;
    return Math.min(1, Math.max(0, progress));
}

export const calculateTransitionDuration = ({isRunning, updateInterval, remaining, elapsed}) => {
    // when running, transition duration is set to updateInterval, otherwise set it to 350ms,
    // unless just starting and stopping countdown, in which case, set it to 0ms
    let duration = 0;
    if (isRunning) {
        duration = remaining < updateInterval ? remaining : updateInterval;
    } else {
        duration = elapsed > 0 ? 0 : 350;
    } 
    return `${duration}ms`;
}
