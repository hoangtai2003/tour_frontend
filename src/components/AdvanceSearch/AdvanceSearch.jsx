import React, { useContext, useEffect, useState } from "react";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import "./search.css";
import { Container, Row, Col } from "react-bootstrap";
import { StoreContext } from "../Context/StoreContext"
import Select from 'react-select'
import axios from "axios";
import { vi } from "date-fns/locale";
import { useNavigate } from "react-router-dom";

const AdvanceSearch = () => {
    const [startDate, setStartDate] = useState(new Date());
    const [endDate, setEndDate] = useState(new Date());
    const { url } = useContext(StoreContext)
    const [locations, setLocations] = useState([])
    const [selectedEndLocation, setSelectedEndLocation] = useState(null);
    const [selectedPrice, setSelectedPrice] = useState((null))
    const navigate = useNavigate()
    const handleLocationEndChange = (selectedOption) => {
        setSelectedEndLocation(selectedOption);
    };
    const handlePriceChange = (selectedOption) => {
        setSelectedPrice(selectedOption);
    };

    const handleStartDateChange = (start_date) => {
        const adjustedDate = new Date(start_date.getTime() - start_date.getTimezoneOffset() * 60000);
        setStartDate(adjustedDate);
    };
    const handleEndDateChange = (end_date) => {
        const adjustedDate = new Date(end_date.getTime() - end_date.getTimezoneOffset() * 60000);
        setEndDate(adjustedDate)
    };
    const roundPrice = [
        {value: "under5", label: "Dưới 5 triệu"},
        {value: "5-10", label: "Từ 5 - 10 triệu"},
        {value: "10-20", label: "Từ 10 - 20 triệu"},
        {value: "bigger20", label: "Trên 20 triệu"},
    ]
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
    const applyFilters = () => {
        const price = selectedPrice.value; 
        const name = selectedEndLocation ? selectedEndLocation.label : null; 
        const start_date = startDate ? startDate.toISOString().split('T')[0] : null; 
        const end_date = endDate ? endDate.toISOString().split('T')[0] : null; 
        navigate("/search-result", {
            state: {
                price,
                name,
                start_date,
                end_date
            }
        });
    };
    const isSearchButtonDisabled = !selectedPrice || !selectedEndLocation;
    return (
        <>
            <section className="box-search-advance">
                <Container>
                    <Row>
                        <Col md={12} xs={12}>
                            <div className="box-search shadow-sm">

                                <div className="item-search">
                                <label className="item-search-label"> Bạn muốn đi đâu? </label>
                                <Select
                                    className="custom-select"
                                    options={locations} 
                                    value={selectedEndLocation} 
                                    onChange={handleLocationEndChange} 
                                    placeholder="Tất cả"
                                    isClearable 
                                    classNamePrefix="react-select"
                                />
                                </div>
                                <div className="item-search item-search-2">
                                    <label className="item-search-label"> Ngày khởi hành </label>
                                    <DatePicker
                                        selected={startDate}
                                        onChange={handleStartDateChange}
                                        dateFormat="eee, dd 'tháng' MM" 
                                        locale={vi}

                                    />
                                </div>
                                <div className="item-search item-search-2">
                                    <label className="item-search-label"> Ngày trở về </label>
                                    <DatePicker
                                        selected={endDate}
                                        onChange={handleEndDateChange}
                                        dateFormat="eee, dd 'tháng' MM" 
                                        locale={vi}

                                    />
                                </div>
                                <div className="item-search bd-none">
                                    <label className="item-search-label"> Ngân sách </label>
                                    <Select
                                        className="custom-select"
                                        classNamePrefix="react-select"
                                        placeholder="Chọn mức giá"
                                        isClearable 
                                        options={roundPrice}
                                        onChange={handlePriceChange}

                                    />
                                </div>
                                <div className="item-search bd-none">
                                    <button
                                        className={`primaryBtn flex-even d-flex justify-content-center ${isSearchButtonDisabled ? 'disabled-btn' : ''}`}
                                        onClick={applyFilters}
                                        disabled={isSearchButtonDisabled}
                                    >
                                        <i className="bi bi-search me-2"></i> Tìm kiếm
                                    </button>
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