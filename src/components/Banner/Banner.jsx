import React from 'react'
import Carousel from 'react-bootstrap/Carousel';
import sliderImg1 from "../../assets/images/slider/1.png"
import sliderImg2 from "../../assets/images/slider/2.png"
import sliderImg3 from "../../assets/images/slider/3.png"
const Banner = () => {
    return (
        <>
            <section className='slider'>
                <Carousel variant='dark'>
                    <Carousel.Item>
                        <img src={sliderImg1} className='d-block w-100' alt="First slide" />
                        <Carousel.Caption>
                            <div className="slider_des">
                                <h5 className="heading">Hoàng Đức Tài</h5> <span>EXPLORE WORD</span>
                                <p className="sub_text">
                                    Nulla vitae elit libero, a pharetra augue mollis interdum.
                                </p>

                            </div>
                        </Carousel.Caption>
                    </Carousel.Item>
                    <Carousel.Item>
                        <img src={sliderImg2} className='d-block w-100' alt="Second slide" />
                        <Carousel.Caption>
                        <h3>Second slide label</h3>
                        <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit.</p>
                        </Carousel.Caption>
                    </Carousel.Item>
                    <Carousel.Item>
                        <img src={sliderImg3} className='d-block w-100' alt="Third slide" />
                        <Carousel.Caption>
                        </Carousel.Caption>
                    </Carousel.Item>
                </Carousel>
            </section>
        </>

    )
}

export default Banner