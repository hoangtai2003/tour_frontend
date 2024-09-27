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
                </div>
            </div>
        </div>
        </>
    );
};

export default AccountList;