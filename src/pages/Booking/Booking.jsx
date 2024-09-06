import React, {useState} from 'react'
import Breadcrumbs from '../../components/Breadcrumb/Breadcrumbs'
import { Container, Row, Col, Form, Card, ListGroup } from 'react-bootstrap'
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import "./booking.css"
const Booking = () => {
    const [startDate, setStartDate] = useState(new Date());
    const [endDate, setEndDate] = useState(new Date());
  return (
    <>
       <Breadcrumbs title="Booking" pagename="Booking" /> 
       <section className='booking-section py-5'>
            <Container>
                <Row>
                    <Col md="8" lg="8">
                        <div className="booking-form-warp border rounded-3">
                            <div className='form-title px-4 border-bottom py-3'>
                                <h3 className="h4 font-bold m-0"> Your Details</h3>
                            </div>
                            <Form className="p-4">
                                <Row>
                                    <Form.Group as={Col} md="6" controlId="validationCustom01">
                                        <Form.Label>First name</Form.Label>
                                        <Form.Control
                                            required
                                            type="text"
                                            placeholder="First name"
                                            defaultValue="Mark"
                                            className="mb-4"
                                        />
                                    </Form.Group>
                                    <Form.Group as={Col} md="6" controlId="validationCustom02">
                                        <Form.Label>Last name</Form.Label>
                                        <Form.Control
                                            required
                                            type="text"
                                            placeholder="Last name"
                                            defaultValue="Otto"
                                            className="mb-4"
                                        />
                                    </Form.Group>
                                    <Form.Group className="mb-4" controlId="email" as={Col} md="6">
                                        <Form.Label>Email address</Form.Label>
                                        <Form.Control type="email" placeholder="name@example.com" />
                                    </Form.Group>
                                    <Form.Group className="mb-4" controlId="phone" as={Col} md="6">
                                        <Form.Label>Phone Number</Form.Label>
                                        <Form.Control type="text" placeholder="Phone Number" />
                                    </Form.Group>
                                    <Form.Group className="mb-4" controlId="checkin" as={Col} md="6">
                                        <Form.Label className='d-block'>Check in</Form.Label>
                                        <DatePicker
                                            selected={startDate}
                                            onChange={(date) => setStartDate(date)}
                                            selectsStart
                                            startDate={startDate}
                                            endDate={endDate}
                                            dateFormat="dd, MMMM, yyyy"
                                            className='form-control w-100'
                                    />
                                    </Form.Group>
                                    <Form.Group className="mb-4" controlId="checkout" as={Col} md="6">
                                        <Form.Label className='d-block' >Check out</Form.Label>
                                        <DatePicker
                                            selected={endDate}
                                            onChange={(date) => setEndDate(date)}
                                            selectsEnd
                                            startDate={endDate}
                                            endDate={startDate}
                                            dateFormat="dd, MMMM, yyyy"
                                            className='form-control w-100'
                                    />
                                    </Form.Group>
                                    <Col md="12">
                                        <button className='primaryBtn'>Submit Now</button>
                                    </Col>
                                </Row>
                            </Form>
                        </div>
                    </Col>
                    <Col md="4" lg="4">
                        <Card className='card-info p-0 shadow-sm bg-white'>
                            <Card.Header>
                                <h1 className="font-bold h4 mt-2">
                                    Price Summary
                                </h1>
                            </Card.Header>
                            <Card.Body>
                                <ListGroup>
                                    <ListGroup.Item className='border-0 d-flex justify-content-between h5 pt-0 list-group-item'>
                                        <span>Base Price</span>
                                        <strong>$28,660</strong>
                                    </ListGroup.Item>
                                    <ListGroup.Item className='border-0 d-flex justify-content-between h5 pt-0 list-group-item'>
                                        <span>Total Discount <span className='badge bg-danger'>10%</span></span>
                                        <strong>$20</strong>
                                    </ListGroup.Item>
                                    <ListGroup.Item className='border-0 d-flex justify-content-between h5 pt-0 list-group-item'>
                                        <span>Taxes % Fees</span>
                                        <strong>$28,660</strong>
                                    </ListGroup.Item>
                                </ListGroup>
                            </Card.Body>
                            <Card.Footer className='d-flex justify-content-between py-4 card-footer'>
                                <span className='font-bold h5'>Payable Now</span>
                                <strong className='font-bold h5'>$28,660</strong>
                            </Card.Footer>
                        </Card>
                    </Col>
                </Row>
            </Container>
       </section>
    </>
  )
}

export default Booking