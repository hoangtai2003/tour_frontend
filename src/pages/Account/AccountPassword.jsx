import React from 'react'
import { FormLabel } from 'react-bootstrap'

const AccountPassword = () => {
    return (
        <>
        <div className='account_right-sidebar'>
            <div className="account_right-info-top">
                <h4>Đổi mật khẩu</h4>
                <p>Để bảo mật tài khoản, vui lòng không chia sẻ mật khẩu cho người khác</p>
                <hr />
            </div>
            <div className="account_right-info-body">
                <div className="row">
                    <div className="left">
                        <FormLabel>Mật khẩu cũ: </FormLabel>
                    </div>
                    <div className="right">
                        <input placeholder="Nhập mật khẩu cũ" type="password" name="OldPasswordInput" />
                    </div>
                </div>
                <div className="row">
                    <div className="left">
                        <FormLabel>Mật khẩu mới: </FormLabel>
                    </div>
                    <div className="right">
                        <input placeholder="Nhập mật khẩu mới" type="password" name="newPasswordInput" />
                    </div>
                </div>
                <div className="row">
                    <div className="left">
                        <FormLabel>Nhập lại mật khẩu mới: </FormLabel>
                    </div>
                    <div className="right">
                        <input placeholder="Nhập lại mật khẩu mới" type="password" name="newPasswordPreInput" />
                    </div>
                </div>
                <button className="btn-blue btn-change-password" aria-label="Đổi mật khẩu">ĐỔI MẬT KHẨU</button>
            </div>
        </div>
        </>
    )
}

export default AccountPassword
