import React, { useContext, useEffect, useState } from 'react'
import Breadcrumbs from '../../components/Breadcrumb/Breadcrumbs'
import { NavLink } from 'react-router-dom'
import { FaArrowLeft } from "react-icons/fa";
import { Card, Col, Container, Row } from 'react-bootstrap';
import { StoreContext } from '../../components/Context/StoreContext';
import { SlLocationPin } from "react-icons/sl";
import axios from 'axios';
import "./hotel.css"
const Hotel = () => {
    useEffect(() => {
        document.title = "Hệ thống bán tour trực tuyến | Du lịch Việt"
        window.scroll(0,0)
    }, [])
    const { url } = useContext(StoreContext)
    const [hotels, setHotel] = useState([])
    useEffect(() => {
        const fetchHotel = async() => {
            const response = await axios.get(`${url}/hotel`)
            setHotel(response.data.data)
        }
        fetchHotel()
    }, [url])
    return (
        <>
            <Breadcrumbs />
            <div className="main filter-main">
                <div className='section page-main-header'>
                    <div className="page-main-header__container section-container">
                        <div className="page-main-header__container--header">
                            <NavLink to="/home" className='search-flights-header__back-button'>
                                <FaArrowLeft />
                                <span>Quay lại</span>
                            </NavLink>
                        </div>
                        <div className="page-main-header__title animate__fadeIn animate__animated">
                            <h1>Thông tin khách sạn</h1>
                            <p className='limited-height' style={{overflow: "hidden", transition: "height 0.3s"}}>
                            Dịch vụ khách sạn của chúng tôi luôn mang đến cho Quý khách những trải nghiệm nghỉ dưỡng hoàn hảo tại các điểm đến nổi tiếng. Với tiêu chuẩn cao cấp, các khách sạn đối tác đảm bảo không gian sang trọng, tiện nghi hiện đại cùng với dịch vụ chuyên nghiệp. Đội ngũ nhân viên tận tâm sẽ giúp Quý khách có những giây phút thư giãn thoải mái và tận hưởng kỳ nghỉ một cách trọn vẹn. Dù là khách sạn ven biển hay khu nghỉ dưỡng trên núi, chúng tôi luôn sẵn sàng mang đến những lựa chọn tuyệt vời cho Quý khách.                        </p>
                        </div>
                    </div>
                </div>
                <section className='tour_list'>
                    <Container>
                        <Row>
                            {hotels.map((hotel, index) => (
                                <Col md={4} sm={6} xs={12}  className='mb-5' key={index}>
                                    <Card className='tour-card rounded-2 shadow-sm'>
                                        <div className="price-section">
                                            <div className="price-info">
                                                <span className="discounted-price">
                                                    {hotel.hotel_price.toLocaleString('vi-VN')} vnđ/đêm
                                                </span>
                                            </div>
                                        </div>
                                        <Card.Img
                                            variant='top'
                                            src={hotel.hotel_image}
                                            alt={hotel.hotel_name}
                                            className="img-fluid"
                                        />
                                        <Card.Body>
                                            <Card.Title><NavLink className="body-text text-dark text-decoration-none" to={`/khach-san/${hotel.hotel_slug}`} >{hotel.hotel_name}</NavLink></Card.Title>
                                            <Card.Text>
                                                <SlLocationPin />
                                                <span className="font-bold" style={{marginLeft: "5px"}}>Du lịch {hotel.hotelLocation.name}</span>
                                            </Card.Text>
                                            <Card.Text>
                                                <span className='content-container'>{hotel.hotel_title}</span>
                                            </Card.Text>
                                            <NavLink type='button' to={`/khach-san/${hotel.hotel_slug}`} className="btn-hotel">Xem thêm</NavLink>
                                        </Card.Body>
                                    </Card> 
                                </Col>
                            ))}
                        </Row>
                    </Container>
                </section>
            </div>
        </>

    )
}

export default Hotel