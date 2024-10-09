import React, {useState, useEffect, useContext} from 'react'
import Breadcrumbs from '../../components/Breadcrumb/Breadcrumbs'
import { Container, Row, Col, Form, Card, ListGroup, Collapse} from 'react-bootstrap'
import { NavLink, useNavigate } from 'react-router-dom';
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
import { MdOutlineFindInPage } from "react-icons/md";
import { FaArrowRight } from "react-icons/fa";
import { MdOutlinePayments } from "react-icons/md";
import { AiOutlineFileDone } from "react-icons/ai";
import { MdEmojiTransportation } from "react-icons/md";
const Booking = () => {
    useEffect(() => {
        document.title = "Hệ thống bán tour trực tuyến | Du lịch Việt"
    }, [])
    const [selectedPaymentMethod, setSelectedPaymentMethod] = useState(''); 
    const { url, token, user} = useContext(StoreContext)
    const { tour_code } = useParams()
    const [tourDetails, setTourDetails] = useState(null); 
    const navigate = useNavigate()
    const [booking, setBooking] = useState({
        full_name: '',
        email: '',
        address: '',
        phone_number: '',
        booking_note: '',
        total_price: '',
        booking_passenger: [{passenger_name: '', passenger_dateOfBirthday: '', passenger_gender: 'Nam'}]

    })
    const [passengerCount, setPassengerCount] = useState({
        adults: 1,
        children: 0,
        toddlers: 0,
        babies: 0
    })

    const handleUpdateCount = (name, value) => {
        setPassengerCount(prev => {
            const updatedPassengerCount = { ...prev, [name]: value };
    
            // Tạo mảng hành khách dựa trên số lượng hành khách cập nhật
            const passengers = [];
            for (let i = 0; i < updatedPassengerCount.adults; i++) {
                passengers.push({ passenger_name: '', passenger_dateOfBirthday: '', passenger_gender: 'Nam' });
            }
            for (let i = 0; i < updatedPassengerCount.children; i++) {
                passengers.push({ passenger_name: '', passenger_dateOfBirthday: '', passenger_gender: 'Nữ' });
            }
            for (let i = 0; i < updatedPassengerCount.toddlers; i++) {
                passengers.push({ passenger_name: '', passenger_dateOfBirthday: '', passenger_gender: 'Nam' });
            }
            for (let i = 0; i < updatedPassengerCount.babies; i++) {
                passengers.push({ passenger_name: '', passenger_dateOfBirthday: '', passenger_gender: 'Nữ' });
            }
    
            setBooking(prevBooking => ({
                ...prevBooking,
                booking_passenger: passengers
            }));
    
            return updatedPassengerCount;
        });
    };
    const fetchTourDetail = async () => {
        const response = await axios.get(`${url}/tours/${tour_code}/booking`);
        setTourDetails(response.data.data)
    }
    const discountPriceAdult = tourDetails && tourDetails.price_sale > 0
    ? (tourDetails.price_adult * (100 - tourDetails.price_sale)) / 100
    : tourDetails?.price_adult;  
    const discountPriceChild = tourDetails && tourDetails.price_sale > 0
    ? (tourDetails.price_child * (100 - tourDetails.price_sale)) / 100
    : tourDetails?.price_child;
    const discountPriceToddler = tourDetails && tourDetails.price_sale > 0
    ? (tourDetails.price_toddler * (100 - tourDetails.price_sale)) / 100
    : tourDetails?.price_todder;
    const discountPriceBaby = tourDetails && tourDetails.price_sale > 0
    ? (tourDetails.price_baby * (100 - tourDetails.price_sale)) / 100
    : tourDetails?.price_baby;
    const calculateTotalPrice = () => {
        const priceAdult = discountPriceAdult || 0;
        const priceChild = discountPriceChild || 0;
        const priceToddler = discountPriceToddler|| 0;
        const priceBaby = discountPriceBaby || 0;


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


    const handleChange = async(e) => {
        const name = e.target.name
        const value = e.target.value
        setBooking(prev => ({...prev, [name]:value}))
    }
    const handlePassengerChange = (index, e) => {
        const { name, value } = e.target;
        setBooking(prev => {
            // Sao chép mảng booking_passenger hiện tại
            const updatedPassengers = [...prev.booking_passenger];
            // Cập nhật hành khách theo chỉ số (index)
            updatedPassengers[index] = {
                ...updatedPassengers[index],
                [name]: value
            };
            return {
                ...prev,
                booking_passenger: updatedPassengers
            };
        });
    };

    const handlePaymentMethodChange = (method) => {
        if (selectedPaymentMethod === method) {
            setSelectedPaymentMethod(''); 
        } else {
            setSelectedPaymentMethod(method); 
        }
    };
    const handleSubmit = async (e) => {
        e.preventDefault();
        if (!selectedPaymentMethod) {
            alert("Vui lòng chọn phương thức thanh toán.");
            return;
        }
        const formData = new FormData();
        formData.append('tour_child_id', tourDetails.id)
        formData.append('user_id', user.id)
        formData.append('full_name', booking.full_name || user.username);
        formData.append('email', booking.email || user.email);
        formData.append('address', booking.address || user.address);
        formData.append('phone_number', booking.phone_number || user.phone);
        formData.append('booking_note', booking.booking_note)
        formData.append('number_of_adults', passengerCount.adults)
        formData.append('number_of_children', passengerCount.children)
        formData.append('number_of_toddler', passengerCount.toddlers)
        formData.append('number_of_baby', passengerCount.babies)
        formData.append('total_price', totalPrice)
        formData.append('booking_passenger', JSON.stringify(booking.booking_passenger));
        formData.append('payment_method', selectedPaymentMethod);

        try {
            const response = await axios.post(`${url}/booking`, formData, {
                headers: {
                   'Content-Type': 'application/json'
                }
            });
            if (response.data.success) {
               
                if (selectedPaymentMethod === "vnpay") {
                    const vnpayUrl = response.data.url;  
                    window.location.href = vnpayUrl;    
                } else {
                    const bookingCode = response.data.data.booking_code;
                    navigate(`/payment-booking/${bookingCode}`);
                }
            }
        } catch (error) {
            alert(error.response?.data?.message || error.message);
        }
    };

  return (
    <>
       <Breadcrumbs pagename="Booking" /> 
       <section className='booking-section py-5'>
            <Container>
                <div className='page-order-booking__header section'>
                    <div className='page-order-booking__header--content section-container'>
                        <h1>Đặt tour</h1>
                    </div>
                </div>
                <div className='page-order-booking__status section'>
                    <div className='page-order-booking__status--content'>
                        <div className="booking-process">
                            <div className="booking-process__step">
                                <div className='booking-process__step--number first-step step-current'>
                                    <div className='booking-process__step--number-icon'>
                                        <MdOutlineFindInPage />
                                    </div>
                                    <span>Nhập thông tin</span>
                                </div>
                                <div className="booking-process__step--between">
                                    <FaArrowRight />
                                </div>
                                <div className='booking-process__step--number second-step step-uncomplete'>
                                    <div className="booking-process__step--number-icon">
                                        <MdOutlinePayments />
                                    </div>
                                    <span>Thanh toán</span>
                                </div>
                                <div className="booking-process__step--between">
                                    <FaArrowRight />
                                </div>
                                <div className='booking-process__step--number third-step step-uncomplete'>
                                    <div className="booking-process__step--number-icon">
                                        <AiOutlineFileDone />
                                    </div>
                                    <span>Hoàn tất</span>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
                <Form onSubmit={handleSubmit} style={{marginTop: '-60px'}}>
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
                                                        type="text"
                                                        placeholder="Nhập họ tên"
                                                        className="mb-2"
                                                        name='full_name'
                                                        onChange={handleChange}
                                                    />
                                                </Form.Group>
                                                <Form.Group className="mb-2" as={Col} md="6">
                                                    <Form.Label>Email <span>*</span></Form.Label>
                                                    <Form.Control type="email" placeholder="Nhập email" name='email' required onChange={handleChange} />
                                                </Form.Group>
                                                <Form.Group className="mb-2" as={Col} md="6">
                                                    <Form.Label>Địa chỉ </Form.Label>
                                                    <Form.Control type="text" placeholder="Địa chỉ" name='address' required onChange={handleChange} />
                                                </Form.Group>
                                                <Form.Group className="mb-2" as={Col} md="6">
                                                    <Form.Label>Số điện thoại <span>*</span></Form.Label>
                                                    <Form.Control type="text" placeholder="Nhập số điện thoại" name='phone_number' required onChange={handleChange}/>
                                                </Form.Group>
                                            </>

                                        ) : (
                                            <>
                                                <Form.Group as={Col} md="6">
                                                    <Form.Label>Họ và tên <span>*</span></Form.Label>
                                                    <Form.Control
                                                        type="text"
                                                        placeholder="Nhập họ tên"
                                                        className="mb-2"
                                                        name='full_name'
                                                        value={booking.full_name || user?.username || ''}
                                                        onChange={handleChange}
                                                    />
                                                </Form.Group>
                                                <Form.Group className="mb-2" as={Col} md="6">
                                                    <Form.Label>Email <span>*</span></Form.Label>
                                                    <Form.Control type="email" placeholder="Nhập email" required name='email' value={booking.email || user?.email || ''} onChange={handleChange}/>
                                                </Form.Group>
                                                <Form.Group className="mb-2" as={Col} md="6">
                                                    <Form.Label>Địa chỉ </Form.Label>
                                                    <Form.Control type="text" placeholder="Địa chỉ" name='address' required value={booking.address || user?.address || ''} onChange={handleChange}/>
                                                </Form.Group>
                                                <Form.Group className="mb-2" as={Col} md="6">
                                                    <Form.Label>Số điện thoại <span>*</span></Form.Label>
                                                    <Form.Control type="text" placeholder="Nhập số điện thoại" name='phone_number' required value={booking.phone_number || user?.phone || ''} onChange={handleChange}/>
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
                                        {
                                            passengerCount.adults > 0 && (   
                                                <div className="form-section">
                                                    <div className="form-title">
                                                        <h6>Người lớn <span className="age-info">(Từ 12 tuổi)</span></h6>
                                                    </div>
                                                    {[...Array(passengerCount.adults)].map((_, index) => (
                                                        <InformationCustomer key={`adult-${index}`} index={index} handlePassengerChange={handlePassengerChange}/>
                                                    ))}
                                                </div>
                                            )
                                        }
                                        {
                                            passengerCount.children > 0 && (
                                                <>
                                                    <hr />
                                                    <div className="form-section">
                                                        <div className="form-title">
                                                            <h6>Trẻ em <span className="age-info">(Từ 5 - 11 tuổi)</span></h6>
                                                        </div>
                                                        {[...Array(passengerCount.children)].map((_, index) => (
                                                            <InformationCustomer key={`child-${index}`} index={index + passengerCount.adults} handlePassengerChange={handlePassengerChange}/>
                                                        ))}
                                                    </div>
                                                </>
                                            )
                                        }
                                        {
                                            passengerCount.toddlers > 0 && (
                                                <>
                                                    <hr />
                                                    <div className="form-section">
                                                        <div className="form-title">
                                                            <h6>Trẻ nhỏ <span className="age-info">(Từ 2 - 4 tuổi)</span></h6>
                                                        </div>
                                                        {[...Array(passengerCount.toddlers)].map((_, index) => (
                                                            <InformationCustomer key={`infant-${index}`} index={index + passengerCount.adults + passengerCount.children} handlePassengerChange={handlePassengerChange}/>
                                                        ))}
                                                    </div>
                                                </>
                                            )
                                        }
                                        {
                                            passengerCount.babies > 0 && (
                                                <>
                                                    <hr />
                                                    <div className="form-section" >
                                                        <div className="form-title">
                                                            <h6>Em bé <span className="age-info">(Dưới 2 tuổi)</span></h6>
                                                        </div>
                                                        {[...Array(passengerCount.babies)].map((_, index) => (
                                                            <InformationCustomer key={`baby-${index}`} index={index + passengerCount.adults + passengerCount.children + passengerCount.toddlers} handlePassengerChange={handlePassengerChange}/>
                                                        ))}
                                                    </div>
                                                </>
                                            )
                                        }

                                        <Form.Group className="mt-4 mb-4" md="6">
                                            <h3 className='font-bold pb-2 mt-3'>Ghi chú</h3>
                                            <Form.Label>Quý khách có ghi chú lưu ý gì, hãy nói với chúng tôi</Form.Label>
                                            <Form.Control style={{ height: '150px' }} as="textarea" name='booking_note' placeholder='Vui lòng nhập nội dung lời nhắn bằng tiếng Việt hoặc tiếng Anh' onChange={handleChange}/>
                                        </Form.Group>
                                        <Form.Group className="mt-4 mb-4" md="6">
                                            <h3 className='font-bold pb-2 mt-3'>Các hình thức thanh toán</h3>
                                            <div className="p-3 border rounded booking-check">
                                                <Form.Check
                                                    type="checkbox"
                                                    id="cash-checkbox"
                                                    label="Tiền mặt"
                                                    checked={selectedPaymentMethod === 'cash'}
                                                    onChange={() => handlePaymentMethodChange('cash')}
                                                    aria-controls="cash-info"
                                                    aria-expanded={selectedPaymentMethod === 'cash'}
                                                   
                                                />
                                                <BsCash className='cash-icon' />
                                                <Collapse in={selectedPaymentMethod === 'cash'}>
                                                    <div id="cash-info" className="mt-3">
                                                        <p>Quý khách vui lòng thanh toán tại bất kỳ văn phòng dulichviet trên toàn quốc và các chi nhánh tại nước ngoài.</p>
                                                    </div>
                                                </Collapse>
                                            </div>
                                            <div className="p-3 border rounded mt-3 booking-check">
                                                <Form.Check
                                                    type="checkbox"
                                                    id="transfer-checkbox"
                                                    label="Chuyển khoản"
                                                    checked={selectedPaymentMethod === 'transfer'}
                                                    onChange={() => handlePaymentMethodChange('transfer')}
                                                    aria-controls="transfer-info"
                                                    aria-expanded={selectedPaymentMethod === 'transfer'}
                                                />
                                                <CiBank className='transfer-icon' />
                                                <Collapse in={selectedPaymentMethod === 'transfer'}>
                                                    <div id="transfer-info" className="mt-3">
                                                        <p>Quý khách sau khi thực hiện việc chuyển khoản vui lòng gửi email đến dulichviet@gmail.com hoặc gọi tổng đài 19001839 để được xác nhận từ công ty chúng tôi.</p>
                                                        <p>Tên Tài Khoản: HOANG DUC TAI</p>
                                                        <p>Số Tài khoản: 08140034699999</p>
                                                        <p>Ngân hàng quân đội MB</p>
                                                    </div>
                                                </Collapse>
                                            </div>
                                            <div className="p-3 border rounded mt-3 booking-check">
                                                <Form.Check
                                                    type="checkbox"
                                                    id="vnpay-checkbox"
                                                    label="Thanh toán VNPAY"
                                                    checked={selectedPaymentMethod === 'vnpay'}
                                                    onChange={() => handlePaymentMethodChange('vnpay')}
                                                    aria-controls="vnpay-info"
                                                />
                                                <IoQrCode className='vnpay-icon' />
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
                            <Card style={{position: 'sticky', top: '1rem'}}>
                                <Card.Header>
                                    <h1 className="font-bold h4 mt-2" style={{textTransform: 'uppercase'}}>
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
                                        <h5 className='font-bold'><MdEmojiTransportation /> Thông tin chuyến xe</h5>
                                        <div className='transportation_info'>
                                            <div className="transportation_column">
                                                <div className="transportation_date-start">
                                                    <span className='font-bold'>Ngày đi: {new Date(tourDetails?.start_date).toLocaleDateString("vi-VN")}</span>
                                                </div>
                                                <div className="transportation_time">
                                                    <span>{tourDetails?.time_goes_start.slice(0, 5)}</span>
                                                    <span>{tourDetails?.time_goes_end.slice(0, 5)}</span>
                                                </div>
                                                
                                            </div>
                                            <div className="transportation_column">
                                                <div className="transportation_date-end">
                                                    <span  className='font-bold'>Ngày về: {new Date(tourDetails?.end_date).toLocaleDateString("vi-VN")}</span>
                                                </div>
                                                <div className="transportation_time">
                                                    <span>{tourDetails?.time_comes_start.slice(0, 5)}</span>
                                                    <span>{tourDetails?.time_comes_end.slice(0, 5)}</span>
                                                </div>
                                            
                                            </div>
                                        </div>

                                        <hr />
                                        <ListGroup.Item className='border-0 d-flex justify-content-between h5 pt-0 list-group-item'>
                                            <span><PiUsersThreeBold />Khách hàng</span>
                                            <strong className='booking_price'>{totalPrice.toLocaleString('vi-VN')} vnđ</strong>
                                        </ListGroup.Item>
                                        <ListGroup.Item className='border-0 d-flex justify-content-between pt-0 list-group-item'>
                                            <span>Người lớn </span>
                                            <strong className='booking_price'>{passengerCount.adults} x {discountPriceAdult ? discountPriceAdult.toLocaleString('vi-VN') : ""} vnđ</strong>
                                        </ListGroup.Item>
                                        {passengerCount.children > 0 && (
                                            <ListGroup.Item className='border-0 d-flex justify-content-between pt-0 list-group-item'>
                                                <span>Trẻ em </span>
                                                <strong className='booking_price'>{passengerCount.children} x {discountPriceChild ? discountPriceChild.toLocaleString('vi-VN') : ""} vnđ</strong>
                                            </ListGroup.Item>
                                        )}
                                        {passengerCount.toddlers > 0 && (
                                            <ListGroup.Item className='border-0 d-flex justify-content-between pt-0 list-group-item'>
                                                <span>Trẻ nhỏ </span>
                                                <strong className='booking_price'>{passengerCount.toddlers} x {discountPriceToddler ? discountPriceToddler.toLocaleString('vi-VN') : ""} vnđ</strong>
                                            </ListGroup.Item>
                                        )}
                                        {passengerCount.babies > 0 && (
                                            <ListGroup.Item className='border-0 d-flex justify-content-between pt-0 list-group-item'>
                                                <span>Em bé </span>
                                                <strong className='booking_price'>{passengerCount.babies} x {discountPriceBaby ? discountPriceBaby.toLocaleString('vi-VN') : ""} vnđ</strong>
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