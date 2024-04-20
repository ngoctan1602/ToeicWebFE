import { faClock, faClockFour, faTimes } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import React, { useState, useEffect } from 'react';
import clock from "../../../assets/clock.png"
import { Button } from 'antd';
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
        // display: 'flex', alignItems: 'center', width: '100%', background: 'red'
        <div style={{ width: '100%' }}>
            {/* <FontAwesomeIcon icon={faClockFour} /> */}
            <p style={{ width: '100%', fontSize: 16, textAlign: 'center' }}>Thời gian làm bài</p>
            <div style={{ margin: '8px 0px', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: 16 }}>
                <img src={clock} style={{ width: 50, height: 50 }}></img>
                {displayHours.toString().padStart(2, '0')}:
                {displayMinutes.toString().padStart(2, '0')}:
                {displaySeconds.toString().padStart(2, '0')}
            </div>
            <Button style={{ width: '100%' }} className='button-confirm '>
                Nộp bài
            </Button>
        </div >
    );
};

export default CountdownTimer;
