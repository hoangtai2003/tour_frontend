import React, { useContext, useEffect, useState } from 'react'
import Banner from '../../components/Banner/Banner'
import AdvanceSearch from '../../components/AdvanceSearch/AdvanceSearch'
import Features from '../../components/Features/Features'
import { Container, Row, Col} from 'react-bootstrap'
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import "./home.css"
import video from '../../assets/images/video.mp4'
import MasonryImageGallery from '../../components/Gallery/MasonryImageGallery'
import Testimonials from '../../components/Testimonial/Testimonial'
import Cards from '../../components/Cards/Cards'
import PopularCard from '../../components/Cards/PopularCard'
import axios from 'axios'
import { StoreContext } from '../../components/Context/StoreContext'
import Newsletter from '../../components/Newsletter/Newsletter'
import { NavLink } from 'react-router-dom'
const Home = () => {
    const [tours, setTour] = useState([])
    const [countTourByLocation, setCountTourByLocation] = useState([])
    const { url } = useContext(StoreContext)
    useEffect(() => {
        document.title = "Hệ thống bán tour trực tuyến | Du lịch Việt"
        window.scroll(0,0)
    }, [])
    var settings = {
        dots: false,
        infinite: true,
        autoplay: true,
        slidesToShow: 5,
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
    


    useEffect(() => {
        const fetchTour = async() => {
            const response  = await axios.get(`${url}/tours/price-sale/tourBySale`)
            setTour(response.data.data)
        }
        fetchTour();
    }, [url])

    useEffect(() => {
        const fetchCountLocation = async() => {
            const response = await axios.get(`${url}/tours/tourByLocation/countTour`)
            setCountTourByLocation(response.data.data)
        }
        fetchCountLocation()
    }, [url])
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
                                <h1>Điểm đến hàng đầu dành cho bạn</h1>
                            </div>
                        </Col>
                    </Row>
                    <Row>
                        <Col md={12}>
                            <Slider {... settings}>
                                {countTourByLocation.map((destination, index) => {
                                        return (
                                            <Cards destination={destination}  key={index} slug={destination.location.loca_slug}/>
                                        )
                                    })}
                            </Slider>
                        </Col>
                    </Row>
                </Container>
            </section>
            <section className='newsletter'>
                <Container>
                    <Row>
                        <Col md={12}>
                            <div className="main_heading">
                                <h1>Bài đăng gần đây</h1>
                                
                            </div>
                        </Col>
                    </Row>
                    <Row>
                        <Newsletter />
                    </Row>
                </Container>
            </section>
            <section className='tour_list'>
                <Container>
                    <Row>
                        <Col md={12}>
                            <div className="main_heading">
                                <h1>Ưu đãi giờ chót</h1>
                                <div className="horizontal-divider"></div>
                                <p>Nhanh tay nắm bắt cơ hội giảm giá cuối cùng. Đặt ngay để không bỏ lỡ!</p>
                            </div>
                        </Col>
                    </Row>
                    <Row>
                        {tours.slice(0,4).map((popular, index) => (
                            <Col md={3} sm={6} xs={12} className='mb-5' key={index}>
                                <PopularCard popular={popular} />
                            </Col>
                        ))}
                    </Row>
                    <Row>
                        <div className="home-lastHour-section__paginate">
                            <NavLink to='/du-lich-gio-chot' className='button button--viewAll'>Xem tất cả</NavLink>
                        </div>
                    </Row>
                    
                </Container>
            </section>
            <section className='testimonials'>
                <Container>
                    <Row>
                        <Col md={12}>
                            <div className="main_heading">
                                <h1>Đánh giá nổi bật</h1>
                            </div>
                        </Col>
                    </Row>
                    <Row>
                        <Col md={12}>
                            <Testimonials />
                        </Col>
                    </Row>
                </Container>
            </section>
            <section className='gallery'>
                <Container>
                    <Row>
                        <Col md={12}>
                            <div className="main_heading">
                                <h1>Thư viện ảnh</h1>
                            </div>
                        </Col>
                    </Row>
                    <Row>
                         <MasonryImageGallery />
                    </Row>
                </Container>
            </section>

           
            <section className="video_introduct">
                <video src={video} muted autoPlay loop type="video/mp4"></video>
                <div className="animated_text_container">
                    <h2 className="animated_text">Khám phá thế giới <span>cùng chúng tôi</span></h2>
                    <p className="description">Những hành trình kỳ diệu đang chờ đợi bạn, hãy sẵn sàng cho chuyến phiêu lưu tiếp theo!</p>
                    <button className="cta_button">Liên hệ qua Messager của chúng tôi</button>
                </div>
            </section>
        </>

    )
}

export default Home