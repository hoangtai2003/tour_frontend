import React, { useState } from 'react';

const AccountList = () => {
  const [status, setStatus] = useState('Quá hạn thanh toán');
  const [activeTab, setActiveTab] = useState('Tất cả');

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
                        <div className="account-card--tours">
                            <p className="account-card--bookingDate">
                                Ngày tạo: 21/09/2024 02:09:43
                            </p>
                            <div className="account-card--wrapper">
                                <div className="account-card--wrapper-content">
                                    <img src="" alt="" className='account-card--wrapper-img' />
                                </div>
                                <div className="account-card--wrapper-content">
                                    <div className="account-card--wrapper-content--info">
                                        <label className='line-clamp line-clamp-2'>Tây Nam Bộ</label>
                                        <div className="account-card--wrapper-content--tourCode">
                                            <p>Số booking: <span>ND00551/0924</span></p>
                                        </div>
                                        <div className="account-card--wrapper-content--tourCode">
                                            <p>Mã tour: <span>ND00551/0924</span></p>
                                        </div>
                                    </div>
                                </div>
                                <div className="account-card--wrapper-content">
                                    <div className="account-card--wrapper-content--price time-overdue-booking">
                                        <span>{status}</span>
                                        <p>499,000 đ</p>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
        </>
    );
};

export default AccountList;