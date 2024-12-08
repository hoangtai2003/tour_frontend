import React, { useContext, useEffect, useState } from 'react' 
import Slider from 'react-slick'
import axios from 'axios'
import { StoreContext } from '../Context/StoreContext'
const Testimonials = () => {
    const [review, setReview] = useState([])
    const { url } = useContext(StoreContext)
    const settings = {
        
        dots: true, 
        infinite: true, 
        autoplay: true, 
        speed: 2000, 
        swipeToSlide: true, 
        autoplaySpeed: 2000,
        slidesToShow: 2,

        responsive: [
            {
                breakpoint: 992,
                settings: {
                    slidesToShow: 2,
                    slidesToScroll: 1,
                    infinite: true,
                    dots: true,
                },
            },
            {
                breakpoint: 576,
                settings: {
                    slidesToShow: 1,
                    slidesToScroll: 1
                }
            }
        ]
    }
    useEffect(() => {
        const fetchReview = async() => {
            const response = await axios.get(`${url}/review`)
            setReview(response.data.data)
        }
        fetchReview()
    }, [url])

  return ( 
    <Slider { ... settings}>
        {review.slice(0,8).map((rate, index) => (
            <div key={index}>
                <div className="testimonial py-4 px-3">
                    <p>
                        {rate.review_comment}
                    </p>
                <div className="d-flex align-items-center gap-4 mt-3">
                    <img src={rate.reviewsUser.user_image} alt='' className='w-25 h-25 rounded-2'></img>
                        <div>
                            <h5 className="mb-0 mt-3">{rate.reviewsUser.username}</h5>
                        </div>
                    </div>
                </div>
            </div>
           
        ))}
       
    </Slider>
  )
}

export default Testimonials
