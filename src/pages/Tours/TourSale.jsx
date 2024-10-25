import React, { useContext, useEffect, useState } from 'react'
import Breadcrumbs from '../../components/Breadcrumb/Breadcrumbs'
import PopularCard from '../../components/Cards/PopularCard'
import axios from 'axios'
import { StoreContext } from '../../components/Context/StoreContext'
import { Col, Container, Row } from 'react-bootstrap'
import { FaArrowLeft } from "react-icons/fa";
import { NavLink } from 'react-router-dom'
const TourSale = () => {
    useEffect(() => {
        document.title = "Hệ thống bán tour trực tuyến | Du lịch Việt"
        window.scroll(0,0)
    }, [])
    const [tours, setTour] = useState([])
    const { url } = useContext(StoreContext)
    useEffect(() => {
        const fetchTour = async() => {
            const response  = await axios.get(`${url}/tours/price-sale/tourBySale`)
            setTour(response.data.data)
        }
        fetchTour();
    }, [url])
    return (
        <>
            <Breadcrumbs  />
            <div className="main filter-main">
                <div className='section page-main-header'>
                    <div className="page-main-header__container section-container">
                        <div className="page-main-header__container--header">
                            <NavLink to="/home" className='search-flights-header__back-button'>
                                <FaArrowLeft />
                                <span>Quay lại</span>
                            </NavLink>
                        </div>
                        <div className="page-main-header__title animate__fadeIn animate__animated">
                            <h1>Tour giờ chót</h1>
                            <p className='limited-height' style={{overflow: "hidden", transition: "height 0.3s"}}>
                            Du lịch giờ chót của DulichViet luôn đem đến cho Quý khách những niềm bất ngờ thú vị. Đó là những đường tour cuốn hút với mức giá đầy hấp dẫn, khuyến mại vào thời điểm cận ngày khởi hành. Với những giảm giá rất ưu đãi phối hợp với hệ thống đối tác lớn mạnh, DulichViet cho Quý khách cơ hội được tận hưởng những dịch vụ chất lượng vàng không đổi từ công ty lữ hành uy tín nhất Việt Nam.
                            </p>
                        </div>
                    </div>
                </div>
                <section className='tour_list'>
                    <Container>
                        <Row>
                            {tours.map((popular, index) => (
                                <Col md={3} sm={6} xs={12} className='mb-5' key={index}>
                                    <PopularCard popular={popular} />
                                </Col>
                            ))}
                        </Row>
                    </Container>
                </section>
            </div>
        </>

    )
}

export default TourSale
