import React, { useContext, useEffect, useState } from 'react'
import Breadcrumbs from '../../components/Breadcrumb/Breadcrumbs'
import { Row } from 'react-bootstrap'
import { StoreContext }  from '../../components/Context/StoreContext'
import { NavLink, useLocation, useParams } from 'react-router-dom'
import axios from 'axios'
const NewsDetailTravel = () => {
    useEffect(() => {
        document.title = "Hệ thống bán tour trực tuyến | Du lịch Việt"
        window.scroll(0,0)
    }, [])
    const location = useLocation()
    const { url } = useContext(StoreContext)
    const { slug } = useParams()
    const [newsletter, setNewsLetter] = useState([])
    const [allNews, setAllAnews] = useState([])
    const [newsRandom, setNewsRandom] = useState([])
    useEffect(() => {
        const fetchNewsDetail = async() => {
            const response = await axios.get(`${url}/news/${slug}`)
            setNewsLetter(response.data.data)
        }
        const fetchAllNews = async() => {
            const response = await axios.get(`${url}/news`)
            setAllAnews(response.data.data)
        }
        const fetchNewsRandom = async() => {
            const response = await axios.get(`${url}/news`)
            const randomNews = response.data.data.sort(() => Math.random() - 0.5);
            setNewsRandom(randomNews);
        }
        fetchNewsDetail()
        fetchAllNews()
        fetchNewsRandom()
    }, [slug, url])
    const isKinhNghiemDuLich = location.pathname === `/tin-tuc/kinh-nghiem-du-lich/${newsletter.news_slug}`
    const isTinTucDuLich = location.pathname === `/tin-tuc/tin-tuc-du-lich/${newsletter.news_slug}`
    return (
        <>
            <Breadcrumbs />
            <div className='news-detail py-5 section'>
                <div className="section-container">
                    <Row>
                        <div className="left main-content">
                            <div className="main-content--title">
                                <div className="breadcrumb-container">
                                    <div>
                                        <NavLink className="normal-link" to="/home">Trang chủ / </NavLink>
                                    </div>
                                    <div>
                                        {isTinTucDuLich && (
                                            <NavLink className='normal-link' to="/tin-tuc/tin-tuc-du-lich">Tin tức du lịch /  </NavLink>
                                        )}
                                        {isKinhNghiemDuLich && (
                                            <NavLink className='normal-link' to="/tin-tuc/kinh-nghiem-du-lich">Kinh nghiệm du lịch /  </NavLink>
                                        )}
                                    </div>
                                    <div>
                                        <NavLink className='active-link'> {newsletter.news_name}</NavLink>
                                    </div>
                                </div>

                                <h2 className='main-title'>{newsletter.news_name}</h2>
                            </div>
                            <div className="wrapper">
                                <div className="info">
                                    <div className="type clr-red">
                                    {newsletter.newsCate ? newsletter.newsCate.cate_name : "Danh mục không có sẵn"}
                                    </div>
                                    <span>-</span> 
                                    <div className="time clr-gray">
                                        {new Date(newsletter.news_date).toLocaleDateString("vi-VN")}
                                    </div>
                                    <p>{newsletter.news_content}</p>
                                </div>
                                <div className="content" dangerouslySetInnerHTML={{ __html: newsletter.news_description }}></div>
                            </div>
                        </div>
                        <div className="right sidebar">
                            <div className="news-nav">
                                <div className="wrapper">
                                    <h3>Tin tức du lịch</h3>
                                    <ul className="no-style">
                                        <li>
                                            <NavLink 
                                                to="/tin-tuc/tin-tuc-du-lich" 
                                                className={newsletter.newsCate && newsletter.newsCate.cate_name === "Tin tức du lịch" ? "" : "no-active"}
                                            >
                                                Tin tức du lịch
                                            </NavLink>
                                        </li>

                                        <li>
                                            <NavLink to="/tin-tuc/kinh-nghiem-du-lich" className={({ isActive }) => (isActive ? 'active' : "no-active")}>Kinh nghiệm du lịch</NavLink>
                                        </li>
                                    </ul>
                                </div>
                            </div>
                            <div className="news-latest">
                                <div className="wrapper">
                                    <h3>Tin mới</h3>
                                    <ul>
                                        {allNews.slice(0, 10).map((news, index) => (
                                            <li key={index}><NavLink to={`/tin-tuc/tin-tuc-du-lich/${news.news_slug}`}>{news.news_name}</NavLink></li>
                                        ))}
                                    </ul>
                                </div>
                            </div>
                            <div className="news-random">
                                <div className="wrapper">
                                    <h3>Tin ngẫu nhiên</h3>
                                    <ul>
                                        {newsRandom.slice(0, 5).map((news, index) => (
                                            <li key={index}><NavLink to={`/tin-tuc/tin-tuc-du-lich/${news.news_slug}`}>{news.news_name}</NavLink></li>
                                        ))}
                                    </ul>
                                </div>
                            </div>
                        </div>
                    </Row>
                </div>
            </div>
        </>
    )
}

export default NewsDetailTravel
