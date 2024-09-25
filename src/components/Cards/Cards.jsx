import React from 'react'
import { Card } from 'react-bootstrap';
import { NavLink } from 'react-router-dom';
import "./card.css"
const  Cards = ({destination}) => {
  return (
    <>
        <div className="img-box">
        <NavLink className="body-text text-dark text-decoration-none" to="tour-details">
            <Card>
                <Card.Img
                    variant='top'
                    src={destination.location.location_img}
                    className="img-fluid"
                    alt={destination.name}
                />
                <Card.Title>Du lịch {destination.location.name}</Card.Title>
                <span className='tours'>{destination.tour_count} tours and activities</span>
            </Card>
           </NavLink>
        </div>
    </>
  )
}

export default Cards
