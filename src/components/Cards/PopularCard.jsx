import React from 'react'
import "./card.css"
import { Card } from 'react-bootstrap'
import { NavLink } from 'react-router-dom'
const  PopularCard = ({popular}) => {
    const afterDiscount = popular.tourChildren[0]?.price_sale
    ? (popular.price * (100 - popular.tourChildren[0].price_sale)) / 100
    : "";
    const { id } = popular
  return (
    <>
        <Card className='tour-card rounded-2 shadow-sm'>
            {afterDiscount ? (
                <div className="price-section">
                    <div className="sale-tag">Sale {popular.tourChildren[0].price_sale}%</div>
                    <div className="price-info">
                        <span className="discounted-price">
                            {afterDiscount.toLocaleString()} vnd/người
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
                src={popular.tour_image}
                className="img-fluid"
                alt={popular.name}
            />
            <Card.Body>
                <h5 className="days">{popular.duration}</h5>
                <Card.Title><NavLink className="body-text text-dark text-decoration-none" to={`/tours/${id}`}>{popular.name}</NavLink></Card.Title>
                <Card.Text>
                    <i className="bi bi-geo-alt"></i>
                    <span className="text">Từ : {popular.departure_city}</span>
                </Card.Text>
                <Card.Text>
                    <i className="bi bi-calendar"></i>
                    Khởi hành : {popular.tourChildren[0].start_date}
                </Card.Text>
                <Card.Text>
                    <i className="bi bi-people-fill"></i>
                    Số chỗ : {popular.tourChildren[0].total_seats} - Còn trống : {popular.availableSeats}
                </Card.Text>
                <Card.Text>
                    <i className="bi bi-check-circle-fill"></i>
                    Đã xác nhận : {popular.confirmed}
                </Card.Text>
            </Card.Body>
        </Card> 
    </>
  )
}

export default PopularCard
