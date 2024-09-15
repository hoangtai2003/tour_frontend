import React, { useState } from 'react';
import { Calendar, momentLocalizer } from 'react-big-calendar';
import moment from 'moment';
import 'react-big-calendar/lib/css/react-big-calendar.css';
import { Table } from 'react-bootstrap';
import 'moment/locale/vi';  
const localizer = momentLocalizer(moment);
moment.locale('vi');
const CustomDepartureCalendar = ({ tourDetails }) => {
    const [selectedDate, setSelectedDate] = useState(null);

    // Tìm TourChild tương ứng với ngày đã chọn
    const selectedTourChild = tourDetails?.tourChildren?.find(tourChild => {
        const startDate = new Date(tourChild.start_date);
        return moment(startDate).isSame(selectedDate, 'day');
    });

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
                price: tourChild.price_adult
            };
        });
    }

    const events = availableDates.map(({ date, price }) => ({
        start: date,
        end: date,
        title: `${price.toLocaleString('vi-VN')}đ`,
    }));

    const handleSelectEvent = (event) => {
        setSelectedDate(event.start);
    };
    const messages = {
        today: 'Hôm nay',
        previous: 'Trở lại',
        next: 'Tiếp theo',
        month: 'Tháng',
        week: 'Tuần',
        day: 'Ngày',
        agenda: 'Lịch trình',
        date: 'Ngày',
        time: 'Thời gian',
        event: 'Sự kiện',
        back: 'Quay lại'
    };
    return (
        <div className="tour-details-container">
            {!selectedDate ? (
                <>
                    <h2 className='d-flex align-items-center justify-content-center'>LỊCH KHỞI HÀNH</h2>
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
                    <h1 className="mb-2 h3 pb-2">#1. Điểm nhấn của chương trình</h1>
                    <Table bordered>
                        <tbody>
                            <tr>
                                <td>Hành trình</td>
                                <td>{tourDetails.name}</td>
                            </tr>
                            <tr>
                                <td>Thời gian</td>
                                <td>{tourDetails.duration}</td>
                            </tr>
                            <tr>
                                <td>Phương tiện di chuyển</td>
                                <td>{tourDetails.transportations}</td>
                            </tr>
                            <tr>
                                <td>Điểm xuất phát</td>
                                <td>{tourDetails.departure_city}</td>
                            </tr>
                            {selectedTourChild && (
                                <>
                                    <tr>
                                        <td>Ngày đi</td>
                                        <td>{moment(selectedTourChild.start_date).format('DD-MM-YYYY')}</td>
                                    </tr>
                                    <tr>
                                        <td>Ngày về</td>
                                        <td>{moment(selectedTourChild.end_date).format('DD-MM-YYYY')}</td>
                                    </tr>
                                    <tr>
                                        <td>Số người tham gia</td>
                                        <td>{selectedTourChild.total_seats}</td>
                                    </tr>
                                    <tr>
                                        <td>Giá người lớn</td>
                                        <td>{selectedTourChild.price_adult.toLocaleString('vi-VN')} vnd</td>
                                    </tr>
                                    <tr>
                                        <td>Giá trẻ em</td>
                                        <td>{selectedTourChild.price_child.toLocaleString('vi-VN')} vnd</td>
                                    </tr>
                                </>
                            )}
                        </tbody>
                    </Table>
                </>
            )}
        </div>
    );
};

export default CustomDepartureCalendar;
