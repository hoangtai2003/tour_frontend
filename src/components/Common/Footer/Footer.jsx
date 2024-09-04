import React, { useState } from 'react';
import { Container, Row, Col, ListGroup, NavLink } from 'react-bootstrap';
import "./footer.css";
import { FaFacebook, FaInstagram } from "react-icons/fa";
const Footer = () => {
  const [visible, setVisible] = useState(false);

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

  return (
    <>
        <footer className="footer-container">
            <Container>
                <Row>
                    <Col md="3" sm="12" className="quick_link mt-3 mt-md-0">
                    <h4>Giới thiệu</h4>
                    <ListGroup variant='flush'>
                        <ListGroup.Item>
                            <NavLink to="/">About Us</NavLink>
                        </ListGroup.Item>
                        <ListGroup.Item>
                            <NavLink to="/">News</NavLink>
                        </ListGroup.Item>
                        <ListGroup.Item>
                            <NavLink to="/">Faq</NavLink>
                        </ListGroup.Item>
                    </ListGroup>
                    </Col>
                    <Col md="3" sm="12" className="quick_link mt-3 mt-md-0">
                    <h4>Explore</h4>
                    <ListGroup variant='flush'>
                        <ListGroup.Item>
                            <NavLink to="/">Faq</NavLink>
                        </ListGroup.Item>
                        <ListGroup.Item>
                            <NavLink to="/">Tour Listings</NavLink>
                        </ListGroup.Item>
                        <ListGroup.Item>
                            <NavLink to="/">Destination</NavLink>
                        </ListGroup.Item>
                    </ListGroup>
                    </Col>
                    <Col md="3" sm="12" className="quick_link mt-3 mt-md-0">
                    <h4>Quick Link</h4>
                    <ListGroup variant='flush'>
                        <ListGroup.Item>
                            <NavLink to="/">Home</NavLink>
                        </ListGroup.Item>
                        <ListGroup.Item>
                            <NavLink to="/">About us</NavLink>
                        </ListGroup.Item>
                        <ListGroup.Item>
                            <NavLink to="/">Contact Us</NavLink>
                        </ListGroup.Item>
                    </ListGroup>
                    </Col>
                    <Col md="3" sm="12" className="location mt-3 mt-md-0">
                    <h4>Contact Info</h4>
                    <div className="d-flex align-items-center">
                        <p className="pb-2">Dehradun, Uttarakhand, India</p>
                    </div>
                    <div className="d-flex align-items-top my-2">
                        <i className="bi bi-geo-alt me-3"></i>
                        <a href="mailto:rawatcoder@gmail.com" className="d-block">rawatcoder@gmail.com</a>
                    </div>
                    <div className="d-flex align-items-top">
                        <i className="bi bi-telephone me-3"></i>
                        <a href="tel:9876543210" className="d-block">9876543210</a>
                    </div>
                    <div className="social-icons mt-3">
                        <a href="https://www.facebook.com" target="_blank" rel="noopener noreferrer">
                            <FaFacebook />
                        </a>
                        <a href="https://www.instagram.com" target="_blank" rel="noopener noreferrer">
                            <FaInstagram />
                        </a>
                    </div>
                    </Col>
                </Row>
                <Row className="py-2 bdr mt-3">
                    <Col className="col copyright text-center">
                    <p>Hoàng Đức Tài</p>
                    </Col>
                </Row>
            </Container>
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
