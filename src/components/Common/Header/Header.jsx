import React, { useContext, useEffect, useState } from "react";
import { Container, Navbar, Offcanvas, Nav} from "react-bootstrap";
import { NavLink } from "react-router-dom";
import "./header.css";
import { StoreContext } from "../../Context/StoreContext";
import userImg from "../../../assets/images/ava/user.png"
const Header = () => {
    const [open, setOpen] = useState(false);
    const { token, setToken, user } = useContext(StoreContext);

    const toggleMenu = () => {
        setOpen(!open);
    };

    useEffect(() => {
        
        const storedToken = localStorage.getItem("token");
        if (storedToken) {
            setToken(storedToken);
        }
    }, [setToken]);

    useEffect(() => {
        window.addEventListener("scroll", isSticky);
        return () => {
            window.removeEventListener("scroll", isSticky);
        };
    }, []);

    const isSticky = () => {
        const header = document.querySelector(".header-section");
        const scrollTop = window.scrollY;
        if (scrollTop >= 120) {
            header.classList.add("is-sticky");
        } else {
            header.classList.remove("is-sticky");
        }
    };
    const closeMenu = () => {
        if (window.innerWidth <= 991){
            setOpen(false);
        }
    };
    return (
        <header className="header-section">
            <Container>
                <Navbar expand="lg" className="p-0">

                    <Navbar.Brand>
                        <NavLink to="/"> 
                            Du lịch Việt
                        </NavLink>
                    </Navbar.Brand>
                    <Navbar.Offcanvas
                        id="offcanvasNavbar-expand-lg"
                        aria-labelledby={`offcanvasNavbarLabel-expand-lg`}
                        placement="start"
                        show={open}
                    >

                        <Offcanvas.Header>
                            <h1 className="logo">Du lịch Việt</h1>
                            <span className="navbar-toggler ms-auto"  onClick={toggleMenu}>
                                <i className="bi bi-x-lg"></i>
                            </span>
                        </Offcanvas.Header>
                        <Offcanvas.Body>
                            <Nav>
                                <div className="header-title">
                                    <NavLink className="nav-link" to="/home" onClick={closeMenu}>
                                        Trang chủ
                                    </NavLink>
                                    <NavLink className="nav-link" to="/tours" onClick={closeMenu}>
                                        TOURS
                                    </NavLink>
                                    <NavLink className="nav-link" to="/tin-tuc/tin-tuc-du-lich" onClick={closeMenu}>
                                        Tin tức
                                    </NavLink>
                                    <NavLink className="nav-link" to="/khach-san" onClick={closeMenu}>
                                    Khách sạn
                                    </NavLink>
                                    <NavLink className="nav-link" to="/lien-he" onClick={closeMenu}>
                                        Liên hệ
                                    </NavLink>
                                </div>
                                <div className="header-account">
                                    {!token ? (
                                        <>
                                            <NavLink className="account"  to="/login">
                                                <img src={userImg} alt="" />
                                            </NavLink>
                                        </>
                                    ) : (
                                        <>
                                            <NavLink className="account" to="/account/account-info">
                                                <img src={user.user_image} alt="" style={{borderRadius: "50%", width: "25px"}} />
                                            </NavLink>
                                        </>

                                    )}
                                </div>
                                
                            </Nav>
                        </Offcanvas.Body>
                    </Navbar.Offcanvas>
                    <div className="ms-md-4 ms-2">
                        <li className="d-inline-block d-lg-none ms-3 toggle_btn">
                            <i className={open ? "bi bi-x-lg" : "bi bi-list"}  onClick={toggleMenu}></i>
                        </li>
                    </div>
                </Navbar>
            </Container>
        </header>
    );
};

export default Header;
