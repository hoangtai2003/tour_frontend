import React, { useEffect, useState } from "react";
import {
  Container,
  Navbar,
  Offcanvas,
  Nav,
} from "react-bootstrap";
import { NavLink } from "react-router-dom";
import "./header.css";

const Header = () => {
    const [open, setOpen] = useState(false);

    const toggleMenu = () => {
        setOpen(!open);
    };

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
    return (
        <header className="header-section">
            <Container>
                <Navbar expand="lg" className="p-0">
                    {/* Logo Section  */}
                    <Navbar.Brand>
                        <NavLink to="/"> 
                            Tour du lịch
                        </NavLink>
                    </Navbar.Brand>
                    {/* End Logo Section  */}

                    <Navbar.Offcanvas
                        id="offcanvasNavbar-expand-lg"
                        aria-labelledby={`offcanvasNavbarLabel-expand-lg`}
                        placement="start"
                        show={open}
                    >
                        {/*mobile Logo Section  */}
                        <Offcanvas.Header>
                            <h1 className="logo">Tour du lịch</h1>
                            <span className="navbar-toggler ms-auto"  onClick={toggleMenu}>
                                <i className="bi bi-x-lg"></i>
                            </span>
                        </Offcanvas.Header>
                        {/*end mobile Logo Section  */}

                        <Offcanvas.Body>
                            <Nav className="justify-content-end flex-grow-1 pe-3">
                                <NavLink className="nav-link" to="/home" >
                                    Trang chủ
                                </NavLink>
                                <NavLink className="nav-link" to="/about-us" >
                                    Giới thiệu
                                </NavLink>
                                <NavLink className="nav-link" to="/tours" >
                                    TOURS
                                </NavLink>

                                <NavLink className="nav-link" to="/news" >
                                    Tin tức
                                </NavLink>
                                <NavLink className="nav-link" to="/hotel" >
                                   Khách sạn
                                </NavLink>
                                <NavLink className="nav-link" to="/contact-us" >
                                    Liên hệ
                                </NavLink>
                                <NavLink className="nav-link" to="/register" >
                                    Đăng ký
                                </NavLink>
                                <NavLink className="nav-link" to="/login" >
                                    Đăng nhập
                                </NavLink>
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