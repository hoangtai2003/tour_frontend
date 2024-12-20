import React, { useState, useEffect } from 'react';

const QuantityCounter = ({ label, description, initialValue = 0, min = 0, max = 10, onChange }) => {
  const [value, setValue] = useState(initialValue);

  const increment = () => {
    const newValue = Math.min(value + 1, max);
    setValue(newValue);
    onChange(newValue); // Gọi hàm onChange để thông báo sự thay đổi
  };

  useEffect(() => {
    setValue(initialValue);
  }, [initialValue]);
  const decrement = () => {
    const newValue = Math.max(value - 1, min);
    setValue(newValue);
    onChange(newValue); // Gọi hàm onChange để thông báo sự thay đổi
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
                        className="booking-minus"
                        role="button"
                        tabIndex={0}
                        aria-label="Giảm"
                    >
                        -
                    </div>
                    <span className="">{value}</span>
                    <div
                        onClick={increment}
                        className="booking-plus"
                        role="button"
                        tabIndex={0}
                        aria-label="Tăng"
                    >
                        +
                    </div>
                </div>
            </div>
        </div>
    );
};

export default QuantityCounter;
