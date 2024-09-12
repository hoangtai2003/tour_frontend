import React, { useState } from 'react';

const QuantityCounter = ({ label, description, initialValue = 0, min = 0, max = Infinity }) => {
  const [value, setValue] = useState(initialValue);

  const increment = () => {
    setValue(prevValue => Math.min(prevValue + 1, max));
  };

  const decrement = () => {
    setValue(prevValue => Math.max(prevValue - 1, min));
  };

  return (
    <div className="booking-container">
      <div className="booking-count">
        <div className='booking-information'>
            <label className="booking-label">{label}</label>
            <p className='booking-description'>{description}</p>
        </div>
        <div className="booking_number">
            <div
                onClick={decrement}
                className= "booking-plus"
                role="button"
                tabIndex={0}
                aria-label="Giảm"
                onKeyPress={(e) => e.key === 'Enter' && decrement()}
            >
            -
            </div>
            <span className="">{value}</span>
            <div
             onClick={increment}
                className="booking-minus"
                role="button"
                tabIndex={0}
                aria-label="Tăng"
                onKeyPress={(e) => e.key === 'Enter' && increment()}
            >
            +
            </div>
        </div>

      </div>
    </div>
  );
};

export default QuantityCounter;
