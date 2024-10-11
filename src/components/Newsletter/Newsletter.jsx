import React, { useContext, useEffect, useState } from 'react';
import axios from 'axios';
import Slider from 'react-slick';
import { NavLink } from 'react-router-dom';
import { StoreContext } from '../Context/StoreContext';
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css"
import "./newsletter.css"
const Newsletter = () => {
    const [newsletter, setNewsletter] = useState([])
    const { url } = useContext(StoreContext)
    const settings = {
        dots: true,
        infinite: true,
        autoplay: true,
        speed: 3000,
        swipeToSlide: true,
        autoplaySpeed: 2000,
        slidesToShow: 3,
        responsive: [
          {
            breakpoint: 992,
            settings: {
              slidesToShow: 2,
              slidesToScroll: 1,
              infinite: true,
              dots: true,
            },
          },
          {
            breakpoint: 576,
            settings: {
              slidesToShow: 1,
              slidesToScroll: 1,
            },
          },
        ],
      };
    useEffect(() => {
        const fetchNews = async() => {
            const response = await axios.get(`${url}/news`)
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
        }
        fetchNews();
    }, [url])
    return (
        <>
            <Slider {...settings}>
                {newsletter.slice(0, 5).map((news, index) => (
                    <div className="cards" key={index}>
                        <div className="image-container">
                            <img src={news.news_image} alt="" className="card-image" />
                            <div className="date-badge">
                            <span className="date">{news.news_date}</span>
                            </div>
                        </div>
                        <div className="card-content">
                            <NavLink to={`/tin-tuc/${news.newsCate.cate_slug}/${news.news_slug}`} className="article-title">{news.news_name}</NavLink>
                            <p className="description">{news.news_content}</p>
                            <NavLink to={`/tin-tuc/${news.newsCate.cate_slug}/${news.news_slug}`} className="read-more-btn">Xem thêm</NavLink>
                        </div>
                    </div>
                ))}
            </Slider>
        </>
    )
}

export default Newsletter
