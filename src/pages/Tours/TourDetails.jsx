import React from 'react'
import Breadcrumbs from '../../components/Breadcrumb/Breadcrumbs'
import { tourDetails } from "../../utils/data"
import { Container, Row, Tab, Col, Nav, ListGroup, Accordion, Card, Stack } from 'react-bootstrap'
import { NavLink } from 'react-router-dom'
import "./tour.css"
import ImageGallery from "react-image-gallery";

const TourDetails = () => {
    return (
        <>
            <Breadcrumbs title={tourDetails.title} childpagename={tourDetails.title} pagename= <NavLink to="tours">Tour</NavLink> />
            <section className='tour_details py-5'>
                <Container>
                    <Row>
                        <h1 className='fs-2 font-bold mb-4'>{tourDetails.title}</h1>
                        <ImageGallery items={tourDetails.images} showNav={false} showBullets={false} showPlayButton={false}/>
                        <Tab.Container id="left-tabs-example" defaultActiveKey="1">
                            <Row className='py-5'>
                                <Col md={8} className='mb-3 mb-md-0'>
                                    <Col md={12}>
                                        <Nav variant="pills" className="flex-rows nav_bars rounded-2">
                                            <Nav.Item>
                                                <Nav.Link eventKey="1">Overview</Nav.Link>
                                            </Nav.Item>
                                            <Nav.Item>
                                                <Nav.Link eventKey="2">Itinerary</Nav.Link>
                                            </Nav.Item>
                                            <Nav.Item>
                                                <Nav.Link eventKey="3">Inclusion & Exclusion</Nav.Link>
                                            </Nav.Item>
                                            <Nav.Item>
                                                <Nav.Link eventKey="4">Location</Nav.Link>
                                            </Nav.Item>
                                        </Nav>
                                    </Col>
                                    <Tab.Content className='mt-4'>
                                        <Tab.Pane eventKey="1">
                                            <div className="tour_details">
                                                <h1 className="font-bold mb-2 h3 border-bottom pb-2">Overview</h1>
                                                <p className='body-text'>{tourDetails.des}</p>
                                                <h5 className="font-bold mb-2 h5 mt-3">Tour Info</h5>
                                                <ListGroup>
                                                    {tourDetails.tourInfo.map((val, index) => {
                                                        return (
                                                            <ListGroup.Item className='border-0 pt-0 border-text' key={index} dangerouslySetInnerHTML={{__html: val}}></ListGroup.Item>
                                                        )
                                                    })}
                                                </ListGroup>
                                                <h5 className="font-bold mb-2 h5 mt-3">Tour highlights</h5>
                                                <ListGroup>
                                                    {tourDetails.highlights.map((val, index) => {
                                                        return (
                                                            <ListGroup.Item key={index} className='border-0 pt-0 border-text'>{val}</ListGroup.Item>
                                                        )
                                                    })}
                                                </ListGroup>
                                            </div>
                                        </Tab.Pane>
                                        <Tab.Pane eventKey="2">
                                            <div className="tour_details">
                                                <h1 className="font-bold mb-2 h3 border-bottom pb-2">Itinerary</h1>
                                            </div>
                                            <Accordion defaultActiveKey="0" className='mt-4'>
                                                {tourDetails.itinerary.map((val, index) => {
                                                        return (
                                                            <Accordion.Item eventKey={index} className='mb-4'>

                                                                <Accordion.Header>
                                                                    <h1 dangerouslySetInnerHTML={{__html: val.title}}></h1>
                                                                </Accordion.Header>
                                                                <Accordion.Body className='body-text'>
                                                                    {val.des}
                                                                </Accordion.Body>
                                                            </Accordion.Item>
                                                        )
                                                })}
                    
                                            </Accordion>
                                            
                                        </Tab.Pane>
                                        <Tab.Pane eventKey="3">
                                            <div className="tour_details">
                                                <h1 className="font-bold mb-2 h3 border-bottom pb-2">Inclusion & Exclusion</h1>
                                                <h5 className="font-bold mb-2 h5 mt-3">Inclusion</h5>
                                                <ListGroup>
                                                    {tourDetails.included.map((val, index) => {
                                                        return (
                                                            <ListGroup.Item key={index} className='border-0 pt-0 border-text d-flex align-item-center'>
                                                                <i className='bi bi-check-lg me-2 text-success h4 m-0'></i>
                                                                
                                                                {val}</ListGroup.Item>
                                                        )
                                                    })}
                                                </ListGroup>
                                                <h5 className="font-bold mb-2 h5 mt-3">Exclusion</h5>
                                                <ListGroup>
                                                    {tourDetails.exclusion.map((val, index) => {
                                                        return (
                                                            <ListGroup.Item key={index} className='border-0 pt-0 border-text d-flex align-item-center'>
                                                                <i className='bi bi-x-lg me-2 text-danger h5 m-0'></i>
                                                                
                                                                {val}</ListGroup.Item>
                                                        )
                                                    })}
                                                </ListGroup>
                                            </div>
                                        </Tab.Pane>
                                        <Tab.Pane eventKey="4">
                                            <div className="tour_details">
                                                <h1 className="font-bold mb-4 h3 border-bottom pb-2">Location</h1>
                                                <iframe src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d476291.8801686302!2d106.94374486348556!3d21.151191876873224!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x314b01d79a78852f%3A0xed0779f4f0a5866a!2zUXXhuqNuZyBOaW5oLCBWaeG7h3QgTmFt!5e0!3m2!1svi!2s!4v1725591451655!5m2!1svi!2s" width="100%" height="400px" allowfullscreen="" loading="lazy" referrerpolicy="no-referrer-when-downgrade"></iframe>
                                            </div>
                                        </Tab.Pane>
                                    </Tab.Content>
                                </Col>
                                <Col md={4}>
                                    <aside>
                                        <Card className='rounded-3 p-2 shadow-sm mb-4 price-info'>
                                            <Card.Body>
                                                <Stack gap={2} direction="horizontal">
                                                    <h1 className="font-bold mb-0 h2">
                                                        ${tourDetails.price}
                                                        <span> /person</span>
                                                    </h1>
                                                    
                                                </Stack>
                                                <div className="d-flex justify-content-between align-items-center mb-3">
                                                    <ListGroup horizontal>
                                                        <ListGroup.Item className='border-0 me-2 fw-bold'>{tourDetails.rating}</ListGroup.Item>
                                                        <ListGroup.Item className='border-0 me-1 text-warning'>
                                                            <i className='bi bi-star-fill'></i>
                                                        </ListGroup.Item>
                                                        <ListGroup.Item className='border-0 me-1 text-warning'>
                                                            <i className='bi bi-star-fill'></i>
                                                        </ListGroup.Item>
                                                        <ListGroup.Item className='border-0 me-1 text-warning'>
                                                            <i className='bi bi-star-fill'></i>
                                                        </ListGroup.Item>
                                                        <ListGroup.Item className='border-0 me-1 text-warning'>
                                                            <i className='bi bi-star-fill'></i>
                                                        </ListGroup.Item>
                                                        <ListGroup.Item className='border-0 me-1 text-warning'>
                                                            <i className='bi bi-star-half'></i>
                                                        </ListGroup.Item>
                                                    </ListGroup>
                                                    <h5 className="h6"> ({tourDetails.reviews}) </h5>
                                                </div>
                                                <NavLink className="primaryBtn w-100 d-flex justify-content-center fw-bold">Book Now</NavLink>
                                            </Card.Body>
                                        </Card>
                                        <Card className='card-info p-2 shadow-sm'>
                                            <Card.Body>
                                                <h1 className="font-bold mb-2 h3">
                                                    Need Help?
                                                </h1>
                                                <ListGroup>
                                                    <ListGroup.Item className='border-0'>
                                                        <i className="bi bi-telephone me-1"></i> Call us on: <strong>+91 123 456 789</strong>
                                                    </ListGroup.Item>
                                                    <ListGroup.Item className='border-0'>
                                                        <i className='bi bi-alarm me-1'></i>Timing: <strong>10AM to 7PM</strong>
                                                    </ListGroup.Item>
                                                    <ListGroup.Item className='border-0'>
                                                        <i className='bi bi-headset me-1'></i><strong>Let us call you</strong>
                                                    </ListGroup.Item>
                                                    <ListGroup.Item className='border-0'>
                                                        <i className='bi bi-calendar-check me-1'></i><strong> Book Appointments</strong>
                                                    </ListGroup.Item>
                                                </ListGroup>
                                            </Card.Body>

                                        </Card>
                                    </aside>
                                </Col>
                            </Row>
                        </Tab.Container>
                    </Row>
                </Container>
            </section>
        </>
    )
}

export default TourDetails