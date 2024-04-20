import { faClock, faClockFour, faTimes } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import React, { useState, useEffect } from 'react';

const CountdownTimer = ({ totalMinutes }) => {
    const totalSeconds = totalMinutes * 60;
    const [seconds, setSeconds] = useState(totalSeconds);

    useEffect(() => {
        const intervalId = setInterval(() => {
            if (seconds > 0) {
                setSeconds(seconds - 1);
            }
        }, 1000);

        // Cleanup function to clear interval when component unmounts
        return () => clearInterval(intervalId);
    }, [seconds]);

    useEffect(() => {
        if (seconds === 0) {
            alert('Hello');
        }
    }, [seconds]);

    // Calculate remaining hours, minutes, and seconds
    const displayHours = Math.floor(seconds / 3600);
    const remainingSeconds = seconds % 3600;
    const displayMinutes = Math.floor(remainingSeconds / 60);
    const displaySeconds = remainingSeconds % 60;

    return (
        <div style={{ display: 'flex', alignItems: 'center' }}>
            <FontAwesomeIcon icon={faClockFour} />
            <div style={{ margin: '0px 8px' }}>
                {displayHours.toString().padStart(2, '0')}:
                {displayMinutes.toString().padStart(2, '0')}:
                {displaySeconds.toString().padStart(2, '0')}
            </div>
        </div>
    );
};

export default CountdownTimer;
