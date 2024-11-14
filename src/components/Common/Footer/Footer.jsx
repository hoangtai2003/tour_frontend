import React, { useContext, useEffect, useState } from 'react';
import "./footer.css";
import { NavLink, useNavigate } from 'react-router-dom';
import axios from 'axios';
import { StoreContext } from '../../Context/StoreContext';
import { FaInstagram } from "react-icons/fa6";
import { CiFacebook } from "react-icons/ci";
import { TbMessageCircleBolt } from "react-icons/tb";
import { FaTiktok } from "react-icons/fa";
import { FaTelegram } from "react-icons/fa6";
import { FaPhone } from "react-icons/fa6";
const Footer = () => {
    const [visible, setVisible] = useState(false);
    const [location, setLocation] = useState([])
    const { url } = useContext(StoreContext)
    const [ bookingCode, setBookingCode ] = useState('')

    const navigate = useNavigate()
    const toggleVisible = () => {
        const scrolled = document.documentElement.scrollTop;
        if (scrolled > 300) {
            setVisible(true);
        } else if (scrolled <= 300) {
            setVisible(false);
        }
    };
    const scrollTop = () => {
            window.scrollTo({
            top: 0,
            behavior: "smooth",
        });
    };

    if (typeof window !== "undefined") {
        window.addEventListener("scroll", toggleVisible);
    }
    const handleInputChange = (e) => {
        setBookingCode(e.target.value);
    }
    const handleSubmit = (e) => {
        e.preventDefault();
        if (bookingCode) {
            navigate(`/payment-booking/${bookingCode}`);
        }
    };
    useEffect(() => {
        const fetchLocation = async () => {
            try {
                const response = await axios.get(`${url}/location/all/getAllLocation`);
                const filterLocations = response.data.data.filter(location => location.parent_id !== 0);
                setLocation(filterLocations);
            } catch (error) {
                console.error('Lỗi khi lấy danh sách địa điểm:', error);
            }
        };
        fetchLocation()
    }, [url])
    
    return (
        <>
            <footer className="footer--container">
                <div className="footer--container__content section-container">
                    <div className="footer--container__more--info">
                        <div className="footer--container__more--info__contact footer-second-part">
                        <form className="footer--container__more--info__search--ipt" onSubmit={handleSubmit}>
                            <div className='input__footer'>
                                <label>Tra cứu booking</label>
                                <input
                                    type='text'
                                    required
                                    placeholder='Nhập mã booking của quý khách'
                                    className='input__footer input__noBorder'
                                    value={bookingCode}
                                    onChange={handleInputChange}
                                />
                            </div>
                            <div className="footer--container__more--info__search--ipt-button">
                                <button type="submit" className='button__footer btn-outline-primary button'>Tra cứu</button>
                            </div>
                        </form>
                            <div className="footer--container__more--info__contact--div__domestic">
                                <label className="footer--container__more--info--label">Du lịch trong nước</label>
                                <div className="footer-divider"></div>
                                <div className="footer--container__more--info__contact--div__tours">
                                    {location.slice(0,16).map((loca, index) => (
                                        <div className="tourItem" key={index}>
                                            <NavLink to={`/du-lich-trong-nuoc/${loca.loca_slug}`}>{loca.name}</NavLink>
                                        </div>
                                    ))}

                                </div>
                            </div>
                            <div className="footer--container__more--info__contact--div__contact">
                                <label className="footer--container__more--info--label">Liên hệ</label>
                                <div className="footer-divider"></div>
                                <div className="footer--container__more--info__contact--div__content">
                                    <p>Hà Nội</p>
                                    <p>(+84 37) 1234 5678</p>
                                    <p>(+84 28) 5678 1234</p>
                                    <p style={{cursor: "pointer"}}>dulichviet@contact.com</p>
                                    <div className="footer--container__more--info__contact--div--icons">
                                        <FaInstagram />
                                        <CiFacebook />
                                        <TbMessageCircleBolt />
                                        <FaTiktok />
                                        <FaTelegram />
                                    </div>
                                    <div className="footer--container__more--info__contact--div--hotline">
                                        <div className="footer--container__more--info__contact--div--hotline__phone">
                                            <FaPhone />
                                            <p>1900 3354</p>
                                        </div>
                                        <p>Từ 8:00 - 23:00 hằng ngày</p>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                    <hr></hr>
                    <div className='copy-right'>Develop by Hoàng Đức Tài</div>
                </div>
            </footer>
            <div id="back-top"
                onClick={scrollTop}
                className={visible ? "active" : ""}>
                <i className="bi bi-arrow-up"></i>
            </div>
        </>
    );
};

export default Footer;
