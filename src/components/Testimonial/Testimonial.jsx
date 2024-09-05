//  react-slick là thư viện tạo carousel (trình chiếu dạng trượt)
import React from 'react' 
import Slider from 'react-slick'
import ava01 from '../../assets/images/ava/ava-1.jpg'
import ava02 from '../../assets/images/ava/ava-2.jpg'
import ava03 from '../../assets/images/ava/ava-3.jpg'
const Testimonials = () => {
    const settings = {
        
        dots: true, 
        infinite: true, 
        autoplay: true, 
        speed: 1000, 
        swipeToSlide: true, 
        autoplaySpeed: 2000,
        slidesToShow: 3,

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
  return ( 
    <Slider { ... settings}>
        <div className="testimonial py-4 px-3">
            <p>
                Chuyến du lịch tuyệt vời để lại trong tôi nhiều kỷ niệm
            </p>
            <div className="d-flex align-items-center gap-4 mt-3">
                <img src={ava01} alt='' className='w-25 h-25 rounded-2'></img>
                <div>
                    <h5 className="mb-0 mt-3">Nguyễn Thanh Tùng</h5>
                </div>
            </div>
        </div>
        <div className="testimonial py-4 px-3">
            <p>
                Giá cả dịch vụ tuyệt vời 
            </p>
            <div className="d-flex align-items-center gap-4 mt-3">
                <img src={ava02} alt='' className='w-25 h-25 rounded-2'></img>
                <div>
                    <h5 className="mb-0 mt-3">Hoàng Đức Tài</h5>
                </div>
            </div>
        </div>
        <div className="testimonial py-4 px-3">
            <p>
                Quá tuyệt vời
            </p>
            <div className="d-flex align-items-center gap-4 mt-3">
                <img src={ava03} alt='' className='w-25 h-25 rounded-2'></img>
                <div>
                    <h5 className="mb-0 mt-3">Trịnh Trần Phương Tuấn</h5>
                </div>
            </div>
        </div>
        <div className="testimonial py-4 px-3">
            <p>
                Rất đẹp
            </p>
            <div className="d-flex align-items-center gap-4 mt-3">
                <img src={ava03} alt='' className='w-25 h-25 rounded-2'></img>
                <div>
                    <h5 className="mb-0 mt-3">Phạm Huy Hoàng</h5>
                </div>
            </div>
        </div>
    </Slider>
  )
}

export default Testimonials
