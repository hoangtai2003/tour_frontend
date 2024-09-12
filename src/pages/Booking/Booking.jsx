import React, {useState, useEffect} from 'react'
import Breadcrumbs from '../../components/Breadcrumb/Breadcrumbs'
import { Container, Row, Col, Form, Card, ListGroup, FloatingLabel } from 'react-bootstrap'
import "react-datepicker/dist/react-datepicker.css";
import "./booking.css"
import { useParams } from 'react-router-dom';
import axios from 'axios';
import { AiFillTags } from "react-icons/ai";
import { FaLocationDot } from "react-icons/fa6";
import { BiSolidTimer } from "react-icons/bi";
import { PiUsersThreeBold } from "react-icons/pi";
const Booking = () => {
    useEffect(() => {
        document.title = "Hệ thống bán tour trực tuyến | Du lịch Việt"
    }, [])
    const { id } = useParams()
    const [tourDetails, setTourDetails] = useState(null); 
    const fetchTourDetail = async () => {
        const response = await axios.get(`http://localhost:4000/api/v1/tours/${id}`)
        setTourDetails(response.data.data)
    }
    useEffect(() => {
        fetchTourDetail()
    }, [id])
  return (
    <>
       <Breadcrumbs title="Booking" pagename="Booking" /> 
       <section className='booking-section py-5'>
            <Container>
                <Row className='py-5'>  
                    <Col lg="4" md="6" className='mb-4 mb-lg-0'>
                        <Card className='border-0 shadow-sm rounded-3 mb-4 card '>
                            <Card.Body className='text-center card-body'>
                                <div className='d-flex justify-content-center align-item-search my-2'>
                                    <div className="bg-info rounded-circle text-info shadow-sm bg-opacity-10 p-3 mb-2">
                                        <i className='bi bi-headset h3'></i>
                                    </div>
                                </div>
                                <Card.Title className='fw-bold h5 card-title h5'>Số điện thoại liên hệ</Card.Title>
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
                                <Card.Title className='fw-bold h5 card-title h5'>Địa chỉ Email</Card.Title>
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
                <Form>
                    <Row>
                        <Col md="7" lg="7">
                            <div className="booking-form-warp border rounded-3">
                                <div className="p-4">
                                    <Row>
                                        <h3 className='font-bold mt-2 pb-2'>Thông tin liên lạc</h3>
                                        <Form.Group as={Col} md="6">
                                            <Form.Label>Họ và tên <span>*</span></Form.Label>
                                            <Form.Control
                                                required
                                                type="text"
                                                placeholder="Họ và tên"
                                                className="mb-2"
                                            />
                                        </Form.Group>
                                        <Form.Group className="mb-2" as={Col} md="6">
                                            <Form.Label>Email <span>*</span></Form.Label>
                                            <Form.Control type="email" placeholder="name@example.com" required />
                                        </Form.Group>
                                        <Form.Group className="mb-2" as={Col} md="6">
                                            <Form.Label>Địa chỉ </Form.Label>
                                            <Form.Control type="text" placeholder="Địa chỉ" required />
                                        </Form.Group>
                                        <Form.Group className="mb-2" as={Col} md="6">
                                            <Form.Label>Số điện thoại <span>*</span></Form.Label>
                                            <Form.Control type="text" placeholder="Số điện thoại" required />
                                        </Form.Group>
                                        <h3 className='font-bold mt-3 pb-2'>Hành khách</h3>
                                        <div className='container_old'>
                                            <Form.Group className="mb-2">
                                                <Form.Label>Người lớn <span>*</span></Form.Label>
                                                <p className='booking_old'>Từ 12 tuổi</p>
                                                <Form.Control type="number" required />
                                            </Form.Group>
                                            <Form.Group className="mb-2">
                                                <Form.Label>Trẻ em <span>*</span></Form.Label>
                                                <p className='booking_old'>Từ 5 - 11 tuổi</p>
                                                <Form.Control type="number" required />
                                            </Form.Group>
                                            <Form.Group className="mb-2">
                                                <Form.Label>Trẻ nhỏ <span>*</span></Form.Label>
                                                <p className='booking_old'>Từ 2 - 4 tuổi</p>
                                                <Form.Control type="number" required />
                                            </Form.Group>
                                            <Form.Group className="mb-2">
                                                <Form.Label>Em bé <span>*</span></Form.Label>
                                                <p className='booking_old'>Dưới 2 tuổi</p>
                                                <Form.Control type="number" required />
                                            </Form.Group>
                                        </div>
                                        <h3 className='font-bold mt-3 pb-2'>Thông tin hành khách</h3>
                                        <Form.Group className="mt-4 mb-4" md="6">
                                            <h3 className='font-bold pb-2 mt-3'>Ghi chú</h3>
                                            <Form.Label>Quý khách có ghi chú lưu ý gì, hãy nói với chúng tôi</Form.Label>
                                            <Form.Control style={{ height: '150px' }} as="textarea" placeholder='Vui lòng nhập nội dung lời nhắn bằng tiếng Việt hoặc tiếng Anh' required />
                                        </Form.Group>
                                    </Row>
                                </div>
                            </div>
                        </Col>
                        <Col md="5" lg="5">
                            <Card className='card-info p-0 shadow-sm bg-white'>
                                <Card.Header>
                                    <h1 className="font-bold h4 mt-2">
                                        Tóm tắt chuyến đi
                                    </h1>
                                </Card.Header>
                                <Card.Body>
                                    <ListGroup >
                                        <ListGroup.Item className='border-0 pt-0 list-group-item'>
                                            <img src={tourDetails?.tourImage[0].image_url} className='booking_image' alt="" />
                                            <h2 className='booking_name'>{tourDetails?.name}</h2>
                                            <AiFillTags />Mã tour: <span>{tourDetails?.tourChildren[0].tour_code}</span>
                                        </ListGroup.Item>
                                        <ListGroup.Item className='border-0 pt-0 list-group-item'>
                                            <FaLocationDot />Khởi hành: <span>{tourDetails?.departure_city}</span>
                                            <BiSolidTimer className='booking_duration'/>Thời gian: <span>{tourDetails?.duration}</span>
                                        </ListGroup.Item>
                                        <hr />
                                        <ListGroup.Item className='border-0 d-flex justify-content-between h5 pt-0 list-group-item'>
                                            <span><PiUsersThreeBold />Khách hàng</span>
                                            <strong className='booking_price'>{tourDetails?.price.toLocaleString()} vnđ</strong>
                                        </ListGroup.Item>
                                        <ListGroup.Item className='border-0 d-flex justify-content-between pt-0 list-group-item'>
                                            <span>Người lớn </span>
                                            <strong className='booking_price'>{tourDetails?.tourChildren[0].price_adult.toLocaleString()} vnđ</strong>
                                        </ListGroup.Item>
                                        <ListGroup.Item className='border-0 d-flex justify-content-between pt-0 list-group-item'>
                                            <span>Trẻ em </span>
                                            <strong className='booking_price'>{tourDetails?.tourChildren[0].price_child.toLocaleString()} vnđ</strong>
                                        </ListGroup.Item>
                                        <hr />
                                        <ListGroup.Item className='border-0 d-flex justify-content-between h4 pt-0 list-group-item'>
                                            <span className='font-bold'>Tổng tiền </span>
                                            <strong className='booking_price'>{tourDetails?.tourChildren[0].price_adult.toLocaleString()} vnđ</strong>
                                        </ListGroup.Item>
                                    </ListGroup>
                                </Card.Body>
                                <Card.Footer className='pb-5'>
                                    <Col md="12">
                                        <button className='primaryBtn'>Đặt tour</button>
                                        <button className='primaryBtn pay'>Thanh toán online</button>
                                    </Col>
                                </Card.Footer>
                            </Card>
                            
                        </Col>
                    </Row>
                </Form>
            </Container>
       </section>
    </>
  )
}

export default Booking