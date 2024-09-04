import React, { useState } from "react";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";

import "./search.css";
import { Container, Row, Col, Button } from "react-bootstrap";
// import
import CustomDropdown from "../CustomDropDown/CustomDropDown";

const AdvanceSearch = () => {
    const [startDate, setStartDate] = useState(new Date());
    const [endDate, setEndDate] = useState(new Date());

    const selectedLocation =(value)=>{
        console.log("Location", value)
    }

    const selectedGuest =(value)=>{
        console.log("Guest ", value)
    }

    return (
        <>
            <section className="box-search-advance">
                <Container>
                    <Row>
                        <Col md={12} xs={12}>
                            <div className="box-search shadow-sm">
                                <div className="item-search">
                                {/*  Using Props to Pass Data */}
                                    <CustomDropdown
                                        label="Bạn muốn đi đâu ?"
                                        onSelect={selectedLocation}
                                        options={[
                                            "USA, Turkish",
                                            "Tokyo, Japan",
                                            "Sydney, Australia",
                                            "Melbourne, Australia",
                                            "Paris, France",
                                        ]}
                                    />
                                </div>
                                <div className="item-search item-search-2">
                                    <label className="item-search-label"> Ngày khởi hành </label>
                                    <DatePicker
                                        selected={startDate}
                                        onChange={(date) => setStartDate(date)}
                                        selectsStart
                                        startDate={startDate}
                                        endDate={endDate}
                                    
                                        dateFormat="dd, MMMM, yyyy"
                                    />
                                </div>
                                <div className="item-search item-search-2">
                                    <label className="item-search-label"> Ngày trở về </label>
                                    <DatePicker
                                        selected={endDate}
                                        onChange={(date) => setEndDate(date)}
                                        selectsEnd
                                        startDate={endDate}
                                        endDate={startDate}
                                        dateFormat="dd, MMMM, yyyy"
                                    />
                                </div>
                                <div className="item-search bd-none">
                                    <CustomDropdown
                                        label="Ngân sách"
                                        onSelect={selectedGuest}
                                        options={[
                                            "Dưới 5 triệu",
                                            "Từ 5 - 10 triệu",
                                            "Từ 10 - 20 triệu",
                                            "Trên 20 triệu"
                                        ]}
                                    />
                                </div>
                                <div className="item-search bd-none">
                                    <Button className="primaryBtn flex-even d-flex justify-content-center">
                                        <i className="bi bi-search me-2"></i> Tìm kiếm
                                    </Button>
                                </div>
                            </div>
                        </Col>
                    </Row>
                </Container>
            </section>
        </>
    );
};

export default AdvanceSearch;