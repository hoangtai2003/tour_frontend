import React, { useEffect } from 'react'
import './news-travel.css'
import { NavLink, useOutletContext } from 'react-router-dom'
import { FaArrowLeft } from "react-icons/fa";
import { FaArrowRight } from "react-icons/fa";
const ExperienceTravel = () => {
    useEffect(() => {
        document.title = "Hệ thống bán tour trực tuyến | Du lịch Việt"
        window.scroll(0,0)
    }, [])
    const { newsletter, currentPage, totalPage, onPageChange, pageNumbers } = useOutletContext();
    return (
        <>
            <div className="news-list section">
                <div className="section-container">
                    <div id="card-container">
                        {newsletter.map((news, index) => (
                            <div className="cards" key={index}>
                                <NavLink className="view-more" to={`/tin-tuc/kinh-nghiem-du-lich/${news.news_slug}`}>
                                    <img src={news.news_image} className='card-img' alt="" style={{color: "transparent"}}/>
                                    <div className="content">
                                        <div className="main-content">
                                            <h4>{news.news_name}</h4>
                                            <div className="info">
                                                <div className="time clr-gray">{news.news_date}</div>
                                            </div>
                                            <div className="text">{news.news_content}</div>
                                        </div>
                                        <div className="view-more">
                                            Xem chi tiết  ⇀
                                        </div>
                                    </div>
                                </NavLink>
                            </div>
                        ))}
                    </div>
                </div>
            </div>
            <div className="pagination">
                <button onClick={() => onPageChange(currentPage - 1)} disabled={currentPage === 1}>
                    <FaArrowLeft />
                </button>
                {pageNumbers.map((page, index) => (
                    <span 
                        key={index} 
                        className={page === currentPage ? 'active' : ''} 
                        onClick={() => onPageChange(page)}
                    >
                        {page}
                    </span>
                ))}
                <button onClick={() => onPageChange(currentPage + 1)} disabled={currentPage === totalPage}>
                    <FaArrowRight />
                </button>
            </div>
        </>
    )
}

export default ExperienceTravel
