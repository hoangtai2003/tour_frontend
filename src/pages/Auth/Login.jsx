import React, { useContext, useEffect, useState } from 'react';
import './auth.css';
import { Container, Row, Col, Form, FormGroup } from 'react-bootstrap';
import { Link, useNavigate } from 'react-router-dom';
import { BiShow, BiHide } from "react-icons/bi";
import { FaFacebook } from "react-icons/fa";
import { FcGoogle } from "react-icons/fc";
import axios from 'axios';
import { StoreContext } from '../../components/Context/StoreContext';
import Swal from 'sweetalert2'; 

const Login = () => {
    useEffect(() => {
        document.title = "Hệ thống bán tour trực tuyến | Du lịch Việt";
        window.scroll(0, 0);
    }, []);

    const navigate = useNavigate();
    const [formData, setFormData] = useState({
        email: "",
        password: "",
    });
    const { url, setToken } = useContext(StoreContext);

    const handleChange = (e) => {
        const name = e.target.name;
        const value = e.target.value;
        setFormData(prev => ({ ...prev, [name]: value }));
    };

    const onSubmit = async (e) => {
        e.preventDefault();
        const response = await axios.post(`${url}/auth/login`, formData);
        if (response.data.success) {
            setToken(response.data.token);
            localStorage.setItem("token", response.data.token);
            navigate("/home");
        } else {
            Swal.fire({
                icon: 'error',
                title: 'Đăng nhập thất bại',
                text: response.data.message,
            });
           
        }
    };

    const [passwordVisible, setPasswordVisible] = useState(false);
    const togglePasswordVisibility = () => {
        setPasswordVisible(!passwordVisible);
    };

    return (
        <div className="login-page">
            <Container>
                <Row className="justify-content-center align-items-center login-container">
                    <Col lg="6" md="8" sm="10">
                        <div className="login-card">
                            <h2 className="login-title">Đăng nhập</h2>
                            <Form onSubmit={onSubmit}>
                                <FormGroup className='form-group'>
                                    <label className='font-bold'>Số điện thoại hoặc email <span>*</span></label>
                                    <input
                                        type="email"
                                        placeholder="Nhập số điện thoại hoặc email"
                                        className="login-input"
                                        name='email'
                                        onChange={handleChange}
                                        required
                                    />
                                </FormGroup>
                                <FormGroup className='form-group'>
                                    <label className='font-bold'>Nhập mật khẩu <span>*</span></label>
                                    <div className="input-container">
                                        <input
                                            type={passwordVisible ? "text" : "password"}
                                            placeholder="Mật khẩu"
                                            className="login-input"
                                            onChange={handleChange}
                                            name='password'
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
                                    <FaFacebook className="social-icon" /> Tiếp tục với Facebook
                                </button>
                                <button className="btn social-btn google-btn">
                                    <FcGoogle className="social-icon" /> Tiếp tục với Google
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
