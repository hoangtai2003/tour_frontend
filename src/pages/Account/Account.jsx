import React, { useEffect, useState, useContext } from 'react'
import Breadcrumbs from '../../components/Breadcrumb/Breadcrumbs'
import './account.css'
import { NavLink, Outlet, useNavigate } from 'react-router-dom'
import { FaRegUser } from "react-icons/fa";
import { StoreContext } from '../../components/Context/StoreContext';
import { PiBooksThin } from "react-icons/pi";
import { AiOutlineLike } from "react-icons/ai";
const Account = () => {
    useEffect(() => {
        document.title = "Hệ thống bán tour trực tuyến | Du lịch Việt"
        // window.scroll(0,0)
    }, [])
    const navigate = useNavigate()
    const { setToken, user} = useContext(StoreContext);
    const handleLogout = () => {
        localStorage.removeItem("token");
        setToken(""); 
        navigate("/home");
    };
    return (
        <>
        <Breadcrumbs  pagename="Tài khoản" /> 
        <div className="container_account">
            <div className="back-link">
                <h1>TÀI KHOẢN CỦA BẠN</h1>
            </div>
            <div className="account-section">
                <div className="account_left-sidebar">
                    <div className="account_left-sidebar-top" style={{overflow: "clip"}}>
                        <div className="account-main">
                            <img src="https://lh3.googleusercontent.com/a/ACg8ocKxnDOhdc--JE_qm_My7Jy8SGACD3hS9IggyqmAtnkFwfhr2Q=s96-c" alt="" className="account-img" style={{borderRadius: "50%", width: "50px"}} />
                            <div className="account-main-info">
                                <div className="account-id">{user?.username}</div>
                                <div className="account-email">{user?.email}</div>
                            </div>
                        </div>
                    </div>
                    <div className="account_left-sidebar-body">
                        <div className="account_left-sidebar-body--list">
                            <ul>
                                <li><NavLink to="/account/account-info" className={({ isActive }) => (isActive ? 'active-link' : 'inactive-link')}><FaRegUser style={{fontSize: "18px", marginBottom: "5px"}} /> Tài khoản</NavLink></li>
                                <div style={{marginLeft: "30px"}}>
                                    <li><NavLink  className={({ isActive }) => (isActive ? 'active-link' : 'inactive-link')} to="/account/account-info">Thông tin cá nhân</NavLink></li>
                                    <li><NavLink  className={({ isActive }) => (isActive ? 'active-link' : 'inactive-link')} to="/account/account-password">Đổi mật khẩu</NavLink></li>
                                    <li><button onClick={handleLogout} >Đăng xuất </button></li>
                                </div>
                            </ul>
                        </div>
                    </div>
                    <div className="account_left-sidebar-body--list">
                        <ul>
                            <li><NavLink  className={({ isActive }) => (isActive ? 'active-link' : 'inactive-link')} to="/account/account-list"><PiBooksThin  style={{fontSize: "18px", marginBottom: "6px"}} /> Đơn đặt chỗ</NavLink></li>
                        </ul>
                    </div>
                    <div className="account_left-sidebar-body--list">
                        <ul>
                            <li><NavLink  className={({ isActive }) => (isActive ? 'active-link' : 'inactive-link')} to="/account/account-review"><AiOutlineLike style={{fontSize: "18px", marginBottom: "6px"}} />Đánh giá của quý khách</NavLink></li>
                        </ul>
                    </div>
                </div>
                <Outlet />
            </div>
        </div>
        </>
    )
}

export default Account