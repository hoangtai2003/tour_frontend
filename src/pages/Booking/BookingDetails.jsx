import React, { useContext, useEffect, useState } from 'react'
import Breadcrumbs from '../../components/Breadcrumb/Breadcrumbs'
import { MdOutlineFindInPage } from "react-icons/md";
import { FaArrowRight } from "react-icons/fa";
import { MdOutlinePayments } from "react-icons/md";
import { AiOutlineFileDone } from "react-icons/ai";
import { Accordion, Col, Container, Row } from 'react-bootstrap';
import { StoreContext } from "../../components/Context/StoreContext"
import { useParams } from 'react-router-dom';
import axios from 'axios';
const BookingDetails = () => {
    const [bookingDetail, setBookingDetail] = useState([])
    const { url } = useContext(StoreContext)
    const { bookingCode } = useParams()
    const [paid, setPaid] = useState(0)
    const bookingByBookingCode = async() => {
        try {
            const response = await axios.get(`${url}/booking/bookingDetail/${bookingCode}`)
            setBookingDetail(response.data.data)
        } catch (error) {
            alert(error)
        }
    }
    useEffect(() => {
        bookingByBookingCode()
    }, [bookingCode])
    const calculateAge = (birthDate) => {
        const birthYear = new Date(birthDate).getFullYear(); 
        const currentYear = new Date().getFullYear(); 
        return currentYear - birthYear; 
    };
    const dateFromDb  = bookingDetail.booking_date
    // Thời gian tạo booking
    const localDate = new Date(dateFromDb);  
    const year = localDate.getFullYear();
    const month = String(localDate.getMonth() + 1).padStart(2, '0'); 
    const day = String(localDate.getDate()).padStart(2, '0');
    const hours = String(localDate.getHours()).padStart(2, '0');  
    const minutes = String(localDate.getMinutes()).padStart(2, '0');

    const formattedDate = `${year}-${month}-${day} ${hours }:${minutes}`;

    // Thời gian cho phép thanh toán
    const localHour = new Date(dateFromDb);  
    localHour.setHours(localHour.getHours() + 1);
    const yearHour = localHour.getFullYear();
    const montHour = String(localHour.getMonth() + 1).padStart(2, '0'); 
    const dayHour = String(localHour.getDate()).padStart(2, '0');
    const hoursHour = String(localHour.getHours()).padStart(2, '0');  
    const minutesHour = String(localHour.getMinutes()).padStart(2, '0');
    const formattedHour = `${yearHour}-${montHour}-${dayHour} ${hoursHour }:${minutesHour}`;
    return (
        <>
            <Breadcrumbs pagename="Phiếu xác nhận Booking" /> 
            <section className='booking-section py-5'>
                <Container>
                    <div className="page-booking__header section">
                        <div className='page-booking__header--content section-container'>
                            <h1>Đặt tour</h1>
                        </div>
                    </div>
                    <div className="page-booking__status section">
                        <div className="page-success-booking__status--content">
                        <div className="booking-process">
                            <div className="booking-process__step">
                                <div className='booking-process__step--number first-step step-complete'>
                                    <div className='booking-process__step--number-icon'>
                                        <MdOutlineFindInPage />
                                    </div>
                                    <span>Nhập thông tin</span>
                                </div>
                                <div className="booking-process__step--between">
                                    <FaArrowRight />
                                </div>
                                <div className='booking-process__step--number second-step step-complete'>
                                    <div className="booking-process__step--number-icon">
                                        <MdOutlinePayments />
                                    </div>
                                    <span>Thanh toán</span>
                                </div>
                                <div className="booking-process__step--between">
                                    <FaArrowRight />
                                </div>
                                <div className='booking-process__step--number third-step step-complete'>
                                    <div className="booking-process__step--number-icon">
                                        <AiOutlineFileDone />
                                    </div>
                                    <span>Hoàn tất</span>
                                </div>
                            </div>
                        </div>
                        </div>
                    </div>
                    <div className='page-booking--body__layout' >
                        <Row>
                            <div className="page-booking--body__layout--content">
                                <Col md="7" lg="7">
                                    <div className="booking-form-wrap rounded-3">
                                        <div className="page-booking--body__layout--content--col-1">
                                            <div className="page-booking--body--container__block">
                                                <div className="page-booking--body--container__block--contact">
                                                    <label className='block-title'>Thông tin liên lạc</label>
                                                    <div className="collapse--content__divider"></div>
                                                    <div className="page-booking--body--container__block--divider">
                                                        <div className="page-booking--body--container__block--row">
                                                            <div className="page-booking--body--container__block--content__item">
                                                                <span>Họ tên</span>
                                                                <p>{bookingDetail.full_name}</p>
                                                            </div>
                                                            <div className="page-booking--body--container__block--content__item">
                                                                <span>Email</span>
                                                                <p>{bookingDetail.email}</p>
                                                            </div>
                                                            <div className="page-booking--body--container__block--content__item">
                                                                <span>Điện thoại</span>
                                                                <p>{bookingDetail.phone_number}</p>
                                                            </div>
                                                        </div>
                                                    </div>
                                                    <div className="page-booking--body--container__block--content__item">
                                                        <span>Địa chỉ</span>
                                                        <p>{bookingDetail.address}</p>
                                                    </div>
                                                    <div className="page-booking--body--container__block--content__item user-note">
                                                        <span>Ghi chú</span>
                                                        {bookingDetail.booking_note ? (
                                                            <p>{bookingDetail.booking_note}</p>
                                                        ): (
                                                            <p>(Booking từ dulichviet.com)</p>
                                                        )}
                                                        
                                                    </div>
                                                </div>
                                            </div>
                                            <div className="booking--container__block">
                                                <div className="booking--container__block--content">
                                                    <h4>Chi tiết booking</h4>
                                                    <div className="collapse--content__divider"></div>
                                                    <div className="booking--container__block--divider">
                                                        <div className="booking--container__block--content__bookingDetail--item">
                                                            <label>Số booking: </label>
                                                            <p className='booking--container__block--content__bookingDetail--item__note'>
                                                                <span>{bookingDetail.booking_code}</span>
                                                            </p>
                                                        </div>
                                                        <div className="booking--container__block--content__bookingDetail--item">
                                                            <label>Ngày tạo: </label>
                                                            <p>{formattedDate}</p>
                                                        </div>
                                                        <div className="booking--container__block--content__bookingDetail--item">
                                                            <label>Trị giá booking: </label>
                                                            <p>{bookingDetail?.total_price ? bookingDetail.total_price.toLocaleString('vi-VN') : 'Chưa có dữ liệu'} vnđ</p>
                                                        </div>
                                                        <div className="booking--container__block--content__bookingDetail--item">
                                                            <label>Hình thức thanh toán: </label>
                                                            <div className="booking--container__block--content__bookingDetail--item__button">
                                                                {bookingDetail.payment_method === "vnpay" ? (
                                                                    <p>Thanh toán bằng quét QRCode - Thẻ tín dụng (VISA/MASTER/JCB) Thẻ ATM - Dịch vụ của VNPay</p>
                                                                ) : bookingDetail.payment_method === "transfer" ? (
                                                                    <p>Chuyển khoản</p>
                                                                ) : (
                                                                    <p>Trực tiếp</p>
                                                                )
                                                                }
                                                               
                                                            </div>
                                                        </div>
                                                        {bookingDetail.status === "Đã thanh toán" ? (
                                                            <>
                                                                <div className="booking--container__block--content__bookingDetail--item">
                                                                    <label>Số tiền đã thanh toán: </label>
                                                                    <p>{bookingDetail?.total_price ? bookingDetail.total_price.toLocaleString('vi-VN') : ''} vnđ</p>
                                                                </div>
                                                                <div className="booking--container__block--content__bookingDetail--item">
                                                                    <label>Số tiền còn lại: </label>
                                                                    <p>{paid} vnđ</p>
                                                                </div>
                                                            </>
                                                        ) : (
                                                            <>
                                                                <div className="booking--container__block--content__bookingDetail--item">
                                                                    <label>Số tiền đã thanh toán: </label>
                                                                    <p>{paid} vnđ</p>
                                                                </div>
                                                                <div className="booking--container__block--content__bookingDetail--item">
                                                                    <label>Số tiền còn lại: </label>
                                                                    <p>{bookingDetail?.total_price ? bookingDetail.total_price.toLocaleString('vi-VN') : ''} vnđ</p>
                                                                </div>
                                                            </>
                                                            
                                                        )}
                                                       
                                                       
                                                        <div className="booking--container__block--content__bookingDetail--item">
                                                            <label>Tình trạng: </label>
                                                            {bookingDetail.status === "Chờ xác nhận" ? (
                                                              <p className='false'>Chờ dulichviet xác nhận</p>
                                                            ) : bookingDetail.status === "Chờ thanh toán" ? (
                                                                <p className='false'>Đang chờ thanh toán</p>
                                                            ) : bookingDetail.status === "Đã thanh toán" ? (
                                                                <p className='false'>Thanh toán thành công</p>
                                                            ) : bookingDetail.status === "Quá hạn thanh toán" ? (
                                                                <p className='false'>Booking đã tự hủy do quá hạn thanh toán</p>
                                                            ) : "" }
                                                             
                                                        </div>
                                                        <div className="booking--container__block--content__bookingDetail--item">
                                                            <label>Thời hạn thanh toán: </label>
                                                            <p className='booking--container__block--content__bookingDetail--item__note'>
                                                                <span>{formattedHour}</span> - <small>(Theo giờ Việt Nam. Booking sẽ tự động hủy nếu quá thời hạn thanh toán trên)</small>
                                                            </p>
                                                        </div>
                                                    </div>
                                                </div>
                                            </div>
                                            <Accordion className="custom-accordion">
                                                <Accordion.Item eventKey="0">
                                                    <Accordion.Header className='title'>Danh sách hành khách</Accordion.Header>
                                                    <Accordion.Body>
                                                        <div className="collapse--content__divider"></div>
                                                        <div className="collapse--content__body">
                                                            <div className="paxList--table">
                                                                <table>
                                                                    <thead>
                                                                        <tr>
                                                                            <th>Họ tên</th>
                                                                            <th>Ngày sinh</th>
                                                                            <th>Giới tính</th>
                                                                            <th>Độ tuổi</th>
                                                                        </tr>
                                                                    </thead>
                                                                    <tbody>
                                                                        {bookingDetail.bookingPassenger?.map((passenger, index) => (
                                                                            <tr key={index}>
                                                                                <td>{passenger.passenger_name}</td>
                                                                                <td>{new Date(passenger.passenger_dateOfBirthday).toLocaleDateString('vi-VN')}</td>

                                                                                <td>{passenger.passenger_gender}</td>
                                                                                {calculateAge(passenger.passenger_dateOfBirthday) >= 12 ? (
                                                                                    <td>Người lớn ({calculateAge(passenger.passenger_dateOfBirthday)} tuổi)</td>
                                                                                ) : calculateAge(passenger.passenger_dateOfBirthday) >= 5 && calculateAge(passenger.passenger_dateOfBirthday) <= 8 ? (
                                                                                    <td>Trẻ em ({calculateAge(passenger.passenger_dateOfBirthday)} tuổi)</td>
                                                                                ) : calculateAge(passenger.passenger_dateOfBirthday) >= 2 && calculateAge(passenger.passenger_dateOfBirthday) <= 4 ? (
                                                                                    <td>Trẻ nhỏ ({calculateAge(passenger.passenger_dateOfBirthday)} tuổi)</td>
                                                                                ) : (
                                                                                    <td>Em bé ({calculateAge(passenger.passenger_dateOfBirthday)} tuổi)</td>
                                                                                )}
                                                                            </tr>
                                                                        ))}
                                                                        
                                                                    </tbody>
                                                                </table>
                                                                <p className="paxList--mobile--item--total">
                                                                    Tổng cộng: <span>{bookingDetail?.total_price ? bookingDetail.total_price.toLocaleString('vi-VN') : 'Chưa có dữ liệu'} vnđ</span>
                                                                </p>
                                                            </div>
                                                        </div>
                                                    </Accordion.Body>
                                                </Accordion.Item>
                                            </Accordion>
                                        </div>
                                    </div>
                                </Col>
                                <Col md="5" lg="5">
                                    <div className='page-booking--body__layout--content--col-2'>
                                        <div className="page-success-booking--voucher">
                                            <div className="page-success-booking--voucher--wrapper">
                                                <div className="page-booking--body--container__block">
                                                    <div className="page-booking--body--container__block--content__booking">
                                                        <label className='block-title'>Phiếu xác nhận booking</label>
                                                        <div className='page-booking--body--container__block--divider'></div>
                                                        <div className="page-booking--body--container__block--content__bookingConfirm">
                                                            <div className="page-booking--body--container__block--content__bookingConfirm--title">
                                                                <img alt='' src={bookingDetail.bookingTourChild?.tour.tourImage[0].image_url}></img>
                                                                <a href='1'>
                                                                    <h6>{bookingDetail.bookingTourChild?.tour.name}</h6>
                                                                </a>
                                                            </div>
                                                            <div className="page-booking--body--container__block--content__bookingConfirm--code">
                                                                <p>Số booking: <span>{bookingDetail.booking_code}</span></p>
                                                            </div>
                                                        </div>
                                                        <div className="collapse--content__divider"></div>
                                                        <div className="page-booking--body--container__block--content__bookingInfo">
                                                            <div className="page-booking--body--container__block--content__bookingInfo--item">
                                                                <div className="page-booking--body--container__block--content__bookingInfo--item__title">
                                                                    <div className="page-booking--body--container__block--content__bookingInfo--item__title-icon">

                                                                    </div>
                                                                    <label>Mã tour: </label>
                                                                </div>
                                                                <p>{bookingDetail.bookingTourChild?.tour_code}</p>
                                                            </div>
                                                        </div>  
                                                    </div>
                                                   
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </Col>
                            </div>
                        </Row>
                    </div>
                </Container>
            </section>
        </>
    )
}

export default BookingDetails
