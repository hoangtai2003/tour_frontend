import React from 'react'
import Breadcrumbs from '../../components/Breadcrumb/Breadcrumbs'
import { MdOutlineFindInPage } from "react-icons/md";
import { FaArrowRight } from "react-icons/fa";
import { MdOutlinePayments } from "react-icons/md";
import { AiOutlineFileDone } from "react-icons/ai";
import { Accordion, Col, Container, Row } from 'react-bootstrap';
const BookingDetails = () => {
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
                                                                <p>Hoàng Đức Tài</p>
                                                            </div>
                                                            <div className="page-booking--body--container__block--content__item">
                                                                <span>Email</span>
                                                                <p>Hoàng Đức Tài</p>
                                                            </div>
                                                            <div className="page-booking--body--container__block--content__item">
                                                                <span>Điện thoại</span>
                                                                <p>*******75</p>
                                                            </div>
                                                        </div>
                                                    </div>
                                                    <div className="page-booking--body--container__block--content__item">
                                                        <span>Địa chỉ</span>
                                                        <p>Nam Định</p>
                                                    </div>
                                                    <div className="page-booking--body--container__block--content__item user-note">
                                                        <span>Ghi chú</span>
                                                        <p>(Booking từ dulichviet.com)</p>
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
                                                                <span>24092179LYCQ</span>
                                                            </p>
                                                        </div>
                                                        <div className="booking--container__block--content__bookingDetail--item">
                                                            <label>Ngày tạo: </label>
                                                            <p>21/09/2024 14:36</p>
                                                        </div>
                                                        <div className="booking--container__block--content__bookingDetail--item">
                                                            <label>Trị giá booking: </label>
                                                            <p>499,000 đ</p>
                                                        </div>
                                                        <div className="booking--container__block--content__bookingDetail--item">
                                                            <label>Hình thức thanh toán: </label>
                                                            <div className="booking--container__block--content__bookingDetail--item__button">
                                                                <p>Thanh toán bằng quét QRCode - Thẻ tín dụng (VISA/MASTER/JCB) Thẻ ATM - Dịch vụ của VNPay</p>
                                                            </div>
                                                        </div>
                                                        <div className="booking--container__block--content__bookingDetail--item">
                                                            <label>Số tiền đã thanh toán: </label>
                                                            <p>0 đ</p>
                                                        </div>
                                                        <div className="booking--container__block--content__bookingDetail--item">
                                                            <label>Số tiền còn lại: </label>
                                                            <p>499,000 đ</p>
                                                        </div>
                                                        <div className="booking--container__block--content__bookingDetail--item">
                                                            <label>Tình trạng: </label>
                                                            <p className='false'>Booking đã tự hủy do quá thời hạn thanh toán</p>
                                                        </div>
                                                        <div className="booking--container__block--content__bookingDetail--item">
                                                            <label>Thời hạn thanh toán: </label>
                                                            <p className='booking--container__block--content__bookingDetail--item__note'>
                                                                <span>21/09/2024 15:36</span> - <small>(Theo giờ Việt Nam. Booking sẽ tự động hủy nếu quá thời hạn thanh toán trên)</small>
                                                            </p>
                                                        </div>
                                                    </div>
                                                </div>
                                            </div>
                                            <Accordion className="custom-accordion">
                                                <Accordion.Item eventKey="0">
                                                    <Accordion.Header>Danh sách hành khách</Accordion.Header>
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
                                                                        <tr>
                                                                            <td>Hoàng Đức Tài</td>
                                                                            <td>13/10/2003</td>
                                                                            <td>Nam</td>
                                                                            <td>Người lớn (20 tuổi)</td>
                                                                        </tr>
                                                                    </tbody>
                                                                </table>
                                                                <p className="paxList--mobile--item--total">
                                                                    Tổng cộng: <span>499,000 đ</span>
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
                                                                <img alt='' src='http://localhost:4000/images/tours/1726052473512-laocai.jpg'></img>
                                                                <a href='1'>
                                                                    <h6>Miền Tây: Bến Tre - Nông Trại Hải Vân - Rừng Nguyên Sinh Vàm Hồ</h6>
                                                                </a>
                                                            </div>
                                                            <div className="page-booking--body--container__block--content__bookingConfirm--code">
                                                                <p>Số booking: <span>24092179LYCQ</span></p>
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
                                                                <p>NDCTH861-011-220924XE-H</p>
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
