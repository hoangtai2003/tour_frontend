import React from 'react'
import "./card.css"
import { Card } from 'react-bootstrap'
import { NavLink } from 'react-router-dom'
import { IoTicketOutline } from "react-icons/io5";
import { FcAlarmClock } from "react-icons/fc";
import { SlLocationPin } from "react-icons/sl";
import { FaRegCalendarAlt } from "react-icons/fa";
const  PopularCard = ({popular}) => {
    const afterDiscount = popular.price_sale
    ? (popular.tour.price * (100 - popular.price_sale)) / 100
    : "";
    return (
        <>
            <Card className='tour-card rounded-2 shadow-sm'>
                <div className="price-section">
                    <div className="sale-tag">Sale {popular.price_sale}%</div>
                    <div className="price-info">
                        <span className="original-price">
                            {popular.tour.price.toLocaleString('vi-VN')} vnđ/người
                        </span>
                        <span className="discounted-price">
                            {afterDiscount.toLocaleString('vi-VN')} vnđ/người
                        </span>
                    </div>
                </div>
                <Card.Img
                    variant='top'
                    src={popular.tour.tourImage[Math.floor(Math.random() * popular.tour.tourImage.length)]?.image_url}
                    className="img-fluid"
                />
                <Card.Body>
                    <Card.Title><NavLink className="body-text text-dark text-decoration-none" to={`/chuong-trinh/${popular.tour.tour_slug}?tourCode=${popular.tour_code}`}>{popular.tour.name}</NavLink></Card.Title>
                    <Card.Text>
                        <IoTicketOutline style={{fontSize: "15px"}} />
                        <span className="font-bold" style={{color: "#171717", marginLeft: "8px"}}>{popular.tour_code}</span>
                    </Card.Text>
                    <Card.Text>
                        <div>
                            <SlLocationPin />
                            <span style={{marginLeft: "8px"}}>Khởi hành: </span>
                            <span className="font-bold" style={{color: "#eb5c43"}}>{popular.tour.departure_city}</span>
                        </div>
                        
                    </Card.Text>
                    
                    <Card.Text>
                        <FaRegCalendarAlt />
                        <span className="text" style={{ marginLeft: "8px"}}>Ngày khởi hành : {new Date(popular.start_date).toLocaleDateString("vi-VN")}</span>
                    </Card.Text>
                    <Card.Text>
                        <FcAlarmClock style={{fontSize: "15px"}}/>
                       <span className="text" style={{marginLeft: "8px"}}>{popular.tour.duration}</span>
                    </Card.Text>
                    <Card.Text>
                        <i className="bi bi-people-fill"></i>
                        Số chỗ : {popular.total_seats} - Số chỗ còn nhận : <span className='font-bold' style={{color: "#e01600"}}>{popular.total_seats - popular.confirmedBookingCount}</span>
                    </Card.Text>
                    
                    <NavLink type='button' className="btn-sale">Đặt ngay</NavLink>
                </Card.Body>
            </Card> 
        </>
    )
}

export default PopularCard
