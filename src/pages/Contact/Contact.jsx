import React from 'react'
import Breadcrumbs from '../../components/Breadcrumb/Breadcrumbs'
import { Container, Row, Col, Card, ListGroup, Form, FloatingLabel } from 'react-bootstrap'
import image from "../../assets/images/new/contact-us.png"
const Contact = () => {
    return (
        <>
            <Breadcrumbs title="Liên hệ" pagename="Liên hệ" />
            <div className="contact py-5">
                <Container>
                    <Row>
                        <Col md={12}>
                            <h1 className='mb-2 h1 font-bold'>Let's connect and get to konw each other</h1>
                            <p className='body-text mt-1'>Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard</p>
                        </Col>
                    </Row>
                    <Row className='py-5'>
                        <Col lg="4" md="6" className='mb-4 mb-lg-0'>
                            <Card className='border-0 shadow-sm rounded-3 mb-4 card '>
                                <Card.Body className='text-center card-body'>
                                    <div className='d-flex justify-content-center align-item-search my-2'>
                                        <div className="bg-info rounded-circle text-info shadow-sm bg-opacity-10 p-3 mb-2">
                                            <i className='bi bi-headset h3'></i>
                                        </div>
                                    </div>
                                    <Card.Title className='fw-bold h5 card-title h5'>Call US</Card.Title>
                                    <p className='mb-2 body-text'>
                                    Lorem Ipsum is simply dummy text of the printing and typesetting industry
                                    </p>
                                    <div className="d-block">
                                    <a href="" type='button' className="btn btn-light me-2 btn-sm">
                                        <i className="bi bi-phone me-1"></i> +12 3456 789
                                    </a>
                                    <a href="" type='button' className="btn btn-light me-2 btn-sm">
                                        <i className="bi bi-telephone me-1"></i> +12 3456 789
                                    </a>
                                </div>
                                </Card.Body>
                            </Card>
                        </Col>
                        <Col lg="4" md="6" className='mb-4 mb-lg-0'>
                            <Card className='border-0 shadow-sm rounded-3 mb-4 card '>
                                <Card.Body className='text-center card-body'>
                                    <div className='d-flex justify-content-center align-item-search my-2'>
                                        <div className="bg-danger rounded-circle text-danger shadow-sm bg-opacity-10 p-3 mb-2">
                                            <i className='bi bi-envelope h3'></i>
                                        </div>
                                    </div>
                                    <Card.Title className='fw-bold h5 card-title h5'>Email Us</Card.Title>
                                    <p className='mb-2 body-text'>
                                    Lorem Ipsum is simply dummy text of the printing and typesetting industry
                                    </p>
                                    <div className="d-block">
                                        <a href="" type='button' className="btn btn-light me-2 btn-sm">
                                            <i className="bi bi-envelope me-2"></i> demo@gmail.com
                                        </a>
                                    </div>
                                </Card.Body>
                            </Card>
                        </Col>
                        <Col lg="4" md="12" className='mb-4 mb-lg-0'>
                            <Card className='border-0 shadow-sm rounded-3 mb-4 card '>
                                <Card.Body className='text-center card-body'>
                                    <div className='d-flex justify-content-center align-item-search my-2'>
                                        <div className="bg-warning rounded-circle text-warning shadow-sm bg-opacity-10 p-3 mb-2">
                                            <i className='bi bi-globe h3'></i>
                                        </div>
                                    </div>
                                    <Card.Title className='fw-bold h5 card-title h5'>Social Media</Card.Title>
                                    <p className='mb-2 body-text'>
                                    Lorem Ipsum is simply dummy text of the printing and typesetting industry
                                    </p>
                                    <div className='d-block justify-content-center'>
                                    <ListGroup horizontal className='justify-content-center'>
                                            <ListGroup.Item className='border-0'><i className='bi bi-youtube'></i></ListGroup.Item>
                                            <ListGroup.Item className='border-0'><i className='bi bi-instagram'></i></ListGroup.Item>
                                            <ListGroup.Item className='border-0'><i className='bi bi-twitter'></i></ListGroup.Item>
                                            <ListGroup.Item className='border-0'><i className='bi bi-youtube'></i></ListGroup.Item>
                                        </ListGroup>
                                    </div>
                                </Card.Body>
                            </Card>
                        </Col>
                    </Row>
                    <Row className='py-5 align-items-center'>
                        <Col xl="6" md="6" className='d-none d-md-block'>
                            <img src={image} alt="" className='img-fluid me-3' />
                        </Col>
                        <Col xl="6" md="6">
                            <Card className='bg-light p-4 border-0 shadow-sm'>
                                <div className="form-box">
                                    <h1 className="h3 font-bold mb-4">Send us message</h1>
                                    <Form>
                                        <Row>
                                            <Col md="6">
                                                <FloatingLabel controlId="name" label="Full name" className='mb-4'>
                                                    <Form.Control type="text" placeholder="Full name" />
                                                </FloatingLabel>
                                            </Col>
                                            <Col md="6">
                                                <FloatingLabel
                                                    controlId="email"
                                                    label="Email address"
                                                    className="mb-4"
                                                >
                                                    <Form.Control type="email" placeholder="name@example.com" />
                                                </FloatingLabel>
                                            </Col>
                                            <Col md="12">
                                                <FloatingLabel
                                                    controlId="phone"
                                                    label="Phone number"
                                                    className="mb-4"
                                                >
                                                    <Form.Control type="text" placeholder="Phone number" />
                                                </FloatingLabel>
                                            </Col>
                                            <Col md="12">
                                                <FloatingLabel controlId="message" label="Message">
                                                    <Form.Control
                                                    as="textarea"
                                                    placeholder="Message"
                                                    style={{ height: '126px' }}
                                                    />
                                                </FloatingLabel>
                                            </Col>
                                        </Row>
                                        <button className='primaryBtn mt-3' type='button'>Send message</button>
                                    </Form>
                                </div>
                            </Card>
                        </Col>
                    </Row>
                </Container>
            </div>
        </>
    )
}

export default Contact