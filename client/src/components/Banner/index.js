import React from 'react'
import { Swiper, SwiperSlide } from 'swiper/react'
import 'swiper/swiper-bundle.min.css'
import './config.css'

const config = {
  slidesPerView: 'auto',
  centeredSlides: true,
  spaceBetween: 10,
  loop: true,
  loopFillGroupWithBlank: true,
  pagination: {
    el: '.swiper-pagination',
    clickable: true,
  },
  breakpoints: {
    // when window width is >= 320px
    640: {
      spaceBetween: 25,
    }
  }
}
const Banner = ({ images = [], className, asImage = false }) => {
  return (
    <>
      <Swiper
        {...config}
      >
        {images.map((img, i) => (
          <SwiperSlide key={i}>
            <img src={img} alt=""/>
          </SwiperSlide>
        ))}
      </Swiper>
    </>
  )
}

export default Banner