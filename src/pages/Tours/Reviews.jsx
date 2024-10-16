import React, { useContext, useEffect, useState } from 'react'
import { ListGroup } from 'react-bootstrap'
import { StoreContext } from '../../components/Context/StoreContext'
import axios from 'axios'
import { useParams } from 'react-router-dom'
const Reviews = () => {
    const options = {day:'numeric', month:'long', year: 'numeric'}
    const { url } = useContext(StoreContext)
    const [review, setReview] = useState([])
    const { slug } = useParams()
    useEffect(() => {
        const fetchReview = async() => {
            const response = await axios.get(`${url}/review/${slug}`)
            setReview(response.data.data)
        }
        fetchReview()
    }, [url, slug])
    const reviews = review && review.tourReviews ? review.tourReviews : [];
    const averageRating = reviews.length > 0
        ? (reviews.reduce((acc, curr) => acc + Number(curr.review_rating), 0) / reviews.length).toFixed(1)
        : 0;    
   
    return (
        <>
            <h1 className="h3 pt-5 pb-3 font-bold">Đánh giá chuyến đi</h1>
            <div className="tour__reviews mt-4">
                <div className='review_star'>
                    <div className='review_start-avg'>
                        <span>{averageRating}</span> trên 5
                    </div>
                    {[1, 2, 3, 4, 5].map((star) => (
                        <span key={star} >
                            <i className='bi bi-star-fill' style={{color: "#ee4d2d"}}></i>
                        </span>
                    ))}
                </div>
                <ListGroup className="user__review">
                    {review.tourReviews?.map((rate, index) => (
                        <div className='review__item' key={index}>
                            <img src="" alt=''/>
                            <div className='w-100'>
                                <div className="d-flex align-items-center justify-content-between">
                                    <div>
                                        <h5>{rate.reviewsUser.username}</h5>
                                        <p>{new Date(rate.review_date).toLocaleDateString('en-US', options)}</p>
                                    </div>
                                    <span className='d-flex align-items-center'>
                                        {rate.review_rating} <i className='bi bi-star-fill'></i>
                                    </span>
                                </div>
                                <h6>{rate.review_comment}</h6>
                            </div>
                        </div>
                    ))}
                
                </ListGroup>                
            </div> 
        </>
    )
}

export default Reviews
