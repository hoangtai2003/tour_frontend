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
                    src={destination.image}
                    className="img-fluid"
                    alt={destination.name}
                />
                <Card.Title>{destination.name}</Card.Title>
                <span className='tours'>{destination.tours}</span>
            </Card>
           </NavLink>
        </div>
    </>
  )
}

export default Cards
