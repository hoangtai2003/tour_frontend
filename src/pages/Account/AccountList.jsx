import axios from 'axios';
import React, { useContext, useEffect, useState } from 'react';
import { StoreContext } from '../../components/Context/StoreContext';
import { NavLink } from 'react-router-dom';

const AccountList = () => {
    const [status, setStatus] = useState('Tất cả');
    const [activeTab, setActiveTab] = useState('Tất cả');
    const [listBooking, setListBooking] = useState([])
    const { url, token, userId } = useContext(StoreContext)
    const handleStatusChange = (newStatus) => {
        setStatus(newStatus);
        setActiveTab(newStatus);
    };
    const statusBooking = [
        'Tất cả',
        'Chờ thanh toán',
        'Chờ xác nhận',
        'Đã thanh toán',
        'Hủy booking',
        'Quá hạn thanh toán'
    ];
    useEffect(() => {
        const fetchListBooking = async () => {
            try {
                const response = await axios.get(`${url}/booking/userBooking/${userId}`, {
                    headers: {
                        Authorization: `Bearer ${token}`  
                    }
                });
                setListBooking(Array.isArray(response.data.data) ? response.data.data : []);
            } catch (error) {
                console.error("Lỗi khi lấy booking", error);
            }
        }
        if (token){
            fetchListBooking()
        }
    }, [token, userId, url])

    const filteredBookings = listBooking.filter((list) => {
        if (status === "Tất cả") return true
        return list.status === status;
    })
    return (
        <>
        <div className="account-page--main-content">
            <div className="account-wrapper">
                <div className="account_right-list">
                    <div className="account_right-filter">
                        <ul>
                            {statusBooking.map((status, index) => (
                                <li 
                                    className={`account-filter-tab  pointer ${activeTab === status ? 'account-filter-tab--active' : ''}`} 
                                    key={index} 
                                    onClick={() => handleStatusChange(status)}
                                >
                                    <span>{status}</span>
                                </li>
                            ))}
                        </ul>
                    </div>
                    <div className="account_right-cards">
                        {filteredBookings.map((list, index) => (
                            <div className="account-card--tours" key={index}>
                                <p className="account-card--bookingDate">
                                    Ngày tạo: {new Date(list?.booking_date).toLocaleDateString('vi-VN')}
                                </p>
                                <div className="account-card--wrapper">
                                    <div className="account-card--wrapper-content">
                                        <img src={list.bookingTourChild.tour.tourImage[0].image_url} alt="" className='account-card--wrapper-img' />
                                    </div>
                                    <div className="account-card--wrapper-content">
                                        <div className="account-card--wrapper-content--info">
                                            <NavLink style={{textDecoration: "none", color: "#171717"}} to={`/payment-booking/${list.booking_code}`} className='line-clamp line-clamp-2'>{list?.bookingTourChild.tour.name}</NavLink>
                                            <div className="account-card--wrapper-content--tourCode">
                                                <p>Số booking: <span>{list.booking_code}</span></p>
                                            </div>
                                            <div className="account-card--wrapper-content--tourCode">
                                                <p>Mã tour: <span>{list.bookingTourChild.tour_code}</span></p>
                                            </div>
                                        </div>
                                    </div>
                                    <div className="account-card--wrapper-content">
                                        <div className="account-card--wrapper-content--price time-overdue-booking">
                                            <span>{list.status}</span>
                                            <p>{list.total_price.toLocaleString('vi-VN')} vnđ</p>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        ))} 
                    </div>
                </div>
            </div>
        </div>
        </>
    );
};

export default AccountList;