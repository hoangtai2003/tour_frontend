import React from 'react';
import './login.css';
import { Form, FormGroup, Button, Input } from 'react-bootstrap';

const Login = () => {
  return (
    <div className="login-page">
      <div className="login-container">
        <h2 className="login-title">Đăng nhập</h2>
        <Form className="login-form">
          <FormGroup>
            <label htmlFor="email">Số điện thoại hoặc email <span className="required">*</span></label>
            <Input type="text" id="email" placeholder="Nhập sdt hoặc email" required />
          </FormGroup>
          <FormGroup>
            <label htmlFor="password">Mật khẩu <span className="required">*</span></label>
            <Input type="password" id="password" placeholder="Nhập mật khẩu" required />
            <span className="eye-icon">&#128065;</span> {/* Icon mắt */}
          </FormGroup>

          <Button className="login-btn" type="submit">ĐĂNG NHẬP</Button>
          
          <p className="or">hoặc</p>

          <Button className="facebook-login">
            <i className="fa fa-facebook"></i> Tiếp tục với Facebook
          </Button>
          <Button className="google-login">
            <i className="fa fa-google"></i> Tiếp tục với Google
          </Button>

          <p className="signup-prompt">
            Chưa là thành viên? <a href="/register" className="signup-link">Đăng ký ngay</a>
          </p>
        </Form>
      </div>
    </div>
  );
};

export default Login;
