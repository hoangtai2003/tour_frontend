import React, { useContext, useState } from 'react'
import { Form, FormLabel } from 'react-bootstrap'
import { StoreContext } from '../../components/Context/StoreContext'
import axios from 'axios'
import Swal from 'sweetalert2'; 
const AccountPassword = () => {
    const {url, userId} = useContext(StoreContext)
    const [editPassword, setEditPassword] = useState({
        currentPassword: '',
        newPassword: '',
        confirmPassword: ''
    })
    const handleChange = (e) => {
        const name = e.target.name
        const value = e.target.value
        setEditPassword(prev => ({...prev, [name]:value}))
    }
    const editPasswordSubmit = async(e) => {
        e.preventDefault()
        try {
            const response = await axios.put(`${url}/users/updatePassword/${userId}`, editPassword)
            if (response.data.success){
                Swal.fire({
                    text: "Cập nhật thông tin thành công",
                    icon: "success"
                });
                setEditPassword({
                    currentPassword: '',
                    newPassword: '',
                    confirmPassword: ''
                }) 
            }
        } catch (error) {
            Swal.fire({
                text: error.response?.data?.message || error.message,
                icon: "error"
            });
        }
        
    }
    return (
        <>
        <div className='account_right-sidebar'>
            <div className="account_right-info-top">
                <h4>Đổi mật khẩu</h4>
                <p>Để bảo mật tài khoản, vui lòng không chia sẻ mật khẩu cho người khác</p>
                <hr />
            </div>
            <Form className="account_right-info-body" onSubmit={editPasswordSubmit}>
                <div className="row">
                    <div className="left">
                        <FormLabel>Mật khẩu cũ: </FormLabel>
                    </div>
                    <div className="right">
                        <input required placeholder="Nhập mật khẩu cũ" type="password" name="currentPassword" value={editPassword.currentPassword} onChange={handleChange}/>
                    </div>
                </div>
                <div className="row">
                    <div className="left">
                        <FormLabel>Mật khẩu mới: </FormLabel>
                    </div>
                    <div className="right">
                        <input required placeholder="Nhập mật khẩu mới" type="password" name="newPassword" value={editPassword.newPassword} onChange={handleChange}/>
                    </div>
                </div>
                <div className="row">
                    <div className="left">
                        <FormLabel>Nhập lại mật khẩu mới: </FormLabel>
                    </div>
                    <div className="right">
                        <input required placeholder="Nhập lại mật khẩu mới" type="password" name="confirmPassword" value={editPassword.confirmPassword} onChange={handleChange}/>
                    </div>
                </div>
                <button className="btn-blue btn-change-password" aria-label="Đổi mật khẩu">Đổi mật khẩu</button>
            </Form>
        </div>
        </>
    )
}

export default AccountPassword
