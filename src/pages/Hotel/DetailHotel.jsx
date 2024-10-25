import React, { useContext, useEffect, useState } from 'react'
import Breadcrumbs from '../../components/Breadcrumb/Breadcrumbs'
import { Card, Col, Container, Row } from 'react-bootstrap'
import { NavLink, useParams } from 'react-router-dom'
import { StoreContext } from '../../components/Context/StoreContext'
import { SlLocationPin } from "react-icons/sl";
import axios from 'axios'
const DetailHotel = () => {
    const { slug } = useParams()
    const { url } = useContext(StoreContext)
    const [hotel, setHotel] = useState([])
    const [hotelRelated, setHotelRelated] = useState([])
    const [hotelRandom, setHotelRandom] = useState([])
    useEffect(() => {
        const fetchHotel = async() => {
            const response = await axios.get(`${url}/hotel/${slug}`)
            setHotel(response.data.data)
        }
        const fetchHotelRelated = async() => {
            const response = await axios.get(`${url}/hotel/related/${slug}`)
            setHotelRelated(response.data.data)
        }
        const fetchHotelRandom = async() => {
            const response = await axios.get(`${url}/hotel/related/${slug}`)
            const randomHotel = response.data.data.sort(() => Math.random() - 0.5)
            setHotelRandom(randomHotel)
        }
        fetchHotel()
        fetchHotelRelated()
        fetchHotelRandom()
    }, [url, slug])
    return (
        <>
            <Breadcrumbs />
            <div className='hotel-detail py-5 section'>
                <div className="section-container">
                    <Row>
                        <div className="left main-content">
                            <div className="main-content--title">
                                <div className="breadcrumb-container">
                                    <div>
                                        <NavLink className="normal-link" to="/home">Trang chủ / </NavLink>
                                    </div>
                                    <div>
                                        <NavLink className='active-link'> {hotel.hotel_name}</NavLink>
                                    </div>
                                </div>
                                <h2 className='main-title'>{hotel.hotel_name}</h2>
                            </div>
                            <div className="wrapper">
                                <div className="info">
                                    <div className="type clr-red ">
                                        Du lịch {hotel.hotelLocation ? hotel.hotelLocation.name : "Danh mục không có sẵn"}
                                    </div>
                                    <div className="time clr-gray">
                                        Giá tiền: <span>{hotel.hotel_price ? hotel.hotel_price.toLocaleString('vi-VN') : ""} vnđ/đêm</span>
                                    </div>
                                    <div className="hotel_address">
                                        <span className='font-bold'>Địa chỉ: {hotel.hotel_address}</span>
                                    </div>
                                    <div className="hotel_phone">
                                        <span className='font-bold'>Số điện thoại: {hotel.hotel_phone}</span>
                                    </div>

                                    <p>{hotel.hotel_title}</p>
                                </div>
                                <h2>Thông tin về khách sạn</h2>
                                <div className="content" dangerouslySetInnerHTML={{ __html: hotel.hotel_description }}></div>
                            </div>
                        </div>
                        <div className='right sidebar'>
                            <div className="tour_list">
                                {hotelRandom.length > 0 ? (
                                    hotelRandom.slice(0,2).map((hotel, index) => {
                                        return (
                                            <Card key={index} className='tour-card rounded-2 shadow-sm'>
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
                                        )
                                    })
                                ) : ""}
                            </div>

                                      
                        </div>
                    </Row>
                </div>
            </div>
        </>

    )
}

export default DetailHotel
