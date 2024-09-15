import React, { useState } from 'react'
import { Form } from 'react-bootstrap'
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';
import { MdDateRange } from "react-icons/md";
const InformationCustomer = () => {
    const [selectedDate, setSelectedDate] = useState(null);
    return (                           
        <div className="form-row">
            <Form.Group className="form-group">
                <Form.Label  className="required">Họ tên: <span>*</span></Form.Label>
                <Form.Control type="text" placeholder="Nhập họ tên" className="input-field" required />
            </Form.Group>
            <Form.Group className="form-group">
                <Form.Label className="required">Giới tính: <span>*</span></Form.Label>
                <Form.Select className="input-field">
                    <option value="Nam">Nam</option>
                    <option value="Nữ">Nữ</option>
                </Form.Select>
            </Form.Group>
            
            <Form.Group className="form-group">
                <Form.Label className="required">Ngày sinh: <span>*</span></Form.Label>
                <div className="date-picker-container">
                    <DatePicker
                        selected={selectedDate}
                        onChange={(date) => setSelectedDate(date)}
                        dateFormat="dd/MM/yyyy"
                        showYearDropdown
                        scrollableYearDropdown
                        showMonthDropdown
                        yearDropdownItemNumber={201} 
                        placeholderText='-- / -- / ----'
                    /><MdDateRange  className='date-icon'/>
                </div>
            </Form.Group>
        </div>
    )
}

export default InformationCustomer