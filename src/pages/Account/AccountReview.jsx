import axios from 'axios';
import React, { useContext, useEffect, useState } from 'react';
import { StoreContext } from '../../components/Context/StoreContext';
import Swal from 'sweetalert2'; 
const AccountReview = () => {
    const [listBooking, setListBooking] = useState([]);
    const { url, token, userId } = useContext(StoreContext);
    const [tourRating, setTourRating] = useState(0);
    const [isReviewingTour, setIsReviewingTour] = useState(null);
    const [rate, setRate] = useState({
        user_id: '',
        tour_id: '',
        review_comment: '',
        review_rating: ''
    });

    useEffect(() => {
        const fetchListBooking = async () => {
            try {
                const response = await axios.get(`${url}/booking/userBooking/${userId}`, {
                    headers: {
                        Authorization: `Bearer ${token}`
                    }
                });
                const filterStatus = response.data.data.filter(isPaid => isPaid.status === "Đã thanh toán");
                setListBooking(filterStatus);
            } catch (error) {
                console.error("Lỗi khi lấy booking", error);
            }
        };
        if (token) {
            fetchListBooking();
        }
    }, [token, url, userId]);

    const canReview = (booking) => {
        const today = new Date();
        const endDate = new Date(booking.bookingTourChild.end_date);
        return today > endDate && booking.status === "Đã thanh toán" && booking.review_status !== "reviewed"; 
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        const rateForm = new FormData();
        rateForm.append("user_id", userId);
        rateForm.append("tour_id", isReviewingTour);
        rateForm.append("review_comment", rate.review_comment);
        rateForm.append("review_rating", tourRating);

        try {
            const response = await axios.post(`${url}/review`, rateForm, {
                headers: {
                    'Content-Type': 'application/json'
                }
            });
            Swal.fire({
                text: "Cập nhật thông tin thành công",
                icon: "success"
              });

            if (response.data.success){
                Swal.fire({
                    text: "Đánh giá thành công !",
                    icon: "success"
                });
                setTourRating(0);
                setIsReviewingTour(null);
            }

        } catch (error) {
            Swal.fire({
                text: error.response?.data?.message || error.message,
                icon: "warning"
            });
        }
    };

    const handleChange = (e) => {
        const name = e.target.name;
        const value = e.target.value;
        setRate(prev => ({ ...prev, [name]: value }));
    };

    const handleSetRating = (rating) => {
        setTourRating(rating);
    };

    return (
        <div className="account-page--main-content">
            <div className="account-wrapper">
                <div className="account_right-list">
                    <div className="account_right-cards">
                        {listBooking.map((list, index) => (
                            <div className="account-card--tours" key={index}>
                                <p className="account-card--bookingDate">
                                    Ngày tạo: {new Date(list?.booking_date).toLocaleDateString('vi-VN')}
                                </p>
                                <div className="account-card--wrapper">
                                    <div className="account-card--wrapper-content">
                                        <img src={list.bookingTourChild.tour.tourImage[0].image_url} alt="" className='account-card--wrapper-img' />
                                    </div>
                                    <div className="account-card--wrapper-content">
                                        <div className="account-card--wrapper-content--info">
                                            <label className='line-clamp line-clamp-2'>{list?.bookingTourChild.tour.name}</label>
                                            <div className="account-card--wrapper-content--tourCode">
                                                <p>Số booking: <span>{list.booking_code}</span></p>
                                            </div>
                                            <div className="account-card--wrapper-content--tourCode">
                                                <p>Mã tour: <span>{list.bookingTourChild.tour_code}</span></p>
                                            </div>
                                        </div>
                                    </div>
                                    <div className="account-card--wrapper-content">
                                        <div className="account-card--wrapper-content--price time-overdue-booking">
                                            <span>{list.status}</span>
                                            <p>{list.total_price.toLocaleString('vi-VN')} vnđ</p>
                                            {canReview(list) && (
                                                <button onClick={() => setIsReviewingTour(list.bookingTourChild.tour.id)} className='btn-review'>
                                                    Đánh giá
                                                </button>
                                            )}
                                        </div>
                                    </div>
                                    
                                    {isReviewingTour === list.bookingTourChild.tour.id && (
                                        <form onSubmit={handleSubmit} style={{marginTop: "20px"}}>
                                            <div className="rating__group d-flex align-items-center gap-3 mb-4">
                                                {[1, 2, 3, 4, 5].map((star) => (
                                                    <span key={star} onClick={() => handleSetRating(star)}>
                                                        {star} <i className={`bi ${tourRating >= star ? "bi-star-fill" : "bi-star"}`}></i>
                                                    </span>
                                                ))}
                                            </div>
                                            <div className="review__input">
                                                <input 
                                                    type='text' 
                                                    name='review_comment' 
                                                    required 
                                                    placeholder='Chia sẻ suy nghĩ của bạn '
                                                    onChange={handleChange} 
                                                />
                                            </div>
                                            <div className='btn_action-review'>
                                                <button className="btn-submit" type='submit'>Đánh giá</button>
                                                <button className="btn-submit" type='submit' onClick={() => setIsReviewingTour(null)}>Hủy</button>
                                            </div>
                                        </form>
                                    )}
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            </div>
        </div>
    );
};




export default AccountReview;