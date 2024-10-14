import React, { useEffect, useState } from 'react';
import './App.css'

const INTERVAL_DIMENSION = 300; // Dimension of the interval of timer

function App() {
  const [seconds, setSeconds] = useState(INTERVAL_DIMENSION);
  const [isActive, setIsActive] = useState(false);

  function handleStart() {
    setIsActive(true);
  }

  function handleStop() {
    setIsActive(false);
  }

  function handleRestart() {
    setIsActive(false);
    setSeconds(INTERVAL_DIMENSION);
  }

  useEffect(() => {
    let interval;
    if (isActive && seconds > 0) {
      interval = setInterval(() => {
        setSeconds((prevSeconds) => prevSeconds - 1);
      }, 1000);
    } else if (seconds === 0) {
      clearInterval(interval);
      setIsActive(false);
    }
    return () => clearInterval(interval);
  }, [seconds, isActive]);

  function formatTimer() {
    const minutes = Math.floor(seconds / 60);
    const remainingSeconds = seconds % 60;
    return `${String(minutes).padStart(2, '0')}:${String(remainingSeconds).padStart(2, '0')}`;
  }

  return (
    <div className='app'>
      <div className='app__timer'>
        <h1 className='app__timer-heading'>Timer</h1>
        <p className='app__timer-timerValue'>{formatTimer()}</p>
      </div>
      <div className='app__buttons'>
        <button className="app__buttons-startButton" onClick={handleStart}>Start</button>
        <button className='app__buttons-stopButton' onClick={handleStop}>Stop</button>
        <button className='app__buttons-restartButton' onClick={handleRestart}>Restart</button>
      </div>
    </div>
  );
}

export default App;
