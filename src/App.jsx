import React, { useEffect, useState } from 'react';
import './App.css';
import INTERVAL_DIMENSION_DEFAULT from './DefaultInterval';

import Configuration from './Configuration';

function App() {
  const [seconds, setSeconds] = useState(INTERVAL_DIMENSION_DEFAULT);
  const [isActive, setIsActive] = useState(false);
  const [intervalTimer, setIntervalTimer] = useState(0);
  const [isConfiguration, setIsConfiguration] = useState(true);

  function handleStart() {
    setIsActive(true);
  }

  function handleStop() {
    setIsActive(false);
  }

  function handleRestart() {
    setIsActive(false);
    setSeconds(intervalTimer);
  }

  function handleChangeInterval(e) {
    setIntervalTimer(parseInt(e.target.value, 10));
  }

  function handleBackConfiguration() {
    setIsConfiguration(true);
  }

  function handleProceed() {
    if(intervalTimer === 0) {
      return;
    }
    setIsConfiguration(false);
    setSeconds(intervalTimer);
    setIsActive(false);
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

  if (isConfiguration) {
    return (
      <Configuration
      intervalTimer={intervalTimer}
        handleChangeInterval={handleChangeInterval}
        handleProceed={handleProceed}
      />
    );
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
      <div className='app__goBackConfiguration'>
        <p>If you'd like to adjust the timer duration, you can return to the configuration screen by clicking the button below:</p>
        <button className='app__goBackConfiguration_button' onClick={handleBackConfiguration}>Back to Configuration</button>
      </div>
    </div>
  );
}

export default App;
