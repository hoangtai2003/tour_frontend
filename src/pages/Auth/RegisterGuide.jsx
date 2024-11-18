import React, {useContext, useEffect, useState} from 'react';
import { Container, Col, Row, Form, FormGroup} from 'react-bootstrap';
import { useNavigate } from 'react-router-dom';
import { StoreContext } from '../../components/Context/StoreContext';
import axios from 'axios';
import Select from 'react-select'
import Swal from 'sweetalert2';
const RegisterGuide = () => {
    useEffect(() => {
        document.title = "Hệ thống bán tour trực tuyến | Du lịch Việt"
        window.scroll(0,0)
    }, [])
    const [selectedLocation, setSelectedLocation] = useState(null);
    const [locations, setLocations] = useState([])
    const { url } = useContext(StoreContext)
    const navigate = useNavigate()

    const [formData, setFormData] = useState({
        username: "",
        email: "",
        phone: "",
        role_id: 18,
        location_id: "",
        status: "Ngừng hoạt động"
    })
    const handleChange = (e) => {
        const name = e.target.name
        const value  = e.target.value
        setFormData(prev => ({...prev, [name]:value}))
    } 
    const onSubmit = async (e) => {
        e.preventDefault();
        const response = await axios.post(`${url}/auth/register`, formData);
        if (response.data.success) {
            Swal.fire({
                icon: 'success',
                title: 'Đăng ký thành công',
            });
            navigate("/login");
        } else {
            Swal.fire({
                icon: 'error',
                title: 'Đăng ký thất bại',
                text: response.data.message,
            });
        }
    };
    
    useEffect(() => {
        const fetchLocation = async () => {
            try {
                const response = await axios.get(`${url}/location/all/getAllLocation`);
            
                const filterLocations = response.data.data.filter(location => location.parent_id !== 0);
                const formattedLocations = filterLocations.map(location => ({
                    value: location.id, 
                    label: location.name 
                }));
    
                setLocations(formattedLocations);
            } catch (error) {
                console.error('Lỗi khi lấy danh sách địa điểm:', error);
            }
        };
        fetchLocation()
    }, [url])
    const handleLocationEndChange = (selectedOption) => {
        setSelectedLocation(selectedOption);
        setFormData(prev => ({ ...prev, location_id: selectedOption ? selectedOption.value : "" }));
    };
    
    return (
        <div className="login-page">
            <Container>
                <Row className='justify-content-center align-items-center'>
                    <Col lg="8" className='custom-register-row'>
                        <div className="register-card">
                            <h2 className="register-title">Đăng ký làm hướng dẫn viên</h2>
                            <Form onSubmit={onSubmit} style={{ marginTop: "40px" }}>
                                <div className='form-controller'>
                                    <FormGroup className='form-group'>
                                        <label className='font-bold'>Họ và tên <span>*</span></label>
                                        <input type="text" placeholder="Họ và tên" className="login-input" name='username' required onChange={handleChange} />
                                    </FormGroup>
                                    <FormGroup className='form-group'>
                                        <label className='font-bold'>Email <span>*</span></label>
                                        <input type="email" placeholder="Email" className="login-input" name='email' required onChange={handleChange} />
                                    </FormGroup>
                                    <FormGroup className='form-group'>
                                        <label className='font-bold'>Số điện thoại <span>*</span></label>
                                        <input type="text" placeholder="Số điện thoại" className="login-input" name='phone' required onChange={handleChange} />
                                    </FormGroup>
                                    <FormGroup className='form-group'>
                                        <label className='font-bold'>Khu vực làm việc <span>*</span></label>
                                        <Select
                                            className="custom-select"
                                            options={locations}
                                            value={selectedLocation}
                                            onChange={handleLocationEndChange}
                                            placeholder="Tất cả"
                                            isClearable
                                            required
                                        />
                                    </FormGroup>
                                    {/* <FormGroup className='form-group'>
                                        <label className='font-bold'>Kinh nghiệm làm việc <span>*</span></label>
                                        <input type="number" placeholder="Kinh nghiệm làm việc" className="login-input" name='user_experience' required onChange={handleChange} />
                                    </FormGroup>
                                    <FormGroup className='form-group'>
                                        <label className='font-bold'>Curriculum Vitae (CV) <span>*</span></label>
                                        <input type="file" accept=".pdf" className="login-input" name='user_profile' required onChange={handleChange} />
                                    </FormGroup> */}
                                </div>
                                <div className="register-card-body">
                                    <button style={{ marginTop: "60px" }} className="register-btn font-bold" type="submit">Đăng ký</button>
                                </div>
                            </Form>

                        </div>  
                    </Col>
                </Row>

            </Container>
        </div>
    );
};

export default RegisterGuide;
