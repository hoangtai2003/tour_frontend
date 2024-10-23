import React, { useState } from 'react'
import { Form } from 'react-bootstrap'
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';
import { MdDateRange } from "react-icons/md";
const InformationCustomer = ({index, handlePassengerChange}) => {
    const [selectedDate, setSelectedDate] = useState(null);

    const handleDateChange = (date) => {
        setSelectedDate(date);
        handlePassengerChange(index, { target: { name: 'passenger_dateOfBirthday', value: date } });
    };

    return (
        <div className="form-row">
            <Form.Group className="form-group">
                <Form.Label className="required">Họ tên: <span>*</span></Form.Label>
                <Form.Control 
                    type="text" 
                    placeholder="Nhập họ tên" 
                    className="input-field" 
                    required 
                    name='passenger_name'
                    onChange={(e) => handlePassengerChange(index, e)}    
                />
            </Form.Group>
            <Form.Group className="form-group">
                <Form.Label className="required">Giới tính: <span>*</span></Form.Label>
                <Form.Select 
                    className="input-field" 
                    name='passenger_gender' 
                    onChange={(e) => handlePassengerChange(index, e)}
                    style={{width: "90%"}}
                >
                    <option value="Nam">Nam</option>
                    <option value="Nữ">Nữ</option>
                </Form.Select>
            </Form.Group>
            <Form.Group className="form-group">
                <Form.Label className="required">Ngày sinh: <span>*</span></Form.Label>
                <div className="date-picker-container">
                    <DatePicker
                        selected={selectedDate}
                        onChange={handleDateChange}
                        dateFormat="dd/MM/yyyy"
                        showYearDropdown
                        scrollableYearDropdown
                        showMonthDropdown
                        yearDropdownItemNumber={201} 
                        placeholderText='-- / -- / ----'
                        name='passenger_dateOfBirthday'
                    />
                    <MdDateRange className='date-icon'/>
                </div>
            </Form.Group>
        </div>
    );
};


export default InformationCustomer