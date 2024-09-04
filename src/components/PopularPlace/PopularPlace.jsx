import React from 'react';
import "./popular-place.css";
import { Container, Row, Col, Card } from 'react-bootstrap';


import Singapore from "../../assets/images/popular/Discover Singapore.png";
import Kiwiana from "../../assets/images/popular/Kiwiana Panorama.jpg";
import Quito from "../../assets/images/popular/Anchorage To Quito.jpg";
import Cuzco from "../../assets/images/popular/Cuzco To Anchorage.jpg";
import Ushuaia from "../../assets/images/popular/Anchorage To Ushuaia.jpg";
import Santiago from "../../assets/images/popular/Anchorage To Santiago.jpg";
import Explorer from "../../assets/images/popular/LA Explorer.jpg";
const PopularPlace = () => {
    const populars = [
        {
            id: 0,
            title: "Sa Pa - Lào Cai - Bái Đính - Tràng An - Hạ Long - Yên Tử - Hà Nội",
            image: Singapore,
            location: "TP. Hồ Chí Minh",
            days: "5 days - 4 nights",
            price: 500000,
            afterDiscount: 400000, 
            availableSeats: 5,
            totalSeats: 15,
            departureDate: "2021-07-14",
            confirmed: 10,
            registered: 6
        },
        {
            id: 1,
            title: "Sa Pa - Lào Cai - Bái Đính - Tràng An - Hạ Long - Yên Tử - Hà Nội",
            image: Kiwiana,
            location: "TP. Hồ Chí Minh",
            days: "5 days - 4 nights",
            price: 500000,
            afterDiscount: "", 
            availableSeats: 5,
            totalSeats: 15,
            departureDate: "2021-07-14",
            confirmed: 10,
            registered: 6
        },
        {
            id: 2,
            title: "Sa Pa - Lào Cai - Bái Đính - Tràng An - Hạ Long - Yên Tử - Hà Nội",
            image: Quito,
            location: "TP. Hồ Chí Minh",
            days: "5 days - 4 nights",
            price: 500000,
            afterDiscount: "", 
            availableSeats: 5,
            totalSeats: 15,
            departureDate: "2021-07-14",
            confirmed: 10,
            registered: 6
        },
        {
            id: 3,
            title: "Sa Pa - Lào Cai - Bái Đính - Tràng An - Hạ Long - Yên Tử - Hà Nội",
            image: Cuzco,
            location: "TP. Hồ Chí Minh",
            days: "5 days - 4 nights",
            price: 500000,
            afterDiscount: "", 
            availableSeats: 5,
            totalSeats: 15,
            departureDate: "2021-07-14",
            confirmed: 10,
            registered: 6
        },
        {
            id: 4,
            title: "Sa Pa - Lào Cai - Bái Đính - Tràng An - Hạ Long - Yên Tử - Hà Nội",
            image: Ushuaia,
            location: "TP. Hồ Chí Minh",
            days: "5 days - 4 nights",
            price: 500000,
            afterDiscount: "", 
            availableSeats: 5,
            totalSeats: 15,
            departureDate: "2021-07-14",
            confirmed: 10,
            registered: 6
        },
        {
            id: 5,
            title: "Sa Pa - Lào Cai - Bái Đính - Tràng An - Hạ Long - Yên Tử - Hà Nội",
            image: Santiago,
            location: "TP. Hồ Chí Minh",
            days: "5 days - 4 nights",
            price: 500000,
            afterDiscount: 400000, 
            availableSeats: 5,
            totalSeats: 15,
            departureDate: "2021-07-14",
            confirmed: 10,
            registered: 6
        },
        {
            id: 6,
            title: "Sa Pa - Lào Cai - Bái Đính - Tràng An - Hạ Long - Yên Tử - Hà Nội",
            image: Explorer,
            location: "TP. Hồ Chí Minh",
            days: "5 days - 4 nights",
            price: 500000,
            afterDiscount: "", 
            availableSeats: 5,
            totalSeats: 15,
            departureDate: "2021-07-14",
            confirmed: 10,
            registered: 6
        },
        {
            id: 7,
            title: "Sa Pa - Lào Cai - Bái Đính - Tràng An - Hạ Long - Yên Tử - Hà Nội",
            image: Singapore,
            location: "TP. Hồ Chí Minh",
            days: "5 days - 4 nights",
            price: 500000,
            afterDiscount: "", 
            availableSeats: 5,
            totalSeats: 15,
            departureDate: "2021-07-14",
            confirmed: 10,
            registered: 6
        },
        
    ];

    return (
        <section className='popular'>
            <Container>
                <Row>
                    <Col md={12}>
                        <div className="main_heading">
                            <h1>Tour du lịch mới nhất của chúng tôi</h1>
                        </div>
                    </Col>
                </Row>
                <Row>
                    {populars.slice(0,8).map((popular, index) => (
                        <Col md={3} sm={6} xs={12} className='mb-5' key={index}>
                            <Card className='tour-card rounded-2 shadow-sm'>
                                {popular.afterDiscount ? (
                                    <div className="price-section">
                                        <div className="sale-tag">Sale 20%</div>
                                        <div className="price-info">
                                            <span className="discounted-price">
                                                {popular.afterDiscount.toLocaleString()} vnd/người
                                            </span>
                                            <span className="original-price">
                                                {popular.price.toLocaleString()} vnd/người
                                            </span>
                                        </div>
                                    </div>
                                ) : (
                                    <div className="price-section">
                                        <div className="price-info">
                                            <span className="only-price">
                                                {popular.price.toLocaleString()} vnd/người
                                            </span>
                                        </div>
                                    </div>
                                )}
                                <Card.Img
                                    variant='top'
                                    src={popular.image}
                                    className="img-fluid"
                                    alt={popular.title}
                                />
                                <Card.Body>
                                    <h5 className="days">{popular.days}</h5>
                                    <Card.Title>{popular.title}</Card.Title>
                                    <Card.Text>
                                        <i className="bi bi-geo-alt"></i>
                                        <span className="text">Từ : {popular.location}</span>
                                    </Card.Text>
                                    <Card.Text>
                                        <i className="bi bi-calendar"></i>
                                        Khởi hành : {popular.departureDate}
                                    </Card.Text>
                                    <Card.Text>
                                        <i className="bi bi-people-fill"></i>
                                        Số chỗ : {popular.totalSeats} - Còn trống : {popular.availableSeats}
                                    </Card.Text>
                                    <Card.Text>
                                        <i className="bi bi-check-circle-fill"></i>
                                        Đã xác nhận : {popular.confirmed}
                                    </Card.Text>
                                    <Card.Text>
                                        <i className="bi bi-person-check-fill"></i>
                                        Số người đăng ký : {popular.registered}
                                    </Card.Text>
                                </Card.Body>
                            </Card>
                        </Col>
                    ))}
                </Row>
            </Container>
        </section>
    );
}

export default PopularPlace;
