import React from 'react'

const Banner = ({ images = [], className, asImage = false }) => {
    return (
      <>
          {asImage ? (
            <img src={images[0]} className={className} alt=""/>
          ) : (
            <div
              style={{ backgroundImage: `url(${images[0]})` }}
              className={className}/>
          )}
      </>
    )
}

export default Banner