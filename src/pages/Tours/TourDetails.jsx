import React, { useEffect, useState } from 'react'
import Breadcrumbs from '../../components/Breadcrumb/Breadcrumbs'
import { Container, Row, Tab, Col, Nav, ListGroup, Card, Stack, Accordion, Form } from 'react-bootstrap'
import { NavLink, useParams } from 'react-router-dom'
import "./tour.css"
import ImageGallery from "react-image-gallery";
import axios from 'axios'
import { Table } from 'react-bootstrap'
import 'bootstrap/dist/css/bootstrap.min.css'
import { InformationNote } from '../../utils/data'
import { AiFillTags } from "react-icons/ai";
const TourDetails = () => {
    useEffect(() => {
        document.title = "Hệ thống bán tour trực tuyến | Du lịch Việt"
        window.scroll(0,0)
    }, [])
    const options = {day:'numeric', month:'long', year: 'numeric'}
    const { id } = useParams();
    const [tourDetails, setTourDetails] = useState(null); 
    const [tourRelated, setTourRelated] = useState([])
    const fetchTourDetail = async () => {
        const response = await axios.get(`http://localhost:4000/api/v1/tours/${id}`)
        setTourDetails(response.data.data)
    }
    const fetchTourRelated = async () => {
        try {
            const response = await axios.get(`http://localhost:4000/api/v1/tours/${id}/related`);
            setTourRelated(response.data.data);
        } catch (error) {
            console.error('Error fetching related tours:', error);
        }
    };
    
    const imageItems = tourDetails?.tourImage.map(image => ({
        original: image.image_url,
        thumbnail: image.image_url,
      })) || [];
    const afterDiscount = tourDetails && tourDetails.tourChildren && tourDetails.tourChildren[0]?.price_sale
    ? (tourDetails.price * (100 - tourDetails.tourChildren[0].price_sale)) / 100
    : "";
    useEffect(() => {
        fetchTourDetail()
        fetchTourRelated()
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
                        <ImageGallery items={imageItems} showNav={false} showBullets={false} showPlayButton={false} />
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
                                            <Nav.Item>
                                                <Nav.Link eventKey="3">Những thông tin cần lưu ý</Nav.Link>
                                            </Nav.Item>
                                        </Nav>
                                    </Col>
                                    <Tab.Content className='mt-4'>
                                        <Tab.Pane eventKey="1">
                                            <div className="tour-details-container">
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
                                        <Tab.Pane eventKey="3">
                                        <Accordion defaultActiveKey="0" className='mt-4 accordion-container' >
                                            {InformationNote.itinerary.map((val, index) => {
                                                return (
                                                <Accordion.Item eventKey={index} className='mb-4' key={index}>
                                                    <Accordion.Header className='accordion_header' >
                                                        <h6 dangerouslySetInnerHTML={{ __html: val.title }}></h6>
                                                    </Accordion.Header>
                                                    <Accordion.Body>
                                                    <div
                                                        dangerouslySetInnerHTML={{
                                                        __html: val.des.replace(/\n/g, '<br>')
                                                        }}
                                                        className='accordion_body'
                                                    ></div>
                                                    </Accordion.Body>
                                                </Accordion.Item>
                                                );
                                            })}
                                        </Accordion>

                                        </Tab.Pane>
                                    </Tab.Content>
                                    <hr/>
                                    <h1 className="h3 pt-5 pb-3 font-bold">Bình luận về Tour du lịch</h1>
                                    <div className="tour__reviews mt-4">
                                        <h4>Reviews (2 reviews)</h4>
                                        <Form>
                                            <div className="rating__group d-flex align-items-center gap-3 mb-4">
                                                <span >
                                                    1 <i className='bi bi-star-fill'></i>
                                                </span>
                                                <span>
                                                    2 <i className='bi bi-star-fill'></i>
                                                </span>
                                                <span>
                                                    3 <i className='bi bi-star-fill'></i>
                                                </span>
                                                <span>
                                                    4 <i className='bi bi-star-fill'></i>
                                                </span>
                                                <span>
                                                    5 <i className='bi bi-star-fill'></i>
                                                </span>
                                            </div>
                                            <div className="review__input">
                                                <input type='text' placeholder='Chia sẻ suy nghĩ của bạn về chuyến đi' required  />
                                                <button className="btn primary__btn  text-white" type='submit'>Đánh giá</button>
                                            </div>
                                        </Form>
                                        <ListGroup className="user__review">
                                            <div className='review__item' >
                                                <img src="" alt=''/>
                                                <div className='w-100'>
                                                    <div className="d-flex align-items-center justify-content-between">
                                                        <div>
                                                            <h5>Hoàng Đức Tài</h5>
                                                            <p>{new Date("1-18-2023").toLocaleDateString('en-US', options)}</p>
                                                        </div>
                                                        <span className='d-flex align-items-center'>
                                                            4 <i className='bi bi-star-fill'></i>
                                                        </span>
                                                    </div>
                                                    <h6>Đẹp lắm</h6>
                                                </div>
                                            </div>
                                        </ListGroup>
                                    </div>
                                </Col>
                                <Col md={4}>
                                    <aside>
                                        <Card className='rounded-3 p-2 shadow-sm mb-4 price-info'>
                                            <Card.Body>
                                                <Stack gap={2} direction="horizontal">
                                                    {afterDiscount ? (
                                                        <div className="price-container">
                                                            <div className="price-original">
                                                                <h4>Giá:</h4> 
                                                                <p>{tourDetails.price.toLocaleString()} vnđ</p>
                                                            </div>
                                                            <div className="price-discounted">
                                                                <p>{afterDiscount.toLocaleString()} vnđ</p>
                                                            </div>
                                                            <h6><AiFillTags className='icon'/> Mã chương trình: <span className='font-bold'>NDSGN891</span></h6>
                                                        </div>
                                                    ): (
                                                        <div className="price-container">
                                                            <h4>Giá từ: </h4>
                                                            <div className="price-discounted">
                                                                <p>{tourDetails.price.toLocaleString()} vnđ</p>
                                                            </div>
                                                            <h6><AiFillTags /> Mã chương trình: <span className='font-bold'>NDSGN891</span></h6>
                                                        </div>
                                                    )}
                                                </Stack>
                                                <NavLink className="primaryBtn w-100 d-flex justify-content-center fw-bold p-3 mt-3" to={`/booking/${id}`}>Đặt ngay</NavLink>
                                            </Card.Body>
                                        </Card>
                                        <div className="tour_list">
                                            {tourRelated.length > 0 ? (                                                
                                                tourRelated.slice(0,2).map((tour, index) => {
                                                    const discount = tour.tourChildren[0]?.price_sale
                                                        ? (tour.price * (100 - tour.tourChildren[0].price_sale)) / 100
                                                        : "";

                                                    return (
                                                        <Card key={index} className='tour-card rounded-2 shadow-sm mb-4'>
                                                            {discount ? (
                                                                <div className="price-section">
                                                                    <div className="sale-tag">Sale {tour.tourChildren[0].price_sale}%</div>
                                                                    <div className="price-info">
                                                                        <span className="discounted-price">
                                                                            {discount?.toLocaleString()} vnđ/người
                                                                        </span>
                                                                        <span className="original-price">
                                                                            {tour?.price.toLocaleString()} vnđ/người
                                                                        </span>
                                                                    </div>
                                                                </div>
                                                            ) : (
                                                                <div className="price-section">
                                                                    <div className="price-info">
                                                                        <span className="only-price">
                                                                            {tour?.price.toLocaleString()} vnđ/người
                                                                        </span>
                                                                    </div>
                                                                </div>
                                                            )}
                                                            <Card.Img
                                                                variant='top'
                                                                src={tour?.tourImage[0]?.image_url}
                                                                className="img-fluid"
                                                                alt={tour?.name}
                                                            />
                                                            <Card.Body>
                                                                <h5 className="days">{tour?.duration}</h5>
                                                                <Card.Title>
                                                                    <NavLink className="body-text text-dark text-decoration-none" to={`/tours/${tour?.id}`}>
                                                                        {tour?.name}
                                                                    </NavLink>
                                                                </Card.Title>
                                                                <Card.Text>
                                                                    <i className="bi bi-geo-alt"></i>
                                                                    <span className="text">Từ : {tour?.departure_city}</span>
                                                                </Card.Text>
                                                                <Card.Text>
                                                                    <i className="bi bi-calendar"></i>
                                                                    Khởi hành : {tour?.tourChildren[0].start_date}
                                                                </Card.Text>
                                                                <Card.Text>
                                                                    <i className="bi bi-people-fill"></i>
                                                                    Số chỗ : {tour?.tourChildren[0].total_seats} - Còn trống : {tour?.availableSeats}
                                                                </Card.Text>
                                                                <Card.Text>
                                                                    <i className="bi bi-check-circle-fill"></i>
                                                                    Đã xác nhận : {tour?.confirmed}
                                                                </Card.Text>
                                                            </Card.Body>
                                                        </Card>
                                                    );
                                                })
                                            ) : (
                                                ""
                                            )}
                                        </div>

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
