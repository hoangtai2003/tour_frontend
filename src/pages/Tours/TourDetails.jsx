import React, { useEffect, useState } from 'react'
import Breadcrumbs from '../../components/Breadcrumb/Breadcrumbs'
import { Container, Row, Tab, Col, Nav, ListGroup, Card, Stack } from 'react-bootstrap'
import { NavLink, useParams } from 'react-router-dom'
import "./tour.css"
import ImageGallery from "react-image-gallery";
import axios from 'axios'
import { Table } from 'react-bootstrap'
import 'bootstrap/dist/css/bootstrap.min.css'
const TourDetails = () => {
    const { id } = useParams();
    const [tourDetails, setTourDetails] = useState(null); 

    const fetchTourDetail = async () => {
        const response = await axios.get(`http://localhost:4000/api/v1/tours/${id}`)
        setTourDetails(response.data.data)
    }

    useEffect(() => {
        fetchTourDetail()
    }, [id])

    if (!tourDetails) {
        return <div>Loading...</div> 
    }

    return (
        <>
            <Breadcrumbs childpagename={tourDetails.name} pagename={<NavLink to="tours">Tour</NavLink>} />
            <section className='tour_details py-5'>
                <Container>
                    <Row>
                        <h1 className='fs-2 font-bold mb-4'>{tourDetails.title}</h1>
                        <ImageGallery items={tourDetails.images || []} showNav={false} showBullets={false} showPlayButton={false} />
                        <Tab.Container id="left-tabs-example" defaultActiveKey="1">
                            <Row className='py-5'>
                                <Col md={8} className='mb-3 mb-md-0'>
                                    <Col md={12}>
                                        <Nav variant="pills" className="flex-rows nav_bars rounded-2">
                                            <Nav.Item>
                                                <Nav.Link eventKey="1">Giới thiệu</Nav.Link>
                                            </Nav.Item>
                                            <Nav.Item>
                                                <Nav.Link eventKey="2">Lịch trình</Nav.Link>
                                            </Nav.Item>
                                        </Nav>
                                    </Col>
                                    <Tab.Content className='mt-4'>
                                        <Tab.Pane eventKey="1">
                                            <div className="tour_details">
                                                <h1 className="mb-2 h3 pb-2">#1. Điểm nhấn của chương trình</h1>
                                                <Table bordered >
                                                    <tbody>
                                                        <tr>
                                                            <td>Hành trình</td>
                                                            <td>{tourDetails.name}</td>
                                                        </tr>
                                                        <tr>
                                                            <td>Thời gian</td>
                                                            <td>{tourDetails.duration}</td>
                                                        </tr>
                                                        <tr>
                                                            <td>Ngày đi</td>
                                                            <td>{tourDetails.tourChildren[0].start_date}</td>
                                                        </tr>
                                                        <tr>
                                                            <td>Ngày về</td>
                                                            <td>{tourDetails.tourChildren[0].end_date}</td>
                                                        </tr>
                                                        <tr>
                                                            <td>Phương tiện di chuyển</td>
                                                            <td>{tourDetails.transportations}</td>
                                                        </tr>
                                                        <tr>
                                                            <td>Điểm xuất phát</td>
                                                            <td>{tourDetails.departure_city}</td>
                                                        </tr>
                                                        <tr>
                                                            <td>Số người tham gia</td>
                                                            <td>{tourDetails.tourChildren[0].total_seats}</td>
                                                        </tr>
                                                        <tr>
                                                            <td>Số chỗ còn</td>
                                                            <td>0</td>
                                                        </tr>
                                                        <tr>
                                                            <td>Giá người lớn</td>
                                                            <td>{tourDetails.tourChildren[0].price_adult.toLocaleString()} vnd</td>
                                                        </tr>
                                                        <tr>
                                                            <td>Giá trẻ em</td>
                                                            <td>{tourDetails.tourChildren[0].price_child.toLocaleString()} vnd</td>
                                                        </tr>
                                                    </tbody>
                                                </Table>
                                                <h1 className="mb-2 h3 pt-4">#2. Giới thiệu tour</h1>
                                                <div className='content-container' dangerouslySetInnerHTML={{ __html: tourDetails.introduct_tour }}></div>
                                                
                                            </div>
                                        </Tab.Pane>
                                        <Tab.Pane eventKey="2">
                                            <div className='content-container' dangerouslySetInnerHTML={{ __html: tourDetails.description_itinerary }}></div>
                                        </Tab.Pane>
                                    </Tab.Content>
                                </Col>
                                <Col md={4}>
                                    <aside>
                                        <Card className='rounded-3 p-2 shadow-sm mb-4 price-info'>
                                            <Card.Body>
                                                <Stack gap={2} direction="horizontal">
                                                    <h3 className="mb-0">
                                                        Giá từ : {tourDetails.price.toLocaleString()}
                                                        <span> vnd</span>
                                                    </h3>
                                                </Stack>
                                                <div className="d-flex justify-content-between align-items-center mb-3">
                                                    <ListGroup horizontal>
                                                        <ListGroup.Item className='border-0 me-2 fw-bold'>{tourDetails.rating}</ListGroup.Item>
                                                    
                                                        {[...Array(4)].map((_, i) => (
                                                            <ListGroup.Item key={i} className='border-0 me-1 text-warning'>
                                                                <i className='bi bi-star-fill'></i>
                                                            </ListGroup.Item>
                                                        ))}
                                                        <ListGroup.Item className='border-0 me-1 text-warning'>
                                                            <i className='bi bi-star-half'></i>
                                                        </ListGroup.Item>
                                                    </ListGroup>
                                                    <h5 className="h6"> ({tourDetails.reviews}) </h5>
                                                </div>
                                                <NavLink className="primaryBtn w-100 d-flex justify-content-center fw-bold p-3">Đặt ngay</NavLink>
                                            </Card.Body>
                                        </Card>
                                        <Card className='card-info p-2 shadow-sm'>
                                            <Card.Body>
                                                <h1 className="font-bold mb-2 h3">Need Help?</h1>
                                                <ListGroup>
                                                    <ListGroup.Item className='border-0'>
                                                        <i className="bi bi-telephone me-1"></i> Call us on: <strong>+91 123 456 789</strong>
                                                    </ListGroup.Item>
                                                    <ListGroup.Item className='border-0'>
                                                        <i className='bi bi-alarm me-1'></i> Mon to Sat 9.00 am - 6.00 pm
                                                    </ListGroup.Item>
                                                    <ListGroup.Item className='border-0'>
                                                        <i className="bi bi-envelope me-1"></i> Email: <strong>hello@domain.com</strong>
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

export default TourDetails;
