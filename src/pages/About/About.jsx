import React, { useEffect } from 'react'
import "./about.css"
import Breadcrumbs from '../../components/Breadcrumb/Breadcrumbs'
import { Container, Row, Col, Card } from 'react-bootstrap'
import aboutImg from "../../assets/images/about/aboutimg.png"
import icons1 from "../../assets/images/icons/destination.png"
import icons2 from "../../assets/images/icons/best-price.png"
import icons3 from "../../assets/images/icons/quick.png"
const About = () => {
    useEffect(() => {
        document.title = "Hệ thống bán tour trực tuyến | Du lịch Việt"
        window.scroll(0, 0);
    }, [])
  return (
    <>
        <Breadcrumbs title="Giới thiệu" pagename="Giới thiệu" />
        <div className="py-5">
            <Container>
                <Row>
                    <Col md={8}>
                        <div className="about-content">
                            <div className="about-image position-relative">
                                <img src={aboutImg} alt="about" className='img-fluid rounded-5'/>
                                <div className="about-image-content position-absolute top-50 end-0 p-md-4 p-3 rounded-5 shadow-sm">
                                    <h3 className='h2 fw-bold  text-white'>Trải Nghiệm Du Lịch Tuyệt Vời Cùng Chúng Tôi</h3>
                                </div>

                            </div>
                        </div>
                        <h2 className='h2 font-bold pt-4 pb-2'>Dịch Vụ Du Lịch Hàng Đầu Đến Từ Chúng Tôi</h2>
                        <p className='body-text mb-4'>
                        Chúng tôi tự hào là công ty du lịch hàng đầu, mang đến cho khách hàng những trải nghiệm độc đáo và tuyệt vời. Với nhiều năm kinh nghiệm trong ngành, chúng tôi không chỉ giúp bạn khám phá những điểm đến hấp dẫn, mà còn đảm bảo sự an toàn, thoải mái trong mỗi hành trình.
                        </p>
                        <p className='body-text mb-4'>
                        "Chúng tôi cung cấp đa dạng các dịch vụ du lịch bao gồm tour trong nước, quốc tế, và các tour đặc biệt theo yêu cầu. Bất kể bạn yêu thích thiên nhiên hoang dã hay muốn tận hưởng không gian nghỉ dưỡng sang trọng, chúng tôi đều có những lựa chọn phù hợp.
                        </p>
                        <p className='body-text mb-4'>
                        Chất lượng dịch vụ luôn là ưu tiên hàng đầu của chúng tôi. Với đội ngũ hướng dẫn viên chuyên nghiệp, chúng tôi cam kết mang đến những trải nghiệm tuyệt vời, đồng thời đảm bảo giá cả cạnh tranh và hỗ trợ khách hàng 24/7.
                        </p>
                    </Col>
                    <Col md={4}>
                        <Card className='border-0 shadow-sm rounded-3 mb-4 card '>
                            <Card.Body className='text-center card-body'>
                                <div className='d-flex justify-content-center align-item-search my-2'>
                                    <div className="rounded-circle bg-light shadow-sm bg-opacity-10 p-2 ">
                                        <img src={icons1} alt="icon" className='img-fluid' />
                                    </div>
                                </div>
                                <Card.Title className='fw-bold h5 card-title h5'>50+ Destination</Card.Title>
                                <p className='mb-2 body-text'>
                                Chúng tôi tự hào mang đến cho bạn hơn 50 điểm đến độc đáo, từ các bãi biển nhiệt đới đến các thành phố lịch sử và văn hóa nổi tiếng.
                                </p>
                            </Card.Body>
                        </Card>
                        <Card className='border-0 shadow-sm rounded-3 mb-4 card '>
                            <Card.Body className='text-center card-body'>
                                <div className='d-flex justify-content-center align-item-search my-2'>
                                    <div className="rounded-circle bg-light shadow-sm bg-opacity-10 p-2 ">
                                        <img src={icons2} alt="icon" className='img-fluid' />
                                    </div>
                                </div>
                                <Card.Title className='fw-bold h5 card-title h5'>Best Price In The Industry</Card.Title>
                                <p className='mb-2 body-text'>
                                Với mạng lưới đối tác rộng khắp và chiến lược tối ưu hóa chi phí, chúng tôi đảm bảo mang lại cho bạn giá tốt nhất trên thị trường mà vẫn giữ được chất lượng cao.
                                </p>
                            </Card.Body>
                        </Card>
                        <Card className='border-0 shadow-sm rounded-3 mb-4 card '>
                            <Card.Body className='text-center card-body'>
                                <div className='d-flex justify-content-center align-item-search my-2'>
                                    <div className="rounded-circle bg-light shadow-sm bg-opacity-10 p-2 ">
                                        <img src={icons3} alt="icon" className='img-fluid' />
                                    </div>
                                </div>
                                <Card.Title className='fw-bold h5 card-title h5'>Super Fast Booking</Card.Title>
                                <p className='mb-2 body-text'>
                                Hệ thống đặt chỗ của chúng tôi được thiết kế thông minh và nhanh chóng, chỉ với vài cú nhấp chuột, bạn đã có thể hoàn tất việc đặt tour một cách dễ dàng.
                                </p>
                            </Card.Body>
                        </Card>
                    </Col>
                </Row>
            </Container>
        </div>
    </>
  )
}

export default About