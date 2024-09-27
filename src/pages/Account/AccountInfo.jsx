import React, { useEffect, useState } from 'react'
import { MdEdit } from "react-icons/md";
import { Form, FormGroup, FormLabel } from 'react-bootstrap';
const AccountInfo = () => {
    const [isEditingName, setIsEditingName] = useState(false)
    const [isEditingGender, setIsEditingGender] = useState(false)
    const [isEditingBirthday, setIsEditingBirthday] = useState(false)
    const [isEditingPhone, setIsEditingPhone] = useState(false)
    const [isEditingAddress, setIsEditingAddress] = useState(false)
    const handleEditName = async() => {
        setIsEditingName(false)
    }

    const handleEditGender = async() => {
        setIsEditingGender(false)
    }

    const handleEditBirthday = async() => {
        setIsEditingBirthday(false)
    }

    const handleEditPhone = async() => {
        setIsEditingPhone(false)
    }
    const handleEditAddress = async() => {
        setIsEditingAddress(false)
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
                                    <span>Tài Hoàng </span>
                                </div>
                                <div className="edit-form">
                                    <FormLabel>Họ và tên</FormLabel>
                                    <FormGroup>
                                        <input type='text' name='username' placeholder='Nhập tên mới' />
                                    </FormGroup>
                                    <div className="btn-group">
                                        <button className="btn-cancel" onClick={() => setIsEditingName(!isEditingName)}>Hủy</button>
                                        <button className='btn-save'>Lưu</button>
                                    </div>
                                </div>
                                
                            </>
                        ) : (
                        <div className='info-form'>
                            <span>Tài Hoàng </span>
                            <button onClick={() => setIsEditingName(!isEditingName)} className='btn-edit'><MdEdit /></button>
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
                                    <span>Nữ </span>
                                </div>
                                <div className="edit-form">
                                    <FormLabel>Giới tính</FormLabel>
                                    <FormGroup>
                                    <Form.Select>
                                            <option value="Nam">Nam</option>
                                            <option value="Nữ">Nữ</option>
                                    </Form.Select>
                                    </FormGroup>
                                    <div className="btn-group">
                                        <button className="btn-cancel" onClick={() => setIsEditingGender(!isEditingGender)}>Hủy</button>
                                        <button className='btn-save'>Lưu</button>
                                    </div>
                                </div>
                                
                            </>
                        ) : (
                        <div className='info-form'>
                            <span>Nữ </span>
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
                                    <span></span>
                                </div>
                                <div className="edit-form">
                                    <FormLabel>Ngày sinh</FormLabel>
                                    <FormGroup>
                                        <input type='date' name='username' placeholder='Nhập tên mới' />
                                    </FormGroup>
                                    <div className="btn-group">
                                        <button className="btn-cancel" onClick={() => setIsEditingBirthday(!isEditingBirthday)}>Hủy</button>
                                        <button className='btn-save'>Lưu</button>
                                    </div>
                                </div>
                                
                            </>
                        ) : (
                        <div className='info-form'>
                            <span></span>
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
                                    <span></span>
                                </div>
                                <div className="edit-form">
                                    <FormLabel>Số điện thoại</FormLabel>
                                    <FormGroup>
                                        <input type='text' name='username' placeholder='Nhập số điện thoại' />
                                    </FormGroup>
                                    <div className="btn-group">
                                        <button className="btn-cancel" onClick={() => setIsEditingPhone(!isEditingPhone)}>Hủy</button>
                                        <button className='btn-save'>Lưu</button>
                                    </div>
                                </div>
                                
                            </>
                        ) : (
                        <div className='info-form'>
                            <span></span>
                            <button onClick={() => setIsEditingPhone(!isEditingPhone)} className='btn-edit'><MdEdit /></button>
                        </div>
                        )}
                    </div>
                </div>
                <div className='item'>
                    <div className='left'><span>Email:</span></div>
                    <div className="right">
                        <div className='info-form'>
                            <span>tai@gmail.com</span>
                        </div>
                    </div>
                </div>
                <div className='item'>
                    <div className='left'><span>Địa chỉ</span></div>
                    <div className="right">
                        {isEditingAddress ? (
                            <>
                                <div className='info-form'>
                                    <span></span>
                                </div>
                                <div className="edit-form">
                                    <FormLabel>Địa chỉ</FormLabel>
                                    <FormGroup>
                                        <input type='text' name='address' placeholder='Nhập địa chỉ' />
                                    </FormGroup>
                                    <div className="btn-group">
                                        <button className="btn-cancel" onClick={() => setIsEditingAddress(!isEditingAddress)}>Hủy</button>
                                        <button className='btn-save'>Lưu</button>
                                    </div>
                                </div>
                            </>
                        ) : (
                        <div className='info-form'>
                            <span></span>
                            <button onClick={() => setIsEditingAddress(!isEditingAddress)} className='btn-edit'><MdEdit /></button>
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
