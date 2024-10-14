import React from 'react';
import './Configuration.css';

import INTERVAL_DIMENSION_DEFAULT from './DefaultInterval';

function Configuration({ intervalTimer, handleChangeInterval, handleProceed }) {
  return (
    <div className='configuration'>
      <div className='configuration__title'>
        <h1 className='configuration__title-h1'>TimerApp</h1>
        <p className='configuration__title-p'>
          Welcome to TimerApp, a simple application that lets you set a customizable timer. Choose the duration and start counting down!
        </p>
      </div>
      <div className='configuration__info'>
        <p className='configuration__info-text'>
          Use the field below to set the timer duration (in seconds):
        </p>
        <div className='configuration__input'>
          <input
            type="number"
            value={intervalTimer}
            onChange={handleChangeInterval}
            min="1"
            className='configuration__input-field'
          />
        </div>
      </div>
      <button className='configuration__proceedButton' onClick={handleProceed}>
        Proceed
      </button>
    </div>
  );
}

export default Configuration;
