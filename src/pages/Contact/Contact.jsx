import React, { useContext, useState } from 'react'
import Breadcrumbs from '../../components/Breadcrumb/Breadcrumbs'
import { Container, Row, Col, Card, ListGroup, Form, FloatingLabel } from 'react-bootstrap'
import image from "../../assets/images/new/contact-us.png"
import "./contact.css"
import { FaFacebook } from "react-icons/fa";
import { FaTwitter } from "react-icons/fa";
import { GrInstagram } from "react-icons/gr";
import { FaYoutube } from "react-icons/fa";
import Select from 'react-select'
import { NavLink } from 'react-router-dom'
import { StoreContext } from '../../components/Context/StoreContext'
import axios from 'axios'
import Swal from 'sweetalert2'
const Contact = () => {
    const [contact, setContact] = useState({
        type_information: '',
        contact_name: '',
        contact_address: '',
        contact_content: '',
        contact_email: '',
        contact_number: '',
        contact_phone: '',
        contact_title: ''
    })
    const { url } = useContext(StoreContext)
    const handleChange = (e) => {
        const { name, value } = e.target
        setContact(prev => ({ ...prev, [name]: value }))
    }
    const handleSelectChange = (selectedOption) => {
        setContact(prev => ({ ...prev, type_information: selectedOption ? selectedOption.value : '' }))
    }
    const input = [
        {value: 'Du lịch', label: "Du lịch"},
        {value: 'Chăm sóc khách hàng', label: "Chăm sóc khách hàng"},
        {value: 'Liên hệ thông tin khác', label: "Liên hệ thông tin khác"},
    ]
    const handleSubmit = async(e) => {
        e.preventDefault();
        try {
            const response = await axios.post(`${url}/contact`, contact)
            if (response.data.success){
                Swal.fire({
                    text: "Cảm ơn bạn đã liên hệ với chúng tôi !",
                    icon: "success"
                });
                setContact({
                    type_information: '',
                    contact_name: '',
                    contact_address: '',
                    contact_content: '',
                    contact_email: '',
                    contact_number: '',
                    contact_phone: '',
                    contact_title: ''
                })
            }
        } catch (error) {
            alert(error.response?.data?.message || error.message);
        }
    }
    return (
        <>
            <Breadcrumbs />
            <div className='main'>
                <div className="contact-section section-container">
                    <div className="page-main-header">
                        <div className="page-main-header__container">
                            <div className="page-main-header__title">
                                <h1>Nhập họ tên</h1>
                                <p>Để có thể đáp ứng được các yêu cầu và đóng góp ý kiến của quý khách, xin vui lòng gửi thông tin hoặc gọi đến hotline các chi nhánh bên dưới để liên hệ một cách nhanh chóng</p>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            <div className="contact py-5">
                <Container>
                    <Row>
                        <Col lg="4" md="6" className='mb-4 mb-lg-0 h-100'>
                            <Card className='border-0 shadow-sm rounded-3 mb-4 card h-100'>
                                <Card.Body className='text-center card-body'>
                                    <div className='d-flex justify-content-center align-item-search my-2'>
                                        <div className="bg-info rounded-circle text-info shadow-sm bg-opacity-10 p-3 mb-2">
                                            <i className='bi bi-headset h3'></i>
                                        </div>
                                    </div>
                                    <Card.Title className='fw-bold h5 card-title h5'>Call US</Card.Title>
                                    <p className='mb-2 body-text'>
                                        Hãy liên hệ với chúng tôi nếu có bất kỳ thắc mắc hoặc trợ giúp nào. Đội ngũ của chúng tôi sẵn sàng hỗ trợ bạn 24/7.
                                    </p>
                                    <div className="d-block">
                                        <NavLink className="btn btn-light me-2 btn-sm" style={{background: "#eb5c43", color: "#fff"}}>
                                            <i className="bi bi-phone me-1"></i> +12 3456 789
                                        </NavLink>
                                        <NavLink className="btn btn-light me-2 btn-sm" style={{background: "#eb5c43", color: "#fff"}}>
                                            <i className="bi bi-telephone me-1"></i> +12 3456 789
                                        </NavLink>
                                    </div>
                                </Card.Body>
                            </Card>
                        </Col>
                        <Col lg="4" md="6" className='mb-4 mb-lg-0 h-100'>
                            <Card className='border-0 shadow-sm rounded-3 mb-4 card h-100'>
                                <Card.Body className='text-center card-body'>
                                    <div className='d-flex justify-content-center align-item-search my-2'>
                                        <div className="bg-danger rounded-circle text-danger shadow-sm bg-opacity-10 p-3 mb-2">
                                            <i className='bi bi-envelope h3'></i>
                                        </div>
                                    </div>
                                    <Card.Title className='fw-bold h5 card-title h5'>Email Us</Card.Title>
                                    <p className='mb-2 body-text'>
                                        Gửi email cho chúng tôi và chúng tôi sẽ liên hệ lại với bạn sớm nhất có thể. Chúng tôi sẵn sàng trợ giúp nếu bạn có bất kỳ câu hỏi nào.
                                    </p>
                                    <div className="d-block">
                                        <NavLink className="btn btn-light me-2 btn-sm" style={{background: "#eb5c43", color: "#fff"}}>
                                            <i className="bi bi-envelope me-2"></i> demo@gmail.com
                                        </NavLink>
                                    </div>
                                </Card.Body>
                            </Card>
                        </Col>
                        <Col lg="4" md="12" className='mb-4 mb-lg-0 h-100'>
                            <Card className='border-0 shadow-sm rounded-3 mb-4 card h-100'>
                                <Card.Body className='text-center card-body'>
                                    <div className='d-flex justify-content-center align-item-search my-2'>
                                        <div className="bg-warning rounded-circle text-warning shadow-sm bg-opacity-10 p-3 mb-2">
                                            <i className='bi bi-globe h3'></i>
                                        </div>
                                    </div>
                                    <Card.Title className='fw-bold h5 card-title h5'>Social Media</Card.Title>
                                    <p className='mb-2 body-text'>
                                        Luôn kết nối với chúng tôi trên phương tiện truyền thông xã hội. Theo dõi chúng tôi để cập nhật thông tin mới nhất và cảm hứng du lịch
                                    </p>
                                    <div className='d-block justify-content-center'>
                                        <ListGroup horizontal className='justify-content-center'>
                                            <NavLink style={{marginRight: "30px", fontSize: "20px"}} className='border-0'><FaFacebook style={{color: "#eb5c43"}} /></NavLink>
                                            <NavLink style={{marginRight: "30px", fontSize: "20px"}} className='border-0'><GrInstagram style={{color: "#eb5c43"}} /></NavLink>
                                            <NavLink style={{marginRight: "30px", fontSize: "20px"}} className='border-0'><FaTwitter style={{color: "#eb5c43"}} /></NavLink>
                                            <NavLink style={{fontSize: "20px"}} className='border-0'><FaYoutube style={{color: "#eb5c43"}} /></NavLink>
                                        </ListGroup>
                                    </div>
                                </Card.Body>
                            </Card>
                        </Col>
                    </Row>
                    <Row className='py-5 align-items-center'>
                        <Col xl="6" md="6" className='d-none d-md-block'>
                            <img src={image} alt="" className='img-fluid me-3' />
                        </Col>
                        <Col xl="6" md="6">
                            <Card className='bg-light p-4 border-0 shadow-sm'>
                                <div className="form-box">
                                    <h1 className="h3 font-bold mb-4">Thông tin liên lạc</h1>
                                    <Form onSubmit={handleSubmit}>
                                        <Row>
                                            <Col md="6">
                                                <Select
                                                    options={input} 
                                                    placeholder="Loại thông tin"
                                                    isClearable 
                                                    required
                                                    onChange={handleSelectChange}
                                                />
                                            </Col>
                                            <Col md="6">
                                                <FloatingLabel controlId="name" label="Họ tên" className='mb-4'>
                                                    <Form.Control 
                                                        type="text" 
                                                        placeholder="Nhập họ tên" 
                                                        name='contact_name'  
                                                        required 
                                                        onChange={handleChange}
                                                        value={contact.contact_name}
                                                    />
                                                </FloatingLabel>
                                            </Col>
                                            <Col md="12">
                                                <FloatingLabel
                                                    controlId="email"
                                                    label="Nhập email"
                                                    className="mb-4"
                                                >
                                                    <Form.Control 
                                                        type="email" 
                                                        placeholder="name@example.com" 
                                                        name='contact_email' 
                                                        required 
                                                        onChange={handleChange} 
                                                        value={contact.contact_email}
                                                    />
                                                </FloatingLabel>
                                            </Col>
                                            <Col md="6">
                                                <FloatingLabel
                                                    controlId="phone"
                                                    label="Nhập số điện thoại"
                                                    className="mb-4"
                                                >
                                                    <Form.Control 
                                                        type="text" 
                                                        placeholder="Nhập số điện thoại" 
                                                        name='contact_phone' 
                                                        required 
                                                        onChange={handleChange}
                                                        value={contact.contact_phone}
                                                    />
                                                </FloatingLabel>
                                            </Col>
                                            <Col md="6">
                                                <FloatingLabel  label="Số khách" className='mb-4'>
                                                    <Form.Control 
                                                        type="number" 
                                                        placeholder='' 
                                                        name='contact_number' 
                                                        onChange={handleChange}
                                                        value={contact.contact_number}
                                                    />
                                                </FloatingLabel>
                                            </Col>
                                            <Col md="12">
                                                <FloatingLabel
                                                    label="Địa chỉ"
                                                    className="mb-4"
                                                >
                                                    <Form.Control 
                                                        type="text" 
                                                        placeholder='' 
                                                        name='contact_address' 
                                                        onChange={handleChange}
                                                        value={contact.contact_address}
                                                    />
                                                </FloatingLabel>
                                            </Col>
                                            <Col md="12">
                                                <FloatingLabel
                                                    label="Tiêu đề"
                                                    className="mb-4"
                                                >
                                                    <Form.Control 
                                                        type="text" 
                                                        placeholder='' 
                                                        name='contact_title' 
                                                        required 
                                                        onChange={handleChange}
                                                        value={contact.contact_title}
                                                    />
                                                </FloatingLabel>
                                            </Col>
                                            <Col md="12">
                                                <FloatingLabel label="Nội dung">
                                                    <Form.Control
                                                        as="textarea"
                                                        placeholder=''
                                                        style={{ height: '126px' }}
                                                        required
                                                        onChange={handleChange}
                                                        name='contact_content'
                                                        value={contact.contact_content}
                                                    />
                                                </FloatingLabel>
                                            </Col>
                                        </Row>
                                        <button className='primaryBtn mt-3' type='submit'>Gửi ngay</button>
                                    </Form>
                                </div>
                            </Card>
                        </Col>
                    </Row>
                </Container>
            </div>
        </>
    )
}

export default Contact