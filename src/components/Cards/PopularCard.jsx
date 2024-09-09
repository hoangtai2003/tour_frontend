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
                            {popular.afterDiscount.toLocaleString()} vnd / khách
                        </span>
                        <span className="original-price">
                            {popular.price.toLocaleString()} đ / khách
                        </span>
                    </div>
                </div>
            ) : (
                <div className="price-section">
                    <div className="price-info">
                        <span className="only-price">
                            {popular.price.toLocaleString()} đ / khách
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
                <Card.Title><NavLink className="body-text text-dark text-decoration-none" to="tour-details">{popular.name}</NavLink></Card.Title>
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
