import React, {useEffect, useState} from 'react';
import './auth.css';
import { Container, Row, Col, Form, FormGroup} from 'react-bootstrap';
import { Link } from 'react-router-dom';
import { BiShow,BiHide  } from "react-icons/bi";
import { FaFacebook } from "react-icons/fa";
import { FcGoogle } from "react-icons/fc";
const Login = () => {
    useEffect(() => {
        document.title = "Hệ thống bán tour trực tuyến | Du lịch Việt"
        window.scroll(0,0)
    }, [])
    const [passwordVisible, setPasswordVisible] = useState(false);
    const togglePasswordVisibility = () => {
        setPasswordVisible(!passwordVisible);
      };
    return (
        <div className="login-page">
            <Container>
                    <Row className="justify-content-center align-items-center">
                        <Col lg="6" md="8" sm="10">
                            <div className="login-card">
                                <h2 className="login-title">Đăng nhập</h2>
                                <Form>
                                    <FormGroup className='form-group'>
                                        <label className='font-bold'>Số điện thoại hoặc email <span>*</span></label>
                                        <input type="text" placeholder="Nhập số điện thoại hoặc email" className="login-input" required />
                                    </FormGroup>
                                    <FormGroup  className='form-group'>
                                        <label className='font-bold'>Nhập mật khẩu <span>*</span></label>
                                        <div className="input-container">
                                            <input
                                                type={passwordVisible ? "text" : "password"}
                                                placeholder="Mật khẩu"
                                                className="login-input"
                                                required
                                            />
                                                <span onClick={togglePasswordVisibility} className="show-password-icon">
                                                {passwordVisible ? <BiHide /> : <BiShow />}
                                            </span>
                                        </div>
                                    </FormGroup>
                                    <p className="login-footer">
                                        Chưa là thành viên? <Link to="/register" className="register-link"><i>Đăng ký ngay</i></Link>
                                    </p>
                                    <div className="login-card-body">
                                        <button className="login-btn font-bold" type="submit">Đăng nhập</button>
                                    </div>
                                </Form>
                                <div className='login_social'>
                                    <p className="or-text">hoặc</p>
                                    <button className="btn social-btn facebook-btn">
                                        <FaFacebook  className="social-icon" /> Tiếp tục với Facebook
                                    </button>
                                    <button className="btn social-btn google-btn">
                                        <FcGoogle  className="social-icon" /> Tiếp tục với Google
                                    </button>
                                </div>
                            </div>  
                        </Col>
                    </Row>
            </Container>
        </div>
    );
};

export default Login;
