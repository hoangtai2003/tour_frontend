import React from "react";
import { Carousel } from "react-bootstrap";
import sliderImg from "../../assets/images/slider/slider_1.jpg";
import sliderImg1 from "../../assets/images/slider/slider_2.jpg";
import sliderImg2 from "../../assets/images/slider/slider_3.jpg";
import "./banner.css"

const Banner = () => {
    return (
        <>
            <section className="slider">
                <Carousel variant="dark">
                    <Carousel.Item>
                        <img src={sliderImg} className="d-block w-100" alt="First slide" />
                        <Carousel.Caption>
                        <div className="slider_des">
                            <h5 className="heading">
                            Khám phá địa điểm <span>yêu thích của bạn với chúng tôi</span>
                            </h5>
                            <p className="sub_text">
                                Du lịch đến bất cứ nơi nào bạn chỉ cần liên hệ với chúng tôi!
                            </p>
                        </div>
                        </Carousel.Caption>
                    </Carousel.Item>

                    <Carousel.Item>
                        <img src={sliderImg1} className="d-block w-100" alt="First slide" />
                        <Carousel.Caption>
                        <div className="slider_des">
                            <h5 className="heading">
                            Với chúng tôi, <span>mỗi hành trình là một câu chuyện </span>
                            </h5>
                            <p className="sub_text">
                            Bắt đầu viết nên câu chuyện của bạn hôm nay!
                            </p>
                        </div>
                        </Carousel.Caption>
                    </Carousel.Item>
                    <Carousel.Item>
                        <img src={sliderImg2} className="d-block w-100" alt="First slide" />
                        <Carousel.Caption>
                        <div className="slider_des">
                            <h5 className="heading">
                            Bước vào thế giới kỳ diệu <span>cùng những chuyến đi tuyệt vời</span>
                            </h5>
                            <p className="sub_text">
                            Khám phá, thư giãn, và tận hưởng mỗi khoảnh khắc!
                            </p>
                        </div>
                        </Carousel.Caption>
                    </Carousel.Item>
                </Carousel>
            </section>
        </>
    );
};

export default Banner;