import React from 'react'
import Banner from '../../components/Banner/Banner'
import AdvanceSearch from '../../components/AdvanceSearch/AdvanceSearch'
import Features from '../../components/Features/Features'
import { Container, Row, Col, Card } from 'react-bootstrap'
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import "./home.css"

import tour4 from "../../assets/images/tour/Tokyo.png";
import tour5 from "../../assets/images/tour/bali-1.png";
import tour6 from "../../assets/images/tour/bangkok.png";
import tour7 from "../../assets/images/tour/cancun.png";
import tour8 from "../../assets/images/tour/nah-trang.png";
import tour9 from "../../assets/images/tour/phuket.png";
import tour10 from "../../assets/images/tour/paris.png";
import tour11 from "../../assets/images/tour/malaysia.png";
const Home = () => {
    var settings = {
        dots: false,
        infinite: true,
        autoplay: true,
        slidesToShow: 4,
        slidesToScroll: 1,
        
        responsive: [
            {
                breakpoint: 1024,
                settings: {
                    slidesToShow: 4,
                    slidesToScroll: 1,
                    infinite: false,
                    dots: true,
                    autoplay: true
                },
            },
            {
                breakpoint: 991,
                settings: {
                    slidesToShow: 3,
                    slidesToScroll: 3,
                    infinite: false,
                    dots: true,
                },
            },
            {
                breakpoint: 600,
                settings: {
                    slidesToShow: 2,
                    slidesToScroll: 2,
                    autoplay: true,
                    prevArrow:false,
                    nextArrow:false,
                },
            },
            {
                breakpoint: 480,
                settings: {
                    slidesToShow: 1,
                    slidesToScroll: 1,
                    prevArrow:false,
                    nextArrow:false,
                },
            },
        ],
    };
    const destinations = [
        {
            id: 0,
            name: "Bali",
            tours: "5 tours and activities",
            image: tour5,
            link: "tour-name",
            shortDes: "",
        },
        {
            id: 1,
            name: "Tokyo",
            tours: "9 tours and activities",
            image: tour4,
            link: "tour-name",
        },
        
        {
            id: 2,
            name: "Bangkok",
            tours: "5 tours and activities",
            image: tour6,
            link: "tour-name",
        },
        
        {
            id: 3,
            name: "Cancun",
            tours: "4 tours and activities",
            image: tour7,
            link: "tour-name",
        },
        {
            id: 4,
            name: "Nha Trang",
            tours: "9 tours and activities ",
            image: tour8,
            link: "tour-name",
        },
        {
            id: 5,
            name: "Phuket",
            tours: "4 tours and activities",
            image: tour9,
            link: "tour-name",
        },
        {
            id: 6,
            name: "Paris",
            tours: "6 tours and activities",
            image: tour10,
            link: "tour-name",
        },
        {
            id: 7,
            name: "Malaysia",
            tours: "4 tours and activities",
            image: tour11,
            link: "tour-name",
        },
    ]
    return (
        <>
            <Banner />
            <AdvanceSearch />
            <Features />
            <section className='tours_section slick_slider'>
                <Container>
                    <Row>
                        <Col md={12}>
                            <div className="main_heading">
                                <h1>Top Destination For Your Next Vacation</h1>
                            </div>
                        </Col>
                    </Row>
                    <Row>
                        <Col md={12}>
                            <Slider {... settings}>
                                {destinations.map((destination, index) => {
                                        return (
                                            <div className="img-box" key={index}>
                                                <Card>
                                                    <Card.Img
                                                        variant='top'
                                                        src={destination.image}
                                                        className="img-fluid"
                                                        alt={destination.name}
                                                    />
                                                    <Card.Title>{destination.name}</Card.Title>
                                                    <span className='tours'>{destination.tours}</span>
                                                </Card>
                                            </div>
                                        )
                                    })}
                            </Slider>
                        </Col>
                    </Row>
                </Container>
            </section>
        </>

    )
}

export default Home