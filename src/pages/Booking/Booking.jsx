import React, {useState, useEffect, useContext} from 'react'
import Breadcrumbs from '../../components/Breadcrumb/Breadcrumbs'
import { Container, Row, Col, Form, Card, ListGroup, Collapse } from 'react-bootstrap'
import "react-datepicker/dist/react-datepicker.css";
import "./booking.css"
import { useParams } from 'react-router-dom';
import axios from 'axios';
import { AiFillTags } from "react-icons/ai";
import { FaLocationDot } from "react-icons/fa6";
import { BiSolidTimer } from "react-icons/bi";
import { PiUsersThreeBold } from "react-icons/pi";
import QuantityCounter from './QuantityCounter';
import InformationCustomer from './InformationCustomer';
import { BsCash } from "react-icons/bs";
import { CiBank } from "react-icons/ci";
import { IoQrCode } from "react-icons/io5"; 
import { StoreContext } from '../../components/Context/StoreContext';
const Booking = () => {
    useEffect(() => {
        document.title = "Hệ thống bán tour trực tuyến | Du lịch Việt"
    }, [])
    const [openCash, setOpenCash] = useState(false);
    const [openTransfer, setOpenTransfer] = useState(false);
    const { url, token, setToken } = useContext(StoreContext)
    const [userBooking, setUserBooking] = useState(null)
    const [passengerCount, setPassengerCount] = useState({
        adults: 1,
        children: 0,
        toddlers: 0,
        babies: 0
    })
    const handleUpdateCount = (name, value) => {
        setPassengerCount(prev => ({
            ...prev, 
            [name]: value
        }))
    } 
    useEffect(() => {
        const storedToken = localStorage.getItem("token")
        if (storedToken) {
            setToken(storedToken)
        }
    })
    useEffect (() => {
        const fetchUserInfo = async() => {
            try {
                const response = await axios.get(`${url}/auth/users`, {
                    headers: {
                        Authorization: `Bearer ${token}`
                    }
                })
                setUserBooking(response.data.data)
            } catch(error){
                console.error("Lỗi khi lấy thông tin người dùng", error);
            }
        }
        if (token){
            fetchUserInfo()
        }
    }, [token, url])
    const { tour_code } = useParams()
    const [tourDetails, setTourDetails] = useState(null); 
    const fetchTourDetail = async () => {
        const response = await axios.get(`${url}/tours/${tour_code}/booking`);
        setTourDetails(response.data.data)
    }
    const calculateTotalPrice = () => {
        const priceAdult = tourDetails?.price_adult || 0;
        const priceChild = tourDetails?.price_child || 0;
        const priceToddler = tourDetails?.price_toddler || 0;
        const priceBaby = tourDetails?.price_baby || 0;


        const totalAdultPrice = passengerCount.adults * priceAdult;
        const totalChildPrice = passengerCount.children * priceChild;
        const totalToddlerPrice = passengerCount.toddlers * priceToddler;
        const totalBabyPrice = passengerCount.babies * priceBaby;

        const toalPrice = totalAdultPrice + totalChildPrice + totalToddlerPrice + totalBabyPrice

        return toalPrice;
    };

    const totalPrice = calculateTotalPrice();
    useEffect(() => {
        fetchTourDetail()
    }, [tour_code])
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
                                        {!token ? (
                                            <>
                                                <Form.Group as={Col} md="6">
                                                    <Form.Label>Họ và tên <span>*</span></Form.Label>
                                                    <Form.Control
                                                        required
                                                        type="text"
                                                        placeholder="Nhập họ tên"
                                                        className="mb-2"
                                                        name='username'

                                                    />
                                                </Form.Group>
                                                <Form.Group className="mb-2" as={Col} md="6">
                                                    <Form.Label>Email <span>*</span></Form.Label>
                                                    <Form.Control type="email" placeholder="Nhập email" name='email' required />
                                                </Form.Group>
                                                <Form.Group className="mb-2" as={Col} md="6">
                                                    <Form.Label>Địa chỉ </Form.Label>
                                                    <Form.Control type="text" placeholder="Địa chỉ" required />
                                                </Form.Group>
                                                <Form.Group className="mb-2" as={Col} md="6">
                                                    <Form.Label>Số điện thoại <span>*</span></Form.Label>
                                                    <Form.Control type="text" placeholder="Nhập số điện thoại" required />
                                                </Form.Group>
                                            </>

                                        ) : (
                                            <>
                                                <Form.Group as={Col} md="6">
                                                    <Form.Label>Họ và tên <span>*</span></Form.Label>
                                                    <Form.Control
                                                        required
                                                        type="text"
                                                        placeholder="Nhập họ tên"
                                                        className="mb-2"
                                                        name='username'
                                                        value={userBooking?.username || ''}
                                                    />
                                                </Form.Group>
                                                <Form.Group className="mb-2" as={Col} md="6">
                                                    <Form.Label>Email <span>*</span></Form.Label>
                                                    <Form.Control type="email" placeholder="Nhập email" required name='email' value={userBooking?.email || ''} />
                                                </Form.Group>
                                                <Form.Group className="mb-2" as={Col} md="6">
                                                    <Form.Label>Địa chỉ </Form.Label>
                                                    <Form.Control type="text" placeholder="Địa chỉ" required value={userBooking?.address || ''} />
                                                </Form.Group>
                                                <Form.Group className="mb-2" as={Col} md="6">
                                                    <Form.Label>Số điện thoại <span>*</span></Form.Label>
                                                    <Form.Control type="text" placeholder="Nhập số điện thoại" required value={userBooking?.phone || ''} />
                                                </Form.Group>
                                            </>
                                        )}
                                        <h3 className='font-bold mt-3 pb-2'>Hành khách</h3>
                                        <div className='container_old'>
                                            <Form.Group className="mb-2">
                                            <QuantityCounter
                                                label="Người lớn"
                                                description="Từ 12 tuổi"
                                                initialValue={passengerCount.adults}
                                                min={1}
                                                max={10}
                                                onChange={(value) => handleUpdateCount('adults', value)}
                                                />
                                            </Form.Group>
                                            <Form.Group className="mb-2">
                                                <QuantityCounter 
                                                    label={"Trẻ em"} 
                                                    description={"Từ 5 - 11 tuổi"} 
                                                    initialValue={passengerCount.children} 
                                                    min={0} 
                                                    max={10} 
                                                    onChange={(value) => handleUpdateCount('children', value)}    
                                                />
                                            </Form.Group>
                                            <Form.Group className="mb-2">
                                                <QuantityCounter 
                                                    label={"Trẻ nhỏ "} 
                                                    description={"Từ 2 - 4 tuổi"} 
                                                    initialValue={passengerCount.toddlers} 
                                                    min={0} 
                                                    max={10} 
                                                    onChange={(value) => handleUpdateCount('toddlers', value)}
                                                />
                                            </Form.Group>
                                            <Form.Group className="mb-2">
                                                <QuantityCounter 
                                                    label={"Em bé"} 
                                                    description={"Dưới 2 tuổi"} 
                                                    initialValue={passengerCount.babies} 
                                                    min={0} 
                                                    max={10} 
                                                    onChange={(value) => handleUpdateCount('babies', value)}
                                                />
                                            </Form.Group>
                                        </div>
                                        <h3 className='font-bold mt-3 pb-2'>Thông tin hành khách</h3>
                                        {passengerCount.adults > 0 && (   
                                            <div className="form-section">
                                                <div className="form-title">
                                                    <h6>Người lớn <span className="age-info">(Từ 12 tuổi)</span></h6>
                                                </div>
                                                {[...Array(passengerCount.adults)].map((_, index) => (
                                                    <InformationCustomer key={`adult-${index}`} />
                                                ))}
                                            </div>
                                        )}
                                        {passengerCount.children > 0 && (
                                            <>
                                                <hr />
                                                <div className="form-section">
                                                    <div className="form-title">
                                                        <h6>Trẻ em <span className="age-info">(Từ 5 - 11 tuổi)</span></h6>
                                                    </div>
                                                {[...Array(passengerCount.children)].map((_, index) => (
                                                        <InformationCustomer  key={`child-${index}`}/>
                                                    ))}
                                                </div>
                                            </>
                                        )}
                                        {passengerCount.toddlers > 0 && (
                                            <>
                                                <hr />
                                                <div className="form-section">
                                                    <div className="form-title">
                                                        <h6>Trẻ nhỏ <span className="age-info">(Từ 2 - 4 tuổi)</span></h6>
                                                    </div>
                                                    {[...Array(passengerCount.toddlers)].map((_, index) => (
                                                        <InformationCustomer  key={`infant-${index}`}/>
                                                    ))}
                                                </div>
                                            </>

                                        )}
                                        {passengerCount.babies > 0 && (
                                            <>
                                                <hr />
                                                <div className="form-section" >
                                                    <div className="form-title">
                                                        <h6>Em bé <span className="age-info">(Dưới 2 tuổi)</span></h6>
                                                    </div>
                                                    {[...Array(passengerCount.babies)].map((_, index) => (
                                                        <InformationCustomer key={`baby-${index}`}/>
                                                    ))}
                                                </div>
                                            </>
                                        
                                        )}
                                        <Form.Group className="mt-4 mb-4" md="6">
                                            <h3 className='font-bold pb-2 mt-3'>Ghi chú</h3>
                                            <Form.Label>Quý khách có ghi chú lưu ý gì, hãy nói với chúng tôi</Form.Label>
                                            <Form.Control style={{ height: '150px' }} as="textarea" placeholder='Vui lòng nhập nội dung lời nhắn bằng tiếng Việt hoặc tiếng Anh' required />
                                        </Form.Group>
                                        <Form.Group className="mt-4 mb-4" md="6">
                                            <h3 className='font-bold pb-2 mt-3'>Các hình thức thanh toán</h3>
                                            <div className="p-3 border rounded booking-check">
                                                <Form.Check
                                                    type="checkbox"
                                                    id="cash-checkbox"
                                                    label="Tiền mặt"
                                                    onChange={() => setOpenCash(!openCash)}
                                                    aria-controls="cash-info"
                                                    aria-expanded={openCash}
                                                /><BsCash className='cash-icon'/>
                                                <Collapse in={openCash}>
                                                    <div id="cash-info" className="mt-3">
                                                        <p>Quý khách vui lòng thanh toán tại bất kỳ văn phòng Vietravel trên toàn quốc và các chi nhánh tại nước ngoài.</p>
                                                    </div>
                                                </Collapse>
                                            </div>

                                            <div className="p-3 border rounded mt-3 booking-check">
                                                <Form.Check
                                                    type="checkbox"
                                                    id="transfer-checkbox"
                                                    label="Chuyển khoản"
                                                    onChange={() => setOpenTransfer(!openTransfer)}
                                                    aria-controls="transfer-info"
                                                    aria-expanded={openTransfer}
                                                /><CiBank className='transfer-icon'/>
                                                <Collapse in={openTransfer}>
                                                    <div id="transfer-info" className="mt-3">
                                                        <p>Quý khách sau khi thực hiện việc chuyển khoản vui lòng gửi email đến tructuyen@vietravel.com hoặc gọi tổng đài 19001839 để được xác nhận từ công ty chúng tôi.</p>
                                                        <p>Tên Tài Khoản : Công ty CP Du lịch và Tiếp thị GTVT Việt Nam – Vietravel</p>
                                                        <p>Số Tài khoản : 19026166594669</p>
                                                        <p>Ngân hàng : Techcombank - Chi nhánh Tp.HCM</p>
                                                        <p>Số Tài khoản : 1116 9772 7979</p>
                                                        <p>Ngân hàng : Vietinbank - Chi nhánh 7</p>
                                                    </div>
                                                </Collapse>
                                            </div>
                                            <div className="p-3 border rounded mt-3 booking-check">
                                                <Form.Check 
                                                    type="checkbox"
                                                    id="vnpay-checkbox"
                                                    label="Thanh toán VNPAY"
                                                    aria-controls="vnpay-info"
                                                /><IoQrCode className='vnpay-icon'/>
                                            </div>
                                        </Form.Group>
                                        <Form.Group className="mt-4 mb-4" md="6">
                                            <h3 className='font-bold pb-2 mt-3'>Điều khoản bắt buộc khi đăng ký Online</h3>
                                            <div className='booking-clause'>

                                            </div>
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
                                            <img src={tourDetails?.tour?.tourImage[0].image_url} className='booking_image' alt="" />
                                            <h2 className='booking_name'>{tourDetails?.tour.name}</h2>
                                            <AiFillTags />Mã tour: <span>{tourDetails?.tour_code}</span>
                                        </ListGroup.Item>
                                        <ListGroup.Item className='border-0 pt-0 list-group-item'>
                                            <FaLocationDot />Khởi hành: <span>{tourDetails?.tour.departure_city}</span>
                                            <BiSolidTimer className='booking_duration'/>Thời gian: <span>{tourDetails?.tour.duration}</span>
                                        </ListGroup.Item>
                                        <hr />
                                        <ListGroup.Item className='border-0 d-flex justify-content-between h5 pt-0 list-group-item'>
                                            <span><PiUsersThreeBold />Khách hàng</span>
                                            <strong className='booking_price'>{totalPrice.toLocaleString('vi-VN')} vnđ</strong>
                                        </ListGroup.Item>
                                        <ListGroup.Item className='border-0 d-flex justify-content-between pt-0 list-group-item'>
                                            <span>Người lớn </span>
                                            <strong className='booking_price'>{passengerCount.adults} x {tourDetails?.price_adult.toLocaleString('vi-VN')} vnđ</strong>
                                        </ListGroup.Item>
                                        {passengerCount.children > 0 && (
                                            <ListGroup.Item className='border-0 d-flex justify-content-between pt-0 list-group-item'>
                                                <span>Trẻ em </span>
                                                <strong className='booking_price'>{passengerCount.children} x {tourDetails?.price_child.toLocaleString('vi-VN')} vnđ</strong>
                                            </ListGroup.Item>
                                        )}
                                        {passengerCount.toddlers > 0 && (
                                            <ListGroup.Item className='border-0 d-flex justify-content-between pt-0 list-group-item'>
                                                <span>Trẻ nhỏ </span>
                                                <strong className='booking_price'>{passengerCount.toddlers} x {tourDetails?.price_toddler.toLocaleString('vi-VN')} vnđ</strong>
                                            </ListGroup.Item>
                                        )}
                                        {passengerCount.babies > 0 && (
                                            <ListGroup.Item className='border-0 d-flex justify-content-between pt-0 list-group-item'>
                                                <span>Em bé </span>
                                                <strong className='booking_price'>{passengerCount.babies} x {tourDetails?.price_baby.toLocaleString('vi-VN')} vnđ</strong>
                                            </ListGroup.Item>
                                        )}

                                        <hr />
                                        <ListGroup.Item className='border-0 d-flex justify-content-between h4 pt-0 list-group-item'>
                                            <span className='font-bold'>Tổng tiền </span>
                                            <strong className='booking_price'>{totalPrice.toLocaleString('vi-VN')} vnđ</strong>
                                        </ListGroup.Item>
                                    </ListGroup>
                                </Card.Body>
                                <Card.Footer className='pb-5'>
                                    <Col md="12">
                                        <button className='primaryBtn booking_btn'>Đặt tour</button>
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