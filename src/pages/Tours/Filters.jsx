import React from 'react'
import { Accordion, Form } from 'react-bootstrap'
import { Categories, Duration, location, PriceRange, Ratings } from '../../utils/data'
const Filters = () => {
  return (
    <div className='side_bar'>
        <div className="filter_box">
            <Accordion defaultActiveKey="0">
                <Accordion.Item eventKey="0">
                    <Accordion.Header>Location</Accordion.Header>
                    <Accordion.Body>
                        {location.map((location, index) => {
                            return (
                                <Form.Check
                                    key = {index}
                                    type = "checkbox"
                                    id = {location}
                                    value = {location}
                                    label = {location}
                                />
                            )
                        })}
                        
                    </Accordion.Body>
                </Accordion.Item>
            </Accordion>
            <Accordion defaultActiveKey="0">
                <Accordion.Item eventKey="1">
                    <Accordion.Header>Categories</Accordion.Header>
                    <Accordion.Body>
                        {Categories.map((categorie, index) => {
                                return (
                                    <Form.Check
                                        key = {index}
                                        type = "checkbox"
                                        id = {categorie}
                                        value = {categorie}
                                        label = {categorie}
                                    />
                                )
                            })}
                    </Accordion.Body>
                </Accordion.Item>
            </Accordion>
            <Accordion defaultActiveKey="0">
                <Accordion.Item eventKey="2">
                    <Accordion.Header>Duration</Accordion.Header>
                    <Accordion.Body>
                        {Duration.map((duration, index) => {
                                return (
                                    <Form.Check
                                        key = {index}
                                        type = "checkbox"
                                        id = {duration}
                                        value = {duration}
                                        label = {duration}
                                    />
                                )
                            })}
                    </Accordion.Body>
                </Accordion.Item>
            </Accordion>
            <Accordion defaultActiveKey="0"> 
                <Accordion.Item eventKey="3">
                    <Accordion.Header>Price</Accordion.Header>
                    <Accordion.Body>
                        {PriceRange.map((price, index) => {
                                return (
                                    <Form.Check
                                        key = {index}
                                        type = "checkbox"
                                        id = {price}
                                        value = {price}
                                        label = {price}
                                    />
                                )
                            })}
                    </Accordion.Body>
                </Accordion.Item>
            </Accordion>
            <Accordion defaultActiveKey="0">
                <Accordion.Item eventKey="4">
                    <Accordion.Header>Rating</Accordion.Header>
                    <Accordion.Body>
                        {Ratings.map((rate, index) => {
                                return (
                                    <Form.Check
                                        key = {index}
                                        type = "checkbox"
                                        id = {rate}
                                        value = {rate}
                                        label = {rate}
                                    />
                                )
                            })}
                    </Accordion.Body>
                </Accordion.Item>
            </Accordion>
        </div>
      
    </div>
  )
}

export default Filters
