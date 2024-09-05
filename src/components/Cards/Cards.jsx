import React from 'react'
import { Card } from 'react-bootstrap';
import "./card.css"
const  Cards = ({destination}) => {
  return (
    <>
        <div className="img-box">
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
        </div>
    </>
  )
}

export default Cards
