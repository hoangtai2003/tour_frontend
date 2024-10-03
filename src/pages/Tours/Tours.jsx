import React, { useState, useEffect, useContext } from 'react'
import Breadcrumbs from '../../components/Breadcrumb/Breadcrumbs'
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import vi from 'date-fns/locale/vi'
import './tour.css'
import axios from 'axios'
import Select from 'react-select'
import { StoreContext } from '../../components/Context/StoreContext'
import { IoPricetagsOutline } from "react-icons/io5";
import { GoLocation } from "react-icons/go";
import { FcAlarmClock } from "react-icons/fc";
import { BiBus } from "react-icons/bi";
import { FaRegCalendarAlt } from "react-icons/fa"
import DepartureDateSelector from './DepartureDateSelector'
import { TbPlaneInflight } from "react-icons/tb";
import { FaArrowLeft } from "react-icons/fa";
import { FaArrowRight } from "react-icons/fa";
import { NavLink } from 'react-router-dom'
const Tours = () => {
    const [startDate, setStartDate] = useState(new Date());
    const [endDate, setEndDate] = useState(new Date());
    const [currentPage, setCurrentPage] = useState(1);
    const [totalPage, setTotalPage] = useState(0)
    const [tours, setTour] = useState([])
    const [locations, setLocations] = useState([]);
    const [selectedStartLocation, setSelectedStartLocation] = useState(null);
    const [selectedEndLocation, setSelectedEndLocation] = useState(null);
    const [selectedSort, setSelectedSort] = useState(null);
    const [activeFilter, setActiveFilter] = useState(null)
    const [countTour, setCountTour] = useState(0)
    const { url } = useContext(StoreContext)

    useEffect(() => {
        document.title = "Hệ thống bán tour trực tuyến | Du lịch Việt"
    }, [])
    const fetchTour = async() => {
        const response  = await axios.get(`${url}/tours?page=${currentPage}`)
        setTour(response.data.data)
        setTotalPage(response.data.totalPages)
        setCountTour(response.data.count)
    }
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
    useEffect(() => {
        fetchTour()
        fetchLocation()
    }, [currentPage])

    const handleLocationStartChange = (selectedOption) => {
        setSelectedStartLocation(selectedOption);
    };
    const handleLocationEndChange = (selectedOption) => {
        setSelectedEndLocation(selectedOption);
    };
    const handleSortChange = (selectedOption) => {
        setSelectedSort(selectedOption);
    };
    const sort = [
        {value: 'tatca', label: 'Tất cả'},
        {value: 'giatucaodenthap', label: 'Giá từ cao đến thấp'},
        {value: 'giatuthapdencao', label: 'Giá từ thấp đến cao'},
        {value: 'ngaykhoihanhgannhat', label: 'Ngày khởi hành gần nhất'},
    ]
    const onPageChange = (newPage) => {
        if (newPage >= 1 && newPage <= totalPage){
            setCurrentPage(newPage)
        }
    }
    const fetchFilteredTours = async (price) => {
        try {
            const response = await axios.get(`${url}/tours/price/filter-price`, {
                params: { price }
            });
            
            setTour(response.data.data);
            setCountTour(response.data.count)
        } catch (error) {
            console.error("Lỗi khi lọc tour theo giá:", error);
        }
    };

    const fetchFilteredToursSort = async(sortPrice) => {
        try {
            const response = await axios.get(`${url}/tours/price/filter-sortPrice`, {
                params: { sortPrice }
            });
            setTour(response.data.data)
            setCountTour(response.data.count)
           
        } catch (error) {
            console.error("Lỗi khi lọc tour:", error);
        }
    }
    const handleFilterClick = (price) =>{
        fetchFilteredTours(price)
        setActiveFilter(price)
    }
    const handleClearFilter = () => {
        setActiveFilter(null); 
        fetchTour()
    };
    return (
        <>
            <Breadcrumbs pagename="Tours" />
            <section className="py-5 find-tour-content section">
                <div className='find-tour-content__container section-container'>
                    <div className="find-tour-content__filter">
                        <p className='filter-sidebar-header'>Bộ lọc tìm kiếm</p>
                        <div className="find-tour-content__filter--main-filter filter-section">
                            <div className="find-tour-content__filter--main-filter--range">
                                <div className="find-tour-content__filter--main-filter--title">
                                    <div className="find-tour-content__filter--main-filter--label">
                                        Ngân sách:
                                    </div>
                                    {activeFilter ? (
                                        <span className="pointer" onClick={handleClearFilter}>Xóa</span>
                                    ) : null}

                                </div>
                                <div className="budget-content__list budget-filter-list">
                                    <div className={`budget-content__list--item budget-filter-list--item ${activeFilter === 'under5' ? 'active' : ''}`} onClick={(() => handleFilterClick('under5'))}>
                                        Dưới 5 triệu
                                    </div>
                                    <div className={`budget-content__list--item budget-filter-list--item ${activeFilter === '5-10' ? 'active' : ''}`} onClick={(() => handleFilterClick('5-10'))}>
                                        Từ 5 - 10 triệu
                                    </div>
                                    <div className={`budget-content__list--item budget-filter-list--item ${activeFilter === '10-20' ? 'active' : ''}`} onClick={(() => handleFilterClick('10-20'))}>
                                       Từ 10 - 20 triệu
                                    </div>
                                    <div className={`budget-content__list--item budget-filter-list--item ${activeFilter === 'bigger20' ? 'active' : ''}`} onClick={(() => handleFilterClick('bigger20'))}>
                                        Trên 20 triệu
                                    </div>
                                </div>
                            </div>
                            <div className="find-tour-content__filter--main-filter--option">
                                <div className="find-tour-content__filter--main-filter--title">
                                    <div className="find-tour-content__filter--main-filter--label">
                                        Điểm khởi hành:
                                    </div>
                                </div>
                                <div className="select-container">
                                    <Select
                                        options={locations} 
                                        value={selectedStartLocation} 
                                        onChange={handleLocationStartChange} 
                                        placeholder="Tất cả"
                                        isClearable 
                                        classNamePrefix="react-select"
                                    />
                                </div>
                            </div>
                            <div className="find-tour-content__filter--main-filter--option">
                                <div className="find-tour-content__filter--main-filter--title">
                                    <div className="find-tour-content__filter--main-filter--label">
                                        Điểm đến:
                                    </div>
                                </div>
                                <div className="select-container">
                                    <Select
                                        options={locations} 
                                        value={selectedEndLocation} 
                                        onChange={handleLocationEndChange} 
                                        placeholder="Tất cả"
                                        isClearable 
                                        classNamePrefix="react-select"
                                    />
                                </div>
                            </div>
                            <div className="find-tour-content__filter--main-filter--calendar">
                                <div className="find-tour-content__filter--main-filter--title">
                                    <div className="find-tour-content__filter--main-filter--label">
                                        Ngày đi:
                                    </div>
                                </div>
                                <div className="input-container">
                                    <DatePicker
                                        selected={endDate}
                                        onChange={(date) => setEndDate(date)}
                                        startDate={startDate}
                                        endDate={endDate}
                                        dateFormat="eee, dd 'tháng' MM" 
                                        locale={vi} 
                                    />
                                </div>
                            </div>
                            <div className="find-tour-content__filter--main-filter--option">
                                <div className="find-tour-content__filter--main-filter--title">
                                    <div className="find-tour-content__filter--main-filter--label">
                                        Phương tiện:
                                    </div>
                                </div>
                                <div className="tag-container">
                                    <button className='tag-container_item undefined'>Xe</button>
                                    <button className='tag-container_item undefined'>Máy bay</button>
                                </div>
                            </div>
                            <button className='btn btn-primary' style={{width: "100%"}}> Áp dụng</button>
                        </div>
                    </div> 
                    <div className="find-tour-content__list">
                        <div className="find-tour-content__list--header-result">

                            <div className="left-filter">
                                <p>Chúng tôi tìm thấy <span>{countTour}</span> chương trình tour cho quý khách</p>
                            </div>
                         
                            <div className="right-sort">
                                <span className="right-sort--label">Sắp xếp theo: </span>
                                <div className="right-sort--select">
                                    <Select
                                        options={sort}
                                        value={selectedSort}
                                        onChange={(selectedOption) => {
                                            handleSortChange(selectedOption); 
                                            fetchFilteredToursSort(selectedOption.value);
                                        }}
                                        isClearable
                                        classNamePrefix="react-select"
                                    />

                                </div>
                            </div>
                        </div>
                        <div className="find-tour-content__list--main">
                            {tours.map((tour, index) => (
                                <div className="card-filter-desktop" key={index}>
                                    <div className="card-filter-desktop__thumbnail">
                                        <img src={tour.tourImage[0]?.image_url} alt={tour?.name} />
                                    </div>
                                    <div className="card-filter-desktop__content">
                                        <div className="card-filter-desktop__content--info">
                                            <div className="card-filter-desktop__content--info--item flex-col-start">
                                                <div className="card-filter-desktop__content-header">
                                                    <div className="card-filter-desktop__content-header-wrapper">
                                                        <NavLink className="card-filter-desktop__content-header-title line-clamp line-clamp-2">
                                                            {tour.name}
                                                        </NavLink>
                                                    
                                                    </div>
                                                </div>
                                            </div>
                                            <div className="card-filter-desktop__content--info-tour">
                                                <div className="card-filter-desktop__content--info-tour--row">
                                                    <div className="card-filter-desktop__content--info-tour--item info-tour-tourCode">
                                                        <div className="card-filter-desktop__content--info-tour--item-wrapper">
                                                            <IoPricetagsOutline style={{marginTop: "3px"}}/>
                                                            <label className='card-filter-desktop__content--info-tour--item-wrapper-title'>Mã chương trình: </label>
                                                        </div>
                                                        <p className="card-filter-desktop__content--info-tour--item-wrapper-content">
                                                           {tour.program_code}
                                                        </p>
                                                    </div>
                                                    <div className="card-filter-desktop__content--info-tour--item info-tour-departure">
                                                        <div className="card-filter-desktop__content--info-tour--item-wrapper">
                                                            <GoLocation  style={{marginTop: "3px"}}/>
                                                            <label className='card-filter-desktop__content--info-tour--item-wrapper-title'>Khởi hành: </label>
                                                        </div>
                                                        <p className="card-filter-desktop__content--info-tour--item-wrapper-content">
                                                            {tour.departure_city}
                                                        </p>
                                                    </div>
                                                </div>
                                                <div className="card-filter-desktop__content--info-tour--row">
                                                    <div className="card-filter-desktop__content--info-tour--item info-tour-dayStayText info-tour-dayStayText--time">
                                                        <div className="card-filter-desktop__content--info-tour--item-wrapper">
                                                            <FcAlarmClock  style={{marginTop: "3px"}}/>
                                                            <label className='card-filter-desktop__content--info-tour--item-wrapper-title'>Thời gian: </label>
                                                        </div>
                                                        <p className="card-filter-desktop__content--info-tour--item-wrapper-content">
                                                            {tour.duration}
                                                        </p>
                                                    </div>
                                                    <div className="card-filter-desktop__content--info-tour--item info-tour-dayStayText info-tour-dayStayText--time">
                                                        {tour.tourChildren[0]?.transportion_start === "Máy bay" ? (
                                                            <>
                                                                <div className="card-filter-desktop__content--info-tour--item-wrapper">
                                                                    <TbPlaneInflight style={{marginTop: "3px"}}/>
                                                                    <label className='card-filter-desktop__content--info-tour--item-wrapper-title'>Phương tiện: </label>
                                                                </div>
                                                                <p className="card-filter-desktop__content--info-tour--item-wrapper-content">
                                                                    {tour.tourChildren[0]?.transportion_start}
                                                                </p>
                                                            </>
                                                        ) : (
                                                            <>
                                                                <div className="card-filter-desktop__content--info-tour--item-wrapper">
                                                                    <BiBus style={{marginTop: "3px"}}/>
                                                                    <label className='card-filter-desktop__content--info-tour--item-wrapper-title'>Phương tiện: </label>
                                                                </div>
                                                                <p className="card-filter-desktop__content--info-tour--item-wrapper-content">
                                                                    {tour.tourChildren[0]?.transportion_start}
                                                                </p>
                                                            </>
                                                        )}
                                                    
                                                    </div>
                                                </div>
                                                <div className="card-filter-desktop__content--info--item info-tour-calendar">
                                                    <div className="card-filter-desktop__content--info-tour--item info-tour-dayStayText info-tour-dayStayText--time">
                                                        <div className="card-filter-desktop__content--info-tour--item-wrapper">
                                                            <FaRegCalendarAlt   style={{marginTop: "3px"}}/>
                                                            <label className='card-filter-desktop__content--info-tour--item-wrapper-title'>Ngày khởi hành: </label>
                                                        </div>
                                                        <div className="list-item__container">
                                                            <DepartureDateSelector tour={tour}/>
                                                        </div>
                                                    </div>
                                                    
                                                </div>
                                            </div>
                                        </div>
                                        <div className="card-filter-desktop__content--price">
                                            <div className="card-filter-desktop__content--price-wrapper">
                                                <div className="card-filter-desktop__content--price-oldPrice">
                                                    <label>Giá từ: </label>
                                                </div>
                                                <div className="card-filter-desktop__content--price-newPrice">
                                                    <p>{(tour.price).toLocaleString("vi-VN")} vnđ</p>
                                                </div>
                                            </div>
                                            <div className="card-filter-desktop__content--price-btn">
                                                <NavLink className="button btn-md btn-primary">Xem chi tiết</NavLink>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            ))}
                        </div>
                        <div className='pagination'>
                            <button onClick={()=> onPageChange(currentPage - 1)} disabled={currentPage === 1}><FaArrowLeft /></button>
                            <span>{currentPage}</span>
                            <button onClick={()=> onPageChange(currentPage + 1)} disabled={currentPage === totalPage}><FaArrowRight /></button>
                        </div>
                    </div> 
                </div>
            </section>
        </>
    )
}

export default Tours
