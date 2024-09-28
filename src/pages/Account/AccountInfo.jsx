import React, { useContext, useEffect, useState } from 'react'
import { MdEdit } from "react-icons/md";
import { Form, FormGroup, FormLabel } from 'react-bootstrap';
import { StoreContext } from '../../components/Context/StoreContext';
import axios from 'axios';
import Swal from 'sweetalert2'; 
const AccountInfo = () => {
    const [isEditingName, setIsEditingName] = useState(false)
    const [isEditingGender, setIsEditingGender] = useState(false)
    const [isEditingBirthday, setIsEditingBirthday] = useState(false)
    const [isEditingPhone, setIsEditingPhone] = useState(false)
    const [isEditingAddress, setIsEditingAddress] = useState(false)
    const [editName, setEditName] = useState({
        username: ''
    })
    const [editGender, setEditGender] = useState({
        gender: 'Nam'
    })
    const [editPhone, setEditPhone] = useState({
        phone: ''
    })
    const [editAddress, setEditAddress] = useState({
        address: ''
    })
    const [editBirthday, setEditBirthday] = useState({
        dateBirtdday: ''
    })
    const { user, userId, url, fetchUserInfo } = useContext(StoreContext)
    const handleEditName = async(e) => {
        const name = e.target.name
        const value = e.target.value
        setEditName(prev => ({...prev, [name]:value}))
    }

    const handleEditGender = async(e) => {
        const name = e.target.name
        const value = e.target.value
        setEditGender(prev => ({...prev, [name]:value}))
    }

    const handleEditBirthday = async(e) => {
        const name = e.target.name
        const value = e.target.value
        setEditBirthday(prev => ({...prev, [name]:value}))
    }

    const handleEditPhone = async(e) => {
        const name = e.target.name
        const value = e.target.value
        setEditPhone(prev => ({...prev, [name]:value}))
    }
    const handleEditAddress = async(e) => {
        const name = e.target.name
        const value = e.target.value
        setEditAddress(prev => ({...prev, [name]:value}))
    }
    const editNameSubmit = async(e) => {
        e.preventDefault()
        try {
            const response = await axios.put(`${url}/users/${userId}`, editName)
            if (response.data.success){
                Swal.fire({
                    text: "Cập nhật thông tin thành công",
                    icon: "success"
                  });
                setIsEditingName(false);
                fetchUserInfo()
            }
        } catch (error) {
            alert(error.response?.data?.message || error.message);
        }
    } 
    const editGenderSubmit = async(e) => {
        e.preventDefault()
        try {
            const response = await axios.put(`${url}/users/${userId}`, editGender)
            if (response.data.success){
                Swal.fire({
                    text: "Cập nhật thông tin thành công",
                    icon: "success"
                  });
                setIsEditingGender(false);
                fetchUserInfo()
            }
        } catch (error) {
            alert(error.response?.data?.message || error.message);
        }
    } 
    const editPhoneSubmit = async(e) => {
        e.preventDefault()
        try {
            const response = await axios.put(`${url}/users/${userId}`, editPhone)
            if (response.data.success){
                Swal.fire({
                    text: "Cập nhật thông tin thành công",
                    icon: "success"
                  });
                setIsEditingPhone(false);
                fetchUserInfo()
            }
        } catch (error) {
            alert(error.response?.data?.message || error.message);
        }
    } 
    const editAddressSubmit = async(e) => {
        e.preventDefault()
        try {
            const response = await axios.put(`${url}/users/${userId}`, editAddress)
            if (response.data.success){
                Swal.fire({
                    text: "Cập nhật thông tin thành công",
                    icon: "success"
                  });
                setIsEditingAddress(false);
                fetchUserInfo()
            }
        } catch (error) {
            alert(error.response?.data?.message || error.message);
        }
    } 
    
    const editBirthdaySubmit = async(e) => {
        e.preventDefault()
        try {
            const response = await axios.put(`${url}/users/${userId}`, editBirthday)
            if (response.data.success){
                Swal.fire({
                    text: "Cập nhật thông tin thành công",
                    icon: "success"
                  });
                setIsEditingBirthday(false);
                fetchUserInfo()
            }
        } catch (error) {
            alert(error.response?.data?.message || error.message);
        }
    } 
    
   
    return (
        <>
        <div className='account_right-sidebar'>
            <div className="account_right-info-top">
                <h4>Thông tin cá nhân</h4>
                <p>Cập nhật thông tin của Quý khách và tìm hiểu các thông tin này được sử dụng ra sao</p>
                <hr />
            </div>
            <div className="account_right-info-body">
                <div className='item'>
                    <div className='left'><span>Họ và tên</span></div>
                    <div className="right">
                        {isEditingName ? (
                            <>
                                <div className='info-form'>
                                    <span>{user?.username} </span>
                                </div>
                                <Form className="edit-form" onSubmit={editNameSubmit}>
                                    <FormLabel>Họ và tên</FormLabel>
                                    <FormGroup>
                                        <input type='text' name='username' placeholder='Nhập tên mới' value={editName.username} onChange={handleEditName}/>
                                    </FormGroup>
                                    <div className="btn-group">
                                        <button className="btn-cancel" onClick={() => setIsEditingName(!isEditingName)}>Hủy</button>
                                        <button className='btn-save'>Lưu</button>
                                    </div>
                                </Form>
                                
                            </>
                        ) : (
                        <div className='info-form'>
                            <span>{user?.username} </span>
                            <button onClick={() => {
                                setIsEditingName(true);
                                setEditName(prev => ({ ...prev, username: user.username })); 
                            }} className='btn-edit'><MdEdit /></button>
                        </div>
                        )}
                    </div>
                </div>
                <div className='item'>
                    <div className='left'><span>Giới tính</span></div>
                    <div className="right">
                        {isEditingGender ? (
                            <>
                                <div className='info-form'>
                                    <span>{user?.gender}</span>
                                </div>
                                <Form className="edit-form" onSubmit={editGenderSubmit}>
                                    <FormLabel>Giới tính</FormLabel>
                                    <FormGroup>
                                        <Form.Select name='gender' onChange={handleEditGender}>
                                            <option value="Nam">Nam</option>
                                            <option value="Nữ">Nữ</option>
                                        </Form.Select>
                                    </FormGroup>
                                    <div className="btn-group">
                                        <button className="btn-cancel" onClick={() => setIsEditingGender(!isEditingGender)}>Hủy</button>
                                        <button className='btn-save'>Lưu</button>
                                    </div>
                                </Form>
                                
                            </>
                        ) : (
                        <div className='info-form'>
                            <span>{user?.gender}</span>
                            <button onClick={() => setIsEditingGender(!isEditingGender)} className='btn-edit'><MdEdit /></button>
                        </div>
                        )}
                    </div>
                </div>
                <div className='item'>
                    <div className='left'><span>Ngày sinh</span></div>
                    <div className="right">
                        {isEditingBirthday ? (
                            <>
                                <div className='info-form'>
                                    <span>{new Date(user?.dateBirthday).toLocaleDateString('vi-VN')}</span>
                                </div>
                                <Form className="edit-form" onSubmit={editBirthdaySubmit}>
                                    <FormLabel>Ngày sinh</FormLabel>
                                    <FormGroup>
                                        <input type='date' name='dateBirthday' onChange={handleEditBirthday} />
                                    </FormGroup>
                                    <div className="btn-group">
                                        <button className="btn-cancel" onClick={() => setIsEditingBirthday(!isEditingBirthday)}>Hủy</button>
                                        <button className='btn-save'>Lưu</button>
                                    </div>
                                </Form>
                                
                            </>
                        ) : (
                        <div className='info-form'>
                            <span>{new Date(user?.dateBirthday).toLocaleDateString('vi-VN')}</span>
                            <button onClick={() => setIsEditingBirthday(!isEditingBirthday)} className='btn-edit'><MdEdit /></button>
                        </div>
                        )}
                    </div>
                </div>
                <div className='item'>
                    <div className='left'><span>Số điện thoại</span></div>
                    <div className="right">
                        {isEditingPhone ? (
                            <>
                                <div className='info-form'>
                                    <span>{user?.phone}</span>
                                </div>
                                <Form className="edit-form" onSubmit={editPhoneSubmit}>
                                    <FormLabel>Số điện thoại</FormLabel>
                                    <FormGroup>
                                        <input type='text' name='phone' placeholder='Nhập số điện thoại' onChange={handleEditPhone}/>
                                    </FormGroup>
                                    <div className="btn-group">
                                        <button className="btn-cancel" onClick={() => setIsEditingPhone(!isEditingPhone)}>Hủy</button>
                                        <button className='btn-save'>Lưu</button>
                                    </div>
                                </Form>
                                
                            </>
                        ) : (
                        <div className='info-form'>
                            <span>{user?.phone}</span>
                            <button onClick={() => setIsEditingPhone(!isEditingPhone)} className='btn-edit'><MdEdit /></button>
                        </div>
                        )}
                    </div>
                </div>
                <div className='item'>
                    <div className='left'><span>Email:</span></div>
                    <div className="right">
                        <div className='info-form'>
                            <span>{user?.email}</span>
                        </div>
                    </div>
                </div>
                <div className='item'>
                    <div className='left'><span>Địa chỉ</span></div>
                    <div className="right">
                        {isEditingAddress ? (
                            <>
                                <div className='info-form'>
                                    <span>{user?.address}</span>
                                </div>
                                <Form className="edit-form" onSubmit={editAddressSubmit}>
                                    <FormLabel>Địa chỉ</FormLabel>
                                    <FormGroup>
                                        <input type='text' name='address' placeholder='Nhập địa chỉ' onChange={handleEditAddress}/>
                                    </FormGroup>
                                    <div className="btn-group">
                                        <button className="btn-cancel" onClick={() => setIsEditingAddress(!isEditingAddress)}>Hủy</button>
                                        <button className='btn-save'>Lưu</button>
                                    </div>
                                </Form>
                            </>
                        ) : (
                        <div className='info-form'>
                            <span>{user?.address}</span>
                            <button onClick={() => setIsEditingAddress(true)} className='btn-edit'><MdEdit /></button>
                        </div>
                        )}
                    </div>
                </div>
                <div className='item'>
                    <div className='left'><span>Tổng số tour đã đi:</span></div>
                    <div className="right">
                        <div className='info-form'>
                            <span>0</span>
                        </div>
                    </div>
                </div>
            </div>    
        </div>
        </>

    )
}

export default AccountInfo
