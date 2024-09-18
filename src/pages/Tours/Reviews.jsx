import React from 'react'
import { ListGroup, Form } from 'react-bootstrap'
const Reviews = () => {
    const options = {day:'numeric', month:'long', year: 'numeric'}
    return (
        <>
            <h1 className="h3 pt-5 pb-3 font-bold">Bình luận về Tour du lịch</h1>
            <div className="tour__reviews mt-4">
                <h4>Reviews (2 reviews)</h4>
                <Form>
                    <div className="rating__group d-flex align-items-center gap-3 mb-4">
                        <span >
                            1 <i className='bi bi-star-fill'></i>
                        </span>
                        <span>
                            2 <i className='bi bi-star-fill'></i>
                        </span>
                        <span>
                            3 <i className='bi bi-star-fill'></i>
                        </span>
                        <span>
                            4 <i className='bi bi-star-fill'></i>
                        </span>
                        <span>
                            5 <i className='bi bi-star-fill'></i>
                        </span>
                    </div>
                    <div className="review__input">
                        <input type='text' placeholder='Chia sẻ suy nghĩ của bạn về chuyến đi' required  />
                        <button className="btn primary__btn  text-white" type='submit'>Đánh giá</button>
                    </div>
                </Form>
                <ListGroup className="user__review">
                    <div className='review__item' >
                        <img src="" alt=''/>
                        <div className='w-100'>
                            <div className="d-flex align-items-center justify-content-between">
                                <div>
                                    <h5>Hoàng Đức Tài</h5>
                                    <p>{new Date("1-18-2023").toLocaleDateString('en-US', options)}</p>
                                </div>
                                <span className='d-flex align-items-center'>
                                    4 <i className='bi bi-star-fill'></i>
                                </span>
                            </div>
                            <h6>Đẹp lắm</h6>
                        </div>
                    </div>
                </ListGroup>
            </div> 
        </>
    )
}

export default Reviews
