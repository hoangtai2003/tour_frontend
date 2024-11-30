import React, { useState } from 'react';
import { FaArrowRight, FaArrowLeft } from 'react-icons/fa';
import { NavLink } from 'react-router-dom';

const DepartureDateSelector = ({ tour }) => {
    const today = new Date()
    today.setHours(0, 0, 0, 0);
    const allDates = tour.tourChildren
    ?.map((tourChild) => {
        const startDate = new Date(tourChild.start_date);
        return {
            formattedDate: startDate.toLocaleDateString('vi-VN', {
                day: '2-digit',
                month: '2-digit',
            }),
            originalDate: startDate,
        };
    })
    .filter(({ originalDate }) => originalDate >= today) // Lọc những ngày lớn hơn hoặc bằng ngày hiện tại
    .map(({ formattedDate }) => formattedDate) || []; // Chỉ giữ lại định dạng ngày 
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
            {visibleDates.length > 0 ? (
                <>
                    <button
                        className="nav-button"
                        onClick={handleScrollLeft}
                        disabled={startIndex === 0}
                    >
                        {allDates.length > 5 ? <FaArrowLeft /> : ""}
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
                        {allDates.length > 5 ? <FaArrowRight /> : ""}
                    </button>
                </>
            ) : (
                <h7 style={{fontSize: "12px", fontWeight: "650", color: "#e01600"}} >Hiện tại vẫn chưa có tour nào dành cho quý khách !</h7>
                
            )}
        </div>
    </div>
  );
};

export default DepartureDateSelector;