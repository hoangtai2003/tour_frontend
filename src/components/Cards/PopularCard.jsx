import React from 'react'
import "./card.css"
import { Card } from 'react-bootstrap'
import { NavLink } from 'react-router-dom'
const  PopularCard = ({popular}) => {
  return (
    <>
        <Card className='tour-card rounded-2 shadow-sm'>
            {popular.afterDiscount ? (
                <div className="price-section">
                    <div className="sale-tag">Sale 20%</div>
                    <div className="price-info">
                        <span className="discounted-price">
                            {popular.afterDiscount.toLocaleString()} vnd/người
                        </span>
                        <span className="original-price">
                            {popular.price.toLocaleString()} vnd/người
                        </span>
                    </div>
                </div>
            ) : (
                <div className="price-section">
                    <div className="price-info">
                        <span className="only-price">
                            {popular.price.toLocaleString()} vnd/người
                        </span>
                    </div>
                </div>
            )}
            <Card.Img
                variant='top'
                src={popular.image}
                className="img-fluid"
                alt={popular.title}
            />
            <Card.Body>
                <h5 className="days">{popular.days}</h5>
                <Card.Title><NavLink className="body-text text-dark text-decoration-none" to="tour-details">{popular.title}</NavLink></Card.Title>
                <Card.Text>
                    <i className="bi bi-geo-alt"></i>
                    <span className="text">Từ : {popular.location}</span>
                </Card.Text>
                <Card.Text>
                    <i className="bi bi-calendar"></i>
                    Khởi hành : {popular.departureDate}
                </Card.Text>
                <Card.Text>
                    <i className="bi bi-people-fill"></i>
                    Số chỗ : {popular.totalSeats} - Còn trống : {popular.availableSeats}
                </Card.Text>
                <Card.Text>
                    <i className="bi bi-check-circle-fill"></i>
                    Đã xác nhận : {popular.confirmed}
                </Card.Text>
                <Card.Text>
                    <i className="bi bi-person-check-fill"></i>
                    Số người đăng ký : {popular.registered}
                </Card.Text>
            </Card.Body>
        </Card> 
    </>
  )
}

export default PopularCard
