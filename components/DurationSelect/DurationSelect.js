import { useCountdownProvider } from '../CountdownProvider/CountdownProvider';
import { getDurationOptions, msToTime } from '../../utils/utils';
import styles from "./DurationSelect.module.scss";

const hoursOptions = getDurationOptions('hours');
const minutesOptions = getDurationOptions('minutes');
const secondsOptions = getDurationOptions('seconds');

export const DurationSelect = () => {
    const {
		setDuration,
		stop,
		isRunning,
		seconds: _seconds,
	} = useCountdownProvider();
    
    const {hours, minutes, seconds} = msToTime(_seconds * 1000);

    const onInputFocus = (e) => {
        if (isRunning) {
            stop();
        }
    }

    const getOnSelect = (type) => {
        return (e) => {
            const value = e.target.value;
            setDuration({
                hours,
                minutes,
                seconds,
                [type]: parseInt(value, 10)
            });

            // blur select after selection
            document.activeElement?.blur();
        }
    }

    const contentData = [
        {
            type: 'select',
            children: hoursOptions,
            value: hours,
            id: 'hours-select',
            onChange: getOnSelect('hours'),
        },
        {
            type: 'colon'
        },
        {
            type: 'select',
            children: minutesOptions,
            value: minutes,
            id: 'minutes-select',
            onChange: getOnSelect('minutes'),
        },
        {
            type: 'colon'
        },
        {
            type: 'select',
            children: secondsOptions,
            value: seconds,
            id: 'seconds-select',
            onChange: getOnSelect('seconds')
        }
    ]

    return (
        <div className={styles.root}>
            <div className={styles.selects}>
                {contentData.map(({children, type, ...props}, i) => (
                    type === 'select'
                        ? (
                            <select
                                key={`select-${i}`}
                                className={styles.select}
                                onFocus={onInputFocus}
                                {...props}
                            >
                                {children}
                            </select>
                        )
                        : (
                            <span
                                key={`colon-${i}`}
                                className={styles.colon}
                            >
                                {':'}
                            </span>
                        )

                ))}
            </div>
        </div>
   )
}
