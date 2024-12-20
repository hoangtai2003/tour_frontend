import React, { useContext, useEffect, useState } from 'react'
import Breadcrumbs from '../../components/Breadcrumb/Breadcrumbs'
import { Container, Row, Tab, Col, Nav, Card, Stack, Accordion } from 'react-bootstrap'
import { NavLink, useParams } from 'react-router-dom'
import "./tour.css"
import ImageGallery from "react-image-gallery";
import axios from 'axios'
import 'bootstrap/dist/css/bootstrap.min.css'
import { InformationNote } from '../../utils/data'
import { AiFillTags } from "react-icons/ai";
import { SlCalender } from "react-icons/sl";
import { StoreContext } from '../../components/Context/StoreContext'
import { Calendar, momentLocalizer } from 'react-big-calendar';
import moment from 'moment';
import 'react-big-calendar/lib/css/react-big-calendar.css';
import 'moment/locale/vi';  
import { SlLocationPin } from "react-icons/sl";
import { LuCalendarDays } from "react-icons/lu";
import { FcAlarmClock } from "react-icons/fc";
import Reviews from './Reviews'
import { MdAirlineSeatReclineNormal } from "react-icons/md";
import { IoTicketOutline } from "react-icons/io5";
import { FaGift } from "react-icons/fa6";

const localizer = momentLocalizer(moment);
moment.locale('vi');
const TourDetails = () => {
    useEffect(() => {
        document.title = "Hệ thống bán tour trực tuyến | Du lịch Việt"
        window.scroll(0,0)
    }, [])
    const [selectedDate, setSelectedDate] = useState(null);
    const { url } = useContext(StoreContext)
    const { slug } = useParams();
    const [tourDetails, setTourDetails] = useState(null); 
    const [tourRelated, setTourRelated] = useState([])
 

    useEffect(() => {
        const fetchTourDetail = async () => {
            const response = await axios.get(`${url}/tours/slug-tour/${slug}`)
            setTourDetails(response.data.data)
        }
        fetchTourDetail()
    }, [slug, url])

    useEffect(() => {
        const fetchTourRelated = async () => {
            try {
                const response = await axios.get(`${url}/tours/${slug}/related`);
                setTourRelated(response.data.data);
            } catch (error) {
                console.error('Error fetching related tours:', error);
            }
        };
        fetchTourRelated()
    }, [slug, url])
    
    const imageItems = tourDetails?.tourImage.map(image => ({
        original: image.image_url,
        thumbnail: image.image_url,
      })) || [];


    if (!tourDetails) {
        return <div>Loading...</div> 
    } 
    // <------ Xử lý dữ liệu liên quan tới Calender ------>
    const selectedTourChild = tourDetails?.tourChildren?.find(tourChild => {
        const startDate = new Date(tourChild.start_date);
        return moment(startDate).isSame(selectedDate, 'day');
    });
    const afterDiscount = selectedTourChild && selectedTourChild.price_sale
    ? (selectedTourChild.price_adult * (100 - selectedTourChild.price_sale)) / 100
    : "";
    const handleBackToCalendar = () => {
        setSelectedDate(null); 
    };

    let availableDates = [];
    if (tourDetails?.tourChildren && tourDetails.tourChildren.length > 0) {
        availableDates = tourDetails.tourChildren.map((tourChild) => {
            const apiDate = tourChild.start_date;
            
            const dateObj = new Date(apiDate);
            const day = dateObj.getDate();
            const month = dateObj.getMonth() + 1;
            const year = dateObj.getFullYear();

            return {
                date: new Date(year, month - 1, day),
                price: tourChild.price_adult,
                price_sale: tourChild.price_sale
            };
        });
    }
    const today = new Date();
    today.setHours(0, 0, 0, 0);

    const filteredDates = availableDates.filter(({ date }) => {
        const tourDate = new Date(date);
        tourDate.setHours(0, 0, 0, 0);
        return tourDate >= today;
    });

    const events = filteredDates.map(({ date, price, price_sale }) => ({
        start: date,
        end: date,
        title: `${price.toLocaleString('vi-VN')}đ`,
        text: price_sale !== 0 ? `${price_sale}` : '0',
    }));
    const CustomEvent = ({ event }) => (
        <div style={{ textAlign: 'center', color: 'red' }}>
            <div style={{ fontSize: '16px' }}>{event.title}</div>
            {event.text !== '0' && (
                 <small style={{ fontSize: '12px', color: 'red', fontWeight: "650" }}><FaGift  style={{fontSize: "15px", marginBottom: "5px"}}/> Giảm {event.text}%</small>
            )}
        </div>
    );
    
    const handleSelectEvent = (event) => {
        setSelectedDate(event.start);
    };
    const messages = {
        today: 'Hôm nay',
        next: 'Tháng sau',
        previous: 'Tháng trước'
    }
    // <------ Kết thúc xử lý dữ liệu liên quan tới Calender ------>

    const locations = tourDetails.locations
    const sortedLocations = locations.sort((a, b) => {
        if (a.parent_id === 0) return -1; 
        if (b.parent_id === 0) return 1;  
        return 0; 
    });
    const totalSeat = selectedTourChild?.total_seats - selectedTourChild?.confirmedBookingCount
    const renderBreadcrumb = () => {
        return sortedLocations.map((location, index) => (
            <span key={index}>
                <NavLink to={`/du-lich-trong-nuoc/${location.loca_slug}`} className="normal-link">
                    {location.name}
                </NavLink>
                {index !== sortedLocations.length - 1 && " / "}
            </span>
        ));
    };

    return (
        <>
            <Breadcrumbs/>
            <section className='tour_details py-5'>
                <Container>
                    <div className='breadcrumb-container'>
                        <div>
                            <NavLink className="normal-link" to="/home">Du lịch /</NavLink>
                        </div>
                        {renderBreadcrumb()} 
                        <div className='active-link'>
                            {tourDetails.name && `/ ${tourDetails.name}`}
                        </div>
                    </div>
                    <Row>
                        <h1 className='fs-2 font-bold mb-4'>{tourDetails.title}</h1>
                        <ImageGallery items={imageItems} showNav={false} showBullets={false} showPlayButton={false} />
                        <Tab.Container id="left-tabs-example" defaultActiveKey="1">
                            <Row className='py-5'>
                                <Col md={8} className='mb-3 mb-md-0'>
                                    <Col md={12}>
                                        <Nav variant="pills" className="flex-rows nav_bars rounded-2">
                                            <Nav.Item>
                                                <Nav.Link eventKey="1">Giới thiệu</Nav.Link>
                                            </Nav.Item>
                                            <Nav.Item>
                                                <Nav.Link eventKey="2">Lịch trình</Nav.Link>
                                            </Nav.Item>
                                            <Nav.Item>
                                                <Nav.Link eventKey="3">Thông tin lưu ý</Nav.Link>
                                            </Nav.Item>
                                            <Nav.Item>
                                                <Nav.Link eventKey="4">Đánh giá chuyến đi</Nav.Link>
                                            </Nav.Item>
                                        </Nav>
                                    </Col>
                                    <Tab.Content className='mt-4'>
                                        <Tab.Pane eventKey="1">
                                            <div className="tour-details-container">     
                                                <div className="tour-details-container">
                                                <h3 className='font-bold d-flex align-items-center justify-content-center' style={{marginBottom: "25px"}}>LỊCH KHỞI HÀNH</h3>
                                                    {!selectedDate ? (
                                                        <>
                                                            <div style={{ height: 500 }}>
                                                            <Calendar
                                                                localizer={localizer}
                                                                events={events}
                                                                startAccessor="start"
                                                                endAccessor="end"
                                                                style={{ height: '100%' }}
                                                                views={['month']}
                                                                onSelectEvent={handleSelectEvent}
                                                                messages={messages}
                                                                components={{
                                                                    event: CustomEvent, 
                                                                }}
                                                                eventPropGetter={(event) => ({
                                                                    style: {
                                                                        backgroundColor: '#f0f0f0',
                                                                        color: 'red',
                                                                        border: 'none',
                                                                        borderRadius: '0',
                                                                    },
                                                                })}
                                                            />
                                                            </div>
                                                        </>
                                                    ) : (
                                                        <>
                                                            {selectedTourChild && (
                                                                <>
                                                                    <div className="tour-info-container">
                                                                        <div className="transport-info">
                                                                            <h3>PHƯƠNG TIỆN DI CHUYỂN</h3>
                                                                            <div className="transport-details">
                                                                                <div className="departure">
                                                                                    <span>Ngày đi - {moment(selectedTourChild.start_date).format('DD/MM/YYYY')}</span>
                                                                                    <div className="flight-info">
                                                                                        <span className="flight-number">{selectedTourChild.transportion_start}</span>
                                                                                        <span className='font-bold'>{selectedTourChild.time_goes_start.slice(0, 5)} - {selectedTourChild.time_comes_start.slice(0, 5)}</span>
                                                                                    </div>
                                                                                   
                                                                                </div>
                                                                                <div className="arrival">
                                                                                    <span>Ngày về - {moment(selectedTourChild.end_date).format('DD/MM/YYYY')}</span>
                                                                                    <div className="flight-info">
                                                                                        <span className="flight-number">{selectedTourChild.transportion_end}</span>
                                                                                        <span className='font-bold'>{selectedTourChild.time_goes_end.slice(0, 5)} - {selectedTourChild.time_comes_end.slice(0, 5)}</span>
                                                                                    </div>
                                                                                    
                                                                                </div>
                                                                            </div>
                                                                        </div>
                                                                        <hr />
                                                                        <div className="price_info">
                                                                            <h3>GIÁ TOUR</h3>
                                                                            <div className="price-details">
                                                                                <div className="price-item">
                                                                                    <div>
                                                                                        <label>Người lớn </label>
                                                                                        <span>(Từ 12 tuổi trở lên)</span>
                                                                                    </div>
                                                                                    <p className="price">{((selectedTourChild.price_adult * (100 - selectedTourChild.price_sale)) / 100).toLocaleString('vi-VN')} vnđ</p>
                                                                                </div>
                                                                                <div className="price-item">
                                                                                    <div>
                                                                                        <label>Trẻ em </label>
                                                                                        <span>(Từ 5 - 11 tuổi)</span>
                                                                                    </div>
                                                                                    <p className="price">{((selectedTourChild.price_child * (100 - selectedTourChild.price_sale)) / 100).toLocaleString('vi-VN')} vnđ</p>
                                                                                </div>
                                                                                <div className="price-item">
                                                                                    <div>
                                                                                        <label>Trẻ nhỏ </label>
                                                                                        <span>(Từ 2 - 4 tuổi)</span>
                                                                                    </div>
                                                                                    <p className="price">{((selectedTourChild.price_toddler * (100 - selectedTourChild.price_sale)) / 100).toLocaleString('vi-VN')} vnđ</p>
                                                                                </div>
                                                                                <div className="price-item">
                                                                                    <div>
                                                                                        <label>Em bé </label>
                                                                                        <span>(Dưới 2 tuổi)</span>
                                                                                    </div>
                                                                                    <p className="price">{((selectedTourChild.price_baby * (100 - selectedTourChild.price_sale)) / 100).toLocaleString('vi-VN')} vnđ</p>
                                                                                </div>
                                                                            </div>
                                                                        </div>
                                                                    </div>
                                                                   
                                                                </>
                                                            )}
                                                        </>
                                                    )}
                                                </div>
                                                <h3 className="mb-2 h3 pt-4 font-bold">Giới thiệu tour</h3>
                                                <div className='content-container' dangerouslySetInnerHTML={{ __html: tourDetails.introduct_tour }}></div>
                                            </div>
                                        </Tab.Pane>
                                        <Tab.Pane eventKey="2">
                                            <div className='content-container' dangerouslySetInnerHTML={{ __html: tourDetails.description_itinerary }}></div>
                                        </Tab.Pane>
                                        <Tab.Pane eventKey="3">
                                            <Accordion defaultActiveKey="0" className='mt-4 accordion-container' >
                                                {InformationNote.itinerary.map((val, index) => {
                                                    return (
                                                    <Accordion.Item eventKey={index} className='mb-4' key={index}>
                                                        <Accordion.Header className='accordion_header' >
                                                            <h6 dangerouslySetInnerHTML={{ __html: val.title }}></h6>
                                                        </Accordion.Header>
                                                        <Accordion.Body>
                                                        <div
                                                            dangerouslySetInnerHTML={{
                                                            __html: val.des.replace(/\n/g, '<br>')
                                                            }}
                                                            className='accordion_body'
                                                        ></div>
                                                        </Accordion.Body>
                                                    </Accordion.Item>
                                                    );
                                                })}
                                            </Accordion>
                                        </Tab.Pane>
                                        <Tab.Pane eventKey="4">
                                            <Reviews />
                                        </Tab.Pane>
                                    </Tab.Content>
                                </Col>
                                <Col md={4}>
                                    <aside className='right-sidebar' style={{position: "sticky", top: "90px"}}>
                                        <Card className='rounded-3 p-2 shadow-sm mb-4 price-info'>
                                            <Card.Body>
                                                {!selectedDate ? (
                                                    <>
                                                        <Stack gap={2} direction="horizontal">
                                                            <div className="price-container">
                                                                <h4>Giá từ: </h4>
                                                                <div className="price-discounted">
                                                                    <p>{tourDetails.price.toLocaleString('vi-VN')} vnđ</p>
                                                                </div>
                                                                <h6><AiFillTags /> Mã chương trình: <span className='font-bold'>{tourDetails.program_code}</span></h6>
                                                            </div>
                                                        </Stack>
                                                        <button className="primaryBtn w-100 d-flex justify-content-center fw-bold p-3 mt-3"><SlCalender className='calender-departure' />Chọn ngày khởi hành</button>
                                                    </> 
                                                ) : (
                                                    <>
                                                        <Stack gap={2} direction="horizontal">
                                                            {afterDiscount ? (
                                                                <div className="price-container">
                                                                    <div className="price-original">
                                                                        <h4>Giá:</h4> 
                                                                        <p>{selectedTourChild.price_adult.toLocaleString('vi-VN')} vnđ</p>
                                                                    </div>
                                                                    <div className="price-discounted">
                                                                        <p>{afterDiscount.toLocaleString('vi-VN')} vnđ</p>
                                                                    </div>
                                                                    <h6><AiFillTags className='icon' /> Mã tour: <span className='font-bold'>{selectedTourChild.tour_code}</span></h6>
                                                                    <h6><SlLocationPin className='icon' style={{marginRight: "5px"}}/>Khởi hành: <span className='font-bold'>{tourDetails.departure_city}</span></h6>
                                                                    <h6><LuCalendarDays className='icon' style={{marginRight: "5px"}}/>Ngày khởi hành: <span className='font-bold'>{moment(selectedTourChild.start_date).format('DD-MM-YYYY')}</span></h6>
                                                                    <h6><FcAlarmClock className='icon' style={{marginRight: "5px"}}/>Thời gian: <span className='font-bold'>{tourDetails.duration}</span></h6>
                                                                    {totalSeat > 0 ? (
                                                                         <h6><MdAirlineSeatReclineNormal   className='icon' style={{marginRight: "5px"}}/>Số chỗ còn: <span className='font-bold'>{totalSeat}</span></h6>
                                                                    ): (
                                                                        <p style={{color: "#e01600", fontWeight: "650"}}>Tour đã hết chỗ. Vui lòng chọn ngày khác !</p>
                                                                    )}
                                                                </div>
                                                            ) : (
                                                                <div className="price-container">
                                                                    <h4>Giá từ: </h4>
                                                                    <div className="price-discounted">
                                                                        <p>{selectedTourChild.price_adult.toLocaleString('vi-VN')} vnđ</p>
                                                                    </div>
                                                                    <h6><AiFillTags className='icon' /> Mã tour: <span className='font-bold'>{selectedTourChild.tour_code}</span></h6>
                                                                    <h6><SlLocationPin className='icon' style={{marginRight: "5px"}}/>Khởi hành: <span className='font-bold'>{tourDetails.departure_city}</span></h6>
                                                                    <h6><LuCalendarDays className='icon' style={{marginRight: "5px"}}/>Ngày khởi hành: <span className='font-bold'>{moment(selectedTourChild.start_date).format('DD-MM-YYYY')}</span></h6>
                                                                    <h6><FcAlarmClock className='icon' style={{marginRight: "5px"}}/>Thời gian: <span className='font-bold'>{tourDetails.duration}</span></h6>
                                                                    {totalSeat > 0 ? (
                                                                         <h6><MdAirlineSeatReclineNormal   className='icon' style={{marginRight: "5px"}}/>Số chỗ còn: <span className='font-bold'>{totalSeat}</span></h6>
                                                                    ): (
                                                                        <p style={{color: "#e01600", fontWeight: "650"}}>Tour đã hết chỗ. Vui lòng chọn ngày khác !</p>
                                                                    )}
                                                                   
                                                                </div>
                                                            )}
                                                        </Stack>
                                                        <div className="button-selection">
                                                            
                                                            {totalSeat > 0 ? (
                                                                <>
                                                                    <button className="secondaryBtn w-50 d-flex justify-content-center fw-bold p-3 mt-3" onClick={handleBackToCalendar}>Ngày khác</button>
                                                                    <NavLink className="primaryBtn w-50 d-flex justify-content-center fw-bold p-3 mt-3" to={`/booking/${selectedTourChild.tour_code}`}>Đặt ngay</NavLink>
                                                                </>
                                                            ) : (
                                                                <button className="secondaryBtn w-100 d-flex justify-content-center fw-bold p-3 mt-3" onClick={handleBackToCalendar}>Ngày khác</button>
                                                            )}
                                                           
                                                        </div>
                                                    </>
                                                )}
                                                
                                            </Card.Body>
                                        </Card>

                                        <div className="tour_list">
                                            {tourRelated.length > 0 ? (                                                
                                                tourRelated.slice(0,2).map((tour, index) => {
                                                    return (
                                                        <Card key={index} className='tour-card rounded-2 shadow-sm mb-4'>
                                                                <div className="price-section">
                                                                    <div className="price-info">
                                                                        <span className="only-price">
                                                                            {tour?.price.toLocaleString('vi-VN')} vnđ/người
                                                                        </span>
                                                                    </div>
                                                                </div>
                                                            <Card.Img
                                                                variant='top'
                                                                src={tour?.tourImage[0]?.image_url}
                                                                className="img-fluid"
                                                                alt={tour?.name}
                                                            />
                                                            <Card.Body>
                                                                <Card.Title>
                                                                    <NavLink className="body-text text-dark text-decoration-none" to={`/chuong-trinh/${tour?.tour_slug}`}>
                                                                        {tour?.name}
                                                                    </NavLink>
                                                                </Card.Title>
                                                                <Card.Text>
                                                                    <SlLocationPin style={{marginRight: "10px"}}/>
                                                                    Khởi hành : <span className="font-bold" style={{ color: "#0b5da7"}}>{tour?.departure_city}</span>
                                                                </Card.Text>
                                                                <Card.Text>
                                                                    <IoTicketOutline style={{fontSize: "15px", marginRight: "10px"}} />
                                                                    Mã chương trình :<span className='font-bold' style={{marginLeft: "10px", color: "#171717"}}>{tour?.program_code} ({tour?.duration})</span>
                                                                </Card.Text>
                                                            </Card.Body>
                                                        </Card>
                                                    );
                                                })
                                            ) : (
                                                ""
                                            )}
                                        </div>

                                    </aside>
                                </Col>
                                
                            </Row>
                        </Tab.Container>


                    </Row>
                </Container>
            </section>
        </>
    )
}

export default TourDetails;
