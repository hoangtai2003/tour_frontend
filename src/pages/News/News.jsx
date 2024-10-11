import React, { useContext, useEffect, useState } from 'react'
import Breadcrumbs from '../../components/Breadcrumb/Breadcrumbs'
import { NavLink, Outlet, useLocation } from 'react-router-dom'

import axios from 'axios';
import { StoreContext } from '../../components/Context/StoreContext'
const News = () => {
    useEffect(() => {
        document.title = "Hệ thống bán tour trực tuyến | Du lịch Việt"
        window.scroll(0,0)
    }, [])

    const location = useLocation();
    const { url } = useContext(StoreContext);
    const [currentPage, setCurrentPage] = useState(1);
    const [totalPage, setTotalPage] = useState(0);
    const [newsletter, setNewsletter] = useState([]);
    const maxDisplayedPages = 5;
    let startPage, endPage;
    const pageNumbers = [];
    
    const isKinhNghiemDuLich = location.pathname === '/tin-tuc/kinh-nghiem-du-lich';
    const isTinTucDuLich = location.pathname === '/tin-tuc/tin-tuc-du-lich';
    
    const fetchNews = async (cate_name) => {
        try {
            const response = await axios.get(`${url}/news/pagination/newsletter`, {
                params: { cate_name, page: currentPage }
            });
            const formattedNews  = response.data.data.map(news => {
                const localDate = new Date(news.news_date);  
                const year = localDate.getFullYear();
                const month = String(localDate.getMonth() + 1).padStart(2, '0'); 
                const day = String(localDate.getDate()).padStart(2, '0');
                const hours = String(localDate.getHours()).padStart(2, '0');  
                const minutes = String(localDate.getMinutes()).padStart(2, '0');
                const formattedDate = `${day}/${month}/${year} ${hours }:${minutes}`;
                return {...news, news_date: formattedDate}
            })
            setNewsletter(formattedNews);
            setTotalPage(response.data.totalPages);
        } catch (error) {
            console.error("Error fetching news:", error);
        }
    };
    
    useEffect(() => {
        if (isTinTucDuLich) {
            fetchNews('Tin tức du lịch');
        } else if (isKinhNghiemDuLich) {
            fetchNews('Kinh nghiệm du lịch');
        }
    }, [url, currentPage, location.pathname]);
    
    const onPageChange = (newPage) => {
        if (newPage >= 1 && newPage <= totalPage) {
            setCurrentPage(newPage);
        }
    };
    
    if (totalPage <= maxDisplayedPages) {
        startPage = 1;
        endPage = totalPage;
    } else {
        startPage = Math.max(1, currentPage - Math.floor(maxDisplayedPages / 2));
        endPage = startPage + maxDisplayedPages - 1;
        if (endPage > totalPage) {
            endPage = totalPage;
            startPage = Math.max(1, endPage - maxDisplayedPages + 1);
        }
    }
    
    for (let i = startPage; i <= endPage; i++) {
        pageNumbers.push(i);
    }
    
    return (
        <>
            <Breadcrumbs />
            <div id="news-list">
                <div className="news-header section">
                    <div className="section-container">
                        <div className="breadcrumb-container">
                            <div>
                                <NavLink className="normal-link" to="/home">Trang chủ / </NavLink>
                            </div>
                            <div>
                                {isKinhNghiemDuLich && (
                                    <NavLink className="active-link">Kinh nghiệm du lịch</NavLink>
                                )}
                                {isTinTucDuLich && (
                                    <NavLink className="active-link">Tin tức du lịch</NavLink>
                                )}
                            </div>
                        </div>
                        <h2 className="font-bold">Tin tức du lịch</h2>
                    </div>
                </div>
                <div className="news-nav section">
                    <div className="section-container">
                        <ul>
                            <li>
                                <NavLink 
                                    to="/tin-tuc/tin-tuc-du-lich" 
                                    className={({ isActive }) => (isActive ? 'active' : 'no-active')} 
                                >
                                    Tin tức du lịch
                                </NavLink>
                            </li>
                            <li>
                                <NavLink 
                                    to="/tin-tuc/kinh-nghiem-du-lich" 
                                    className={({ isActive }) => (isActive ? 'active' : 'no-active')} 
                                >
                                    Kinh nghiệm du lịch
                                </NavLink>
                            </li>
                        </ul>
                    </div>
                </div>
                <Outlet context={{ newsletter, currentPage, totalPage, onPageChange, pageNumbers }} />
            </div>
        </>
    );
};


export default News