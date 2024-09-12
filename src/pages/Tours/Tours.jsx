import React, { useState, useEffect } from 'react'
import Breadcrumbs from '../../components/Breadcrumb/Breadcrumbs'
import { Container, Row, Col, Offcanvas } from 'react-bootstrap'
import PopularCard from '../../components/Cards/PopularCard'
import Filters from './Filters'
import './tour.css'
import axios from 'axios'
const Tours = () => {
    const [show, setShow] = useState(false);
    const [currentPage, setCurrentPage] = useState(1);
    const [tours, setTour] = useState([])
    const handleClose = () => setShow(false);
    const handleShow = () => setShow(true);
    useEffect(() => {
        document.title = "Hệ thống bán tour trực tuyến | Du lịch Việt"
    }, [])
    const fetchTour = async() => {
        const response  = await axios.get(`http://localhost:4000/api/v1/tours?page=${currentPage}`)
        setTour(response.data.data)
    }
    useEffect(() => {
        fetchTour()
    }, [currentPage])
    return (
        <>
            <Breadcrumbs title="Tours" pagename="Tours" />
            <section className="py-5 tour_list">
                <Container>
                    <Row>
                        <Col xl='3' lg='4' md='12' sm='12'>
                            <div className="d-lg-none d-block">
                                <button className="primaryBtn mb-4" onClick={handleShow}>
                                    <i className='bi bi-funnel'></i>Filters
                                </button>
                            </div>
                            <div className="filters d-lg-block d-none"><Filters /></div>
                            
                        </Col>
                        <Col xl='9' lg='8' md='12' sm='12'>
                            <Row>
                                {tours.map((popular, index) => (
                                    <Col xl={4} lg={6} md={6} sm={6} className='mb-5' key={index}>
                                        <PopularCard popular={popular} />
                                    </Col>
                                ))}
                            </Row>

                        </Col>
                    </Row>
                </Container>
            </section>
            <Offcanvas show={show} onHide={handleClose}>
                <Offcanvas.Header closeButton>
                <Offcanvas.Title>Filters</Offcanvas.Title>
                </Offcanvas.Header>
                <Offcanvas.Body><Filters /></Offcanvas.Body>
            </Offcanvas>
        </>
    )
}

export default Tours
