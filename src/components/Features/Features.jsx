import React from 'react'
import "./features.css"
import feature1 from "../../assets/images/feature/beach-umbrella.png";
import feature2 from "../../assets/images/feature/deal.png";
import feature3 from "../../assets/images/feature/location.png";
import feature4 from "../../assets/images/feature/medal.png";
import { Container, Row, Col, Card } from 'react-bootstrap';
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
const Features = () => {
    var settings = {
        dots: false,
        infinite: true,
        autoplay:false,
        autoplaySpeed:1500,
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
    
    const featureList = [
        {
          id: 0,
          image: feature1,
          title: "Khám phá những khả năng",
          des: "Với gần nửa triệu điểm tham quan, khách sạn, v.v., bạn chắc chắn sẽ tìm thấy niềm vui.",
        },
        {
          id: 1,
          image: feature2,
          title: "Tận hưởng ưu đãi & thú vui",
          des: "Hoạt động chất lượng. Giá cả tuyệt vời. Ngoài ra, hãy kiếm tín dụng để tiết kiệm nhiều hơn.",
        },
        {
          id: 2,
          image: feature3,
          title: "Khám phá thật dễ dàng",
          des: "Đặt chỗ vào phút cuối, bỏ qua hàng &amp; được hủy miễn phí để khám phá dễ dàng hơn.",
        },
    
        {
          id: 3,
          image: feature4,
          title: "Du lịch bạn có thể tin tưởng",
          des: "Đọc đánh giá và nhận hỗ trợ khách hàng đáng tin cậy. Chúng tôi luôn bên bạn ở mọi bước.",
        },
      ];
    
    return (
        <>
            <section className="feature-section">
                <Container>
                    <Row>
                        <Col md={12}>
                            <Slider {... settings}>
                                {featureList.map((feature, index) => {
                                        return (
                                            <Card key={index}>
                                                <Card.Img
                                                    variant='top'
                                                    src={feature.image}
                                                    className="img-fluid"
                                                    alt={feature.title}
                                                />
                                                <Card.Title>{feature.title}</Card.Title>
                                                <Card.Text>{feature.des}</Card.Text>
                                            </Card>
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

export default Features