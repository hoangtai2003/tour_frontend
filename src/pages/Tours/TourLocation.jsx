import React, { useState, useEffect, useContext } from 'react'
import Breadcrumbs from '../../components/Breadcrumb/Breadcrumbs'
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
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
import { GiCommercialAirplane } from "react-icons/gi";
import { NavLink, useParams } from 'react-router-dom'
import notTour from '../../assets/images/tour/notour.png'
import { vi } from 'date-fns/locale';
const TourLocation = () => {
    const [startDate, setStartDate] = useState(new Date());
    const [searchTour, setSearchTour] =useState([])
    const [locations, setLocations] = useState([]);
    const [selectedStartLocation, setSelectedStartLocation] = useState(null);
    const [selectedEndLocation, setSelectedEndLocation] = useState(null);
    const [selectedSort, setSelectedSort] = useState(null);
    const [activeFilter, setActiveFilter] = useState(null);
    const [activeTransportation, setActiveTransportation] = useState(null)
    const [countTour, setCountTour] = useState(0)
    const { url } = useContext(StoreContext)
    const { slug } = useParams()
    const [tourLocation, setTourLocation] = useState([])
    useEffect(() => {
        document.title = "Hệ thống bán tour trực tuyến | Du lịch Việt"
        window.scroll(0,0)
    }, [])
    
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

    useEffect(() => {
        const fetchTourLoation = async() => {
            try {
                const response = await axios.get(`${url}/location/slug-location/${slug}`)
                setTourLocation(response.data.data)
                setCountTour(response.data.data.total_tours)
            } catch (error) {
                console.error(error);
            }
        }
        fetchTourLoation()
    }, [url, slug])
    const fetchFilteredTours = async (price) => {
        try {
            const response = await axios.get(`${url}/tours/price/filter-price`, {
                params: { price }
            });
            
            setSearchTour(response.data.data);
            setCountTour(response.data.count)
        } catch (error) {
            console.error("Lỗi khi lọc tour theo giá:", error);
        }
    };
    const fetchFilterAll = async (price, departure_city, name, start_date, transportation) => {
        try {
            const response = await axios.get(`${url}/tours/search/filter-tour`, {
                params: {price, departure_city, name, start_date, transportation}
            });
            setSearchTour(response.data.data)
            setCountTour(response.data.count)
        } catch (error) {
            
        }
    }
    const fetchFilteredToursSort = async(sortPrice) => {
        try {
            const response = await axios.get(`${url}/tours/price/filter-sortPrice`, {
                params: { sortPrice }
            });
            setSearchTour(response.data.data)
            setCountTour(response.data.count)
           
        } catch (error) {
            console.error("Lỗi khi lọc tour:", error);
        }
    }
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
    ]
    const handleFilterClick = (filterPrice) => {
        fetchFilteredTours(filterPrice);
        setActiveFilter(filterPrice);
      };
    const handleClearFilter = () => {
        setActiveFilter(null); 
        setActiveTransportation(null)
    };
    const handleClickButton = (transportation) => {
        setActiveTransportation(transportation)
    }
    const handleDateChange = (date) => {
        const adjustedDate = new Date(date.getTime() - date.getTimezoneOffset() * 60000);
        setStartDate(adjustedDate);
    };
    const applyFilters = () => {
        const price = activeFilter; 
        const departure_city = selectedStartLocation ? selectedStartLocation.label : null; 
        const name = selectedEndLocation ? selectedEndLocation.label : null; 
        const start_date = startDate ? startDate.toISOString().split('T')[0] : null; 
        const transportation = activeTransportation; 
        
        fetchFilterAll(price, departure_city, name, start_date, transportation);
    };
    
    return (
        <>
            <Breadcrumbs pagename="Tours" />
            <section className='find-tour-header section'>
                <div className='find-tour-header__container section-container'>
                    <div className="breadcrumb-container">
                        <div>
                            <NavLink className="normal-link" to="/home">Điểm đến / </NavLink>
                        </div>
                        <div>
                            <NavLink className="active-link" to="/home">Du lịch {tourLocation.location?.name}</NavLink>
                        </div>
                    </div>
                    <div className='find-tour-header__title '>
                        <h1 className='find-tour-header__title'>
                            Du lịch {tourLocation.location?.name}
                        </h1>
                        <p style={{overflow: "hidden", transition: 'height 0.3s'}} dangerouslySetInnerHTML={{ __html: tourLocation.location?.description}}></p>
                    </div>
                </div>
            </section>
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
                                        selected={startDate}
                                        onChange={handleDateChange}
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
                                    {activeTransportation ? (
                                        <span className="pointer" onClick={handleClearFilter}>Xóa</span>
                                    ) : null}
                                </div>
                                <div className="tag-container">
                                    <button className={`tag-container_item undefined ${activeTransportation === "Xe" ? "active" : '' }`} onClick={() => handleClickButton("Xe")}>Xe</button>
                                    <button className={`tag-container_item undefined  ${activeTransportation === "Máy bay" ? "active" : '' }`} onClick={() => handleClickButton("Máy bay")}>Máy bay</button>
                                </div>
                            </div>
                            <button className='btn btn-primary' style={{width: "100%"}} onClick={applyFilters}> Áp dụng</button>
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
                        {countTour === 0 ? (
                            <>
                                <div className='filter-noTour'>
                                    <img src={notTour} alt="" style={{width: "80%",marginLeft: '300px', background: "transparent"}}/>
                                </div>
                            </>
                            
                        ) : (
                            <>
                                <div className="find-tour-content__list--main">
                                    {tourLocation.location?.tours.map((tour, index) => (
                                        <div className="card-filter-desktop" key={index}>
                                            <div className="card-filter-desktop__thumbnail">
                                                <img src={tour.tourImage[0]?.image_url} alt={tour?.name} />
                                            </div>
                                            <div className="card-filter-desktop__content">
                                                <div className="card-filter-desktop__content--info">
                                                    <div className="card-filter-desktop__content--info--item flex-col-start">
                                                        <div className="card-filter-desktop__content-header">
                                                            <div className="card-filter-desktop__content-header-wrapper">
                                                                <NavLink className="card-filter-desktop__content-header-title line-clamp line-clamp-2" to={`/chuong-trinh/${tour.tour_slug}`}>
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
                                                                {tour.transportation=== "Máy bay" ? (
                                                                    <>
                                                                        <div className="card-filter-desktop__content--info-tour--item-wrapper">
                                                                            <GiCommercialAirplane  style={{marginTop: "3px"}}/>
                                                                            <label className='card-filter-desktop__content--info-tour--item-wrapper-title'>Phương tiện: </label>
                                                                        </div>
                                                                        <p className="card-filter-desktop__content--info-tour--item-wrapper-content">
                                                                            {tour.transportation}
                                                                        </p>
                                                                    </>
                                                                ) : tour.transportation=== "Xe" ? (
                                                                    <>
                                                                        <div className="card-filter-desktop__content--info-tour--item-wrapper">
                                                                            <BiBus style={{marginTop: "3px"}}/>
                                                                            <label className='card-filter-desktop__content--info-tour--item-wrapper-title'>Phương tiện: </label>
                                                                        </div>
                                                                        <p className="card-filter-desktop__content--info-tour--item-wrapper-content">
                                                                            {tour.transportation}
                                                                        </p>
                                                                    </>
                                                                ): ""}
                                                            
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
                                                        <NavLink className="button btn-md btn-primary" to={`/tours/${tour.id}`}>Xem chi tiết</NavLink>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                    ))}
                                </div>
                            </>
                        )}
                    </div> 
                </div>
            </section>
        </>
    )
}

export default TourLocation
