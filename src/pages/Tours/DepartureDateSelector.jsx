import React, { useState } from 'react';
import { FaArrowRight, FaArrowLeft } from 'react-icons/fa';
import { NavLink } from 'react-router-dom';

const DepartureDateSelector = ({ tour }) => {
    const allDates = tour.tourChildren?.map((tourChild) => (
        new Date(tourChild.start_date).toLocaleDateString('vi-VN', {
          day: '2-digit',
          month: '2-digit',
        })
      )) || [];      
  const [startIndex, setStartIndex] = useState(0);
  const visibleDatesCount = 5;

  const handleScrollLeft = () => {
    setStartIndex((prevIndex) => Math.max(0, prevIndex - 1));
  };

  const handleScrollRight = () => {
    setStartIndex((prevIndex) => Math.min(allDates.length - visibleDatesCount, prevIndex + 1));
  };
  const visibleDates = allDates.slice(startIndex, startIndex + visibleDatesCount);

  return (
    <div className="departure-dates-container">
      <div className="departure-dates-list">
        <button 
          className="nav-button" 
          onClick={handleScrollLeft} 
          disabled={startIndex === 0}
        >
            {allDates.length > 5 ? (
               <FaArrowLeft />
            ): ""}
        </button>
        {visibleDates.map((date, index) => (
          <NavLink key={index} className="date-item" style={{textDecoration: "none"}} to={``}>
            {date}
          </NavLink>
        ))}
        <button 
          className="nav-button" 
          onClick={handleScrollRight} 
          disabled={startIndex + visibleDatesCount >= allDates.length}
        >
            {allDates.length > 5 ? (
                <FaArrowRight />
            ): ""}
        </button>
      </div>
    </div>
  );
};

export default DepartureDateSelector;