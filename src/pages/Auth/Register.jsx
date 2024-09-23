import React, {useContext, useEffect, useState} from 'react';
import { Container, Col, Row, Form, FormGroup} from 'react-bootstrap';
import { Link, useNavigate } from 'react-router-dom';
import { BiShow,BiHide  } from "react-icons/bi";
import { FaFacebook } from "react-icons/fa";
import { FcGoogle } from "react-icons/fc";
import { StoreContext } from '../../components/Context/StoreContext';
import axios from 'axios';
import Swal from 'sweetalert2';
const Register = () => {
    useEffect(() => {
        document.title = "Hệ thống bán tour trực tuyến | Du lịch Việt"
        window.scroll(0,0)
    }, [])
    const [passwordVisible, setPasswordVisible] = useState(false);
    const { url, setToken } = useContext(StoreContext)
    const navigate = useNavigate()
    const togglePasswordVisibility = () => {
        setPasswordVisible(!passwordVisible);
    };
    const [formData, setFormData] = useState({
        username: "",
        email: "",
        phone: "",
        address: "",
        password: "",
        confirmPassword: "",
        role: 2
    })
    const handleChange = (e) => {
        const name = e.target.name
        const value  = e.target.value
        setFormData(prev => ({...prev, [name]:value}))
    } 
    const onSubmit = async(e) => {
        e.preventDefault(e)
        const response = await axios.post(`${url}/auth/register`, formData)
        if (response.data.success){
            Swal.fire({
                icon: 'success',
                title: 'Đăng ký thành công',
            });
            navigate("/login")
        } else {
            Swal.fire({
                icon: 'error',
                title: 'Đăng ký thất bại',
                text: response.data.message,
            });
        }

    } 
    return (
        <div className="login-page">
            <Container>
                <Row className='justify-content-center align-items-center'>
                    <Col lg="8" className='custom-register-row'>
                        <div className="register-card">
                            <h2 className="register-title">Đăng ký</h2>
                            <Form onSubmit={onSubmit}>
                                <div className='form-controller'>
                                    <FormGroup className='form-group'>
                                        <label className='font-bold'>Họ và tên <span>*</span></label>
                                        <input type="text" placeholder="Họ và tên" className="login-input" name='username' required onChange={handleChange} />
                                    </FormGroup>
                                    <FormGroup className='form-group'>
                                        <label className='font-bold'>Email <span>*</span></label>
                                        <input type="email" placeholder="Email" className="login-input" name='email' required onChange={handleChange}/>
                                    </FormGroup>
                                    <FormGroup className='form-group'>
                                        <label className='font-bold'>Số điện thoại <span>*</span></label>
                                        <input type="text" placeholder="Số điện thoại" className="login-input" name='phone' required onChange={handleChange}/>
                                    </FormGroup>
                                    <FormGroup className='form-group'>
                                        <label className='font-bold'>Địa chỉ <span>*</span></label>
                                        <input type="text" placeholder="Địa chỉ của bạn" className="login-input" name='address' required onChange={handleChange}/>
                                    </FormGroup>
                                    <FormGroup  className='form-group'>
                                        <label className='font-bold'>Nhập mật khẩu <span>*</span></label>
                                        <div className="input-container">
                                            <input
                                                type={passwordVisible ? "text" : "password"}
                                                placeholder="Mật khẩu"
                                                className="login-input"
                                                name='password'
                                                onChange={handleChange}
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
                                                name='confirmPassword'
                                                onChange={handleChange}
                                                required
                                            />
                                            <span onClick={togglePasswordVisibility} className="show-password-icon">
                                                {passwordVisible ? <BiHide /> : <BiShow />}
                                            </span>
                                        </div>
                                    </FormGroup>
                                </div>
                                <p className="register-footer">
                                    Bạn đã có tài khoản? <Link to="/login" className="register-link"><i>Đăng nhập</i></Link>
                                </p>
                                <div className="register-card-body">
                                    <button className="register-btn font-bold" type="submit">Đăng ký</button>
                                </div>
                            </Form>
                            <div className='register_social'>
                                <p className="or-text">hoặc</p>
                                <button className="btn social-btn facebook-btn">
                                    <FaFacebook  className="social-icon" /> Đăng ký với Facebook
                                </button>
                                <a href='http://localhost:4000/api/v1/auth/google' className="btn social-btn google-btn">
                                    <FcGoogle className="social-icon" /> Đăng ký với Google
                                </a>
                            </div>
                        </div>  
                    </Col>
                </Row>

            </Container>
        </div>
    );
};

export default Register;
