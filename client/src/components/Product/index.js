import React, { useState, useEffect } from 'react'
import PropTypes from 'prop-types'
import cn from 'classnames'
import { Link } from "react-router-dom"

import Available from "components/ProductDetails/Available"
import Photo from "components/Product/Photo"
import SizeTitle from "components/Product/SizeTitle"
import SizeInfo from "components/Product/SizeInfo"

import styles from "components/Product/Product.module.sass"


const Product = ({
                     id = 0,
                     city_id = 1,
                     public: pub = true,
                     order = 0,
                     available = {
                         // expect: false,
                         // fast: false
                     },
                     slug = '[slug]',
                     title = '[title]',

                     florist_text = '',
                     florist_photo = '',
                     florist_name = '',

                     color = '',
                     stability = '',
                     shade = '',
                     packing = '',
                     bouquetType = '',
                     additives = [],
                     additionalProducts = [],
                     sizes = [{
                         title: '[sizeTitle]',
                         fast: false,
                         diameter: 0,
                         flowers: [],
                         flowers_counts: [],
                         price: 0,
                         images: []
                     }],

                     showPriceAllSizes = false,
                     firstActiveSizeIndex = 0
                 }) => {
    const [activeSizeIndex, setActiveSizeIndex] = useState(firstActiveSizeIndex)
    const [isDetails, setIsDetails] = useState(false)

    useEffect(() => {
        setActiveSizeIndex(firstActiveSizeIndex)
    }, [firstActiveSizeIndex])

    const currentSize = sizes[activeSizeIndex]

    const handleSizeClick = (index) => {
        setIsDetails(true)
        setActiveSizeIndex(index)
    }

    // const onMouseEnter = (e) => {
    //     console.log('enter')
    //     setIsDetails(true)
    // }

    // const onMouseOut = (e) => {
    //     console.log('out')
    //     setIsDetails(false)
    // }
// onMouseEnter={(e) => onMouseEnter(e)}
    // onMouseLeave={(e) => onMouseOut(e)}

    return (
      <div key={id}
           className={cn(styles.product, 'col-6', 'col-md-4', 'mb-2', 'pl-1', 'pr-1')}
      >
          <Link className={styles.image} to={`/catalog/${id}`}>
              <Photo src={currentSize.images[0]}/>
              <SizeInfo className={styles.size} diameter={currentSize.diameter}/>
          </Link>

          <Available
            fast={currentSize.fast}
            small={true}
            isDetails={isDetails}
          />

          <Link className={styles.title} to={`/catalog/${id}`}>
              {title}
          </Link>

          <div className={styles.sizes}>
              {sizes.map(({ id, fast, title, price, active }, i) => (
                <SizeTitle
                  key={id}
                  title={title}
                  price={price}
                  fast={fast}
                  active={activeSizeIndex === i}
                  onClick={() => handleSizeClick(i)}
                />
              ))}
          </div>
          <hr/>
      </div>
    )
}


// Product.propTypes = {
//     id: PropTypes.string.isRequired,
//     title: PropTypes.string.isRequired,
//     slug: PropTypes.string.isRequired,
//     available: PropTypes.shape({
//         expect: PropTypes.bool.isRequired,
//         fast: PropTypes.bool.isRequired
//     }),
//     sizes: PropTypes.array.isRequired,
//     showPriceAllSizes: PropTypes.bool,
//     firstActiveSizeIndex: PropTypes.number
// }


export default Product