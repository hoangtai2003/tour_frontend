import React, {useEffect, useState} from 'react';
import { Container, Col, Row, Form, FormGroup} from 'react-bootstrap';
import { Link } from 'react-router-dom';
import { BiShow,BiHide  } from "react-icons/bi";
import { FaFacebook } from "react-icons/fa";
import { FcGoogle } from "react-icons/fc";
const Register = () => {
    useEffect(() => {
        document.title = "Hệ thống bán tour trực tuyến | Du lịch Việt"
        // window.scroll(0,0)
    }, [])
    const [passwordVisible, setPasswordVisible] = useState(false);
    const togglePasswordVisibility = () => {
        setPasswordVisible(!passwordVisible);
      };
    return (
        <div className="login-page">
            <Container>
                <Row className='justify-content-center align-items-center'>
                    <Col lg="8" className='custom-register-row'>
                        <div className="register-card">
                            <h2 className="login-title">Đăng ký</h2>
                            <Form>
                                <div className='form-controller'>
                                    <FormGroup className='form-group'>
                                        <label className='font-bold'>Họ và tên <span>*</span></label>
                                        <input type="text" placeholder="Họ và tên" className="login-input" required />
                                    </FormGroup>
                                    <FormGroup className='form-group'>
                                        <label className='font-bold'>Email <span>*</span></label>
                                        <input type="email" placeholder="Email" className="login-input" required />
                                    </FormGroup>
                                    <FormGroup className='form-group'>
                                        <label className='font-bold'>Số điện thoại <span>*</span></label>
                                        <input type="text" placeholder="Số điện thoại" className="login-input" required />
                                    </FormGroup>
                                    <FormGroup className='form-group'>
                                        <label className='font-bold'>Địa chỉ <span>*</span></label>
                                        <input type="text" placeholder="Địa chỉ của bạn" className="login-input" required />
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
                                    <FormGroup  className='form-group'>
                                        <label className='font-bold'>Nhập lại mật khẩu <span>*</span></label>
                                        <div className="input-container">
                                            <input
                                                type={passwordVisible ? "text" : "password"}
                                                placeholder="Nhập lại mật khẩu"
                                                className="login-input"
                                                required
                                            />
                                            <span onClick={togglePasswordVisibility} className="show-password-icon">
                                                {passwordVisible ? <BiHide /> : <BiShow />}
                                            </span>
                                        </div>
                                    </FormGroup>
                                </div>
                                <p className="login-footer">
                                    Bạn đã có tài khoản? <Link to="/login" className="register-link"><i>Đăng nhập</i></Link>
                                </p>
                                <div className="login-card-body">
                                    <button className="login-btn font-bold" type="submit">Đăng ký</button>
                                </div>
                            </Form>
                            <div className='login_social'>
                                <p className="or-text">hoặc</p>
                                <button className="btn social-btn facebook-btn">
                                    <FaFacebook  className="social-icon" /> Đăng ký với Facebook
                                </button>
                                <button className="btn social-btn google-btn">
                                    <FcGoogle  className="social-icon" /> Đăng ký với Google
                                </button>
                            </div>
                        </div>  
                    </Col>
                </Row>

            </Container>
        </div>
    );
};

export default Register;
