import React, { useEffect, useState } from 'react'
import { connect } from "react-redux"
import cn from 'classnames'
import { useLocation } from "react-router-dom"
import Preloader from "components/Preloader"
import FloristSay from "components/ProductDetails/FloristSay"
import Available from "components/ProductDetails/Available"
import SizeButton from "components/ProductDetails/SizeButton"
import SizeInformer from "components/ProductDetails/SizeInformer"
import RoubleSymbol from "components/UI/RoubleSymbol"
import FlowersInstruction from "components/ProductDetails/FlowersInstruction"
import DeliveryInfo from "components/ProductDetails/DeliveryInfo"
import ExpandBlock from "components/ProductDetails/ExpandBlock"
// import { slugFromUrlSelector } from "store/selectors/router"
import { fetchProduct, fetchProducts } from "store/actions/productsActions"
import { activeProductSelector, productSelector } from "store/selectors/product"
import { cartProductAdd } from "store/actions/cart/productsActions"
import Additive from "components/ProductDetails/Additive"
import Lightbox from 'react-image-lightbox'
import { getFilterSelectedByKey } from "store/selectors/products"

import { isNumber } from "utils"
import Page404 from "pages/404"
import withApiService from "components/hoc/withApiService"
import FlowersList from 'components/Common/FlowersList'

import 'react-image-lightbox/style.css'
import styles from "./productDetails.module.sass"
// import { history } from 'store/configureStore'
// import { Row } from "components/Bootstrap"
// import propTypes from "prop-types"
// import Page404 from "pages/404"
// import { getRouter } from "store/selectors/router"
// import { push } from 'connected-react-router'
// import loadable from "@loadable/component"

function useQuery() {
  return new URLSearchParams(useLocation().search)
}

const ProductDetailsContainer = ({
  product,
  addToCart,
  fetchProducts,
  getThumbImage,
  getSmallImage,
  getImage
}) => {
  let query = useQuery()
  const activeSizeIndexFromRouter = Number.parseInt(query.get("activeSizeIndex"))

  const [activeSizeIndex, setActiveSizeIndex] = useState(activeSizeIndexFromRouter || 0)
  const [activeImageIndex, setActiveImageIndex] = useState(0)
  const [selectedAdditives, setSelectedAdditives] = useState([])
  const [isPhotoViewerOpen, setIsPhotoViewerOpen] = useState(false)
  // const [activeAdditionalProducts, setActiveAdditionalProducts] = useState(false)
  // const [error, setError] = useState(false)

  useEffect(() => {
    // console.warn('useEffect', product)
    if (!product) fetchProducts('ssdfs')
  }, [])

  const handleSizeClick = (activeSizeIndex) => {
    setActiveSizeIndex(activeSizeIndex)
    setActiveImageIndex(0)
  }

  const handleAdditiveClick = (button) =>
    setSelectedAdditives({
      ...selectedAdditives,
      [`additive_${button.id}`]: button
    })

  const handleSetIndexImage = (index) => (e) =>
    setActiveImageIndex(index)

  const handlePhotoViewerClose = () =>
    setIsPhotoViewerOpen(false)

  const handleAddToCart = () => {
    const { id: pId, title: pTitle } = product
    const { images, price, title, flowers = [], diameter = false } = product.sizes[activeSizeIndex]
    const image = getSmallImage(images[activeImageIndex])
    const options = Object.values(selectedAdditives)

    addToCart({
      id: pId,
      title: pTitle,
      image,
      diameter,
      flowers,
      options,
      size: {
        title,
        price
      },
      unavailable: [],
      count: 1
    })
  }

  const renderSizesButtons = (sizes, activeSizeIndex) => (
    <div className={styles.sizesButtons}>
      {sizes.map((size, i) =>
        <SizeButton
          key={i}
          sizeIndex={i}
          title={size.title}
          price={size.price}
          isFast={size.fast}
          active={activeSizeIndex === i}
          onClick={() => handleSizeClick(i)}
        />
      )}
    </div>
  )

  // const renderFlowers = (flowers, flowers_counts) => (
  //   <ul className={styles.properties}>
  //     {flowers.map((flower, i) => (
  //       <li key={i}>
  //         <b>{flower}</b>{flowers_counts[i] > 0 && `: ${flowers_counts[i]} шт.`}
  //       </li>
  //     )
  //     )}
  //   </ul>
  // )

  // todo Понять как сделать редирект на 404
  // this.props.goToLink('/404')
  // if (!product) return history.push('/404')
  if (!product) return <Preloader />

  const { florist, additives, sizes } = product
  if (activeSizeIndex > sizes.length - 1) return <Page404 />

  const activeSize = sizes[activeSizeIndex]
  const images = activeSize.images
  const activeImage = activeSize.images[activeImageIndex]

  const lightBoxProps = activeSize.images.length > 1 ? {
    nextSrc: images[(activeImageIndex + 1) % images.length],
    prevSrc: images[(activeImageIndex + images.length - 1) % images.length],
    onMovePrevRequest: () =>
      this.setState({
        activeImageIndex: (activeImageIndex + images.length - 1) % images.length
      }),
    onMoveNextRequest: () =>
      this.setState({
        activeImageIndex: (activeImageIndex + 1) % images.length
      })
  } : {}

  const totalSelectedAdditives = Object
    .values(selectedAdditives)
    .reduce((total, {price}) => total + price, 0)

  const totalPrice = activeSize.price + totalSelectedAdditives

  return (
    <div className="row mt-2">
      <div className={cn('col-md-5', styles.photo)}>
        <div className={styles.photoSizeTitle}>
          «{activeSize.title}»
              </div>

        <img
          src={getSmallImage(activeImage)}
          onClick={() => setIsPhotoViewerOpen(true)}
          alt=""
        />

        {isPhotoViewerOpen && (
          <Lightbox
            mainSrc={getImage(images[activeImageIndex])}
            onCloseRequest={handlePhotoViewerClose}
            {...lightBoxProps}
          />
        )}

        {activeSize.images.length > 1 && (
          activeSize.images.map((img, i) => (
            <div key={i} className={cn(styles.thumb, i > 0 && "ml-2",
              activeImageIndex === i && styles.active)}>
              <img src={getThumbImage(img)} onClick={handleSetIndexImage(i)} alt="" />
            </div>
          ))
        )}

        <div className="d-none d-lg-block d-xl-block">
          <FloristSay
            photo={getImage(florist.photo)}
            name={florist.name}
            text={florist.text}
          />
        </div>

        <div className="d-none d-lg-block d-xl-block">
          <FlowersInstruction />
        </div>
      </div>
      <div className={cn('col-md-7', styles.usn)}>
        <h1>{product.title}</h1>

        <Available
          fast={activeSize.fast}
          isDetails={true}
        />

        {renderSizesButtons(product.sizes, activeSizeIndex)}

        <SizeInformer
          className={styles.sizeInformer}
          diameter={activeSize.diameter}
        />

        {additives && additives.length > 0 && (
          additives.map(additive =>
            <Additive
              {...additive}
              key={additive.id}
              onButtonClick={handleAdditiveClick}
            />
          ))}


        {/*// todo Выделение и подсчет доп товара*/}
        {/*// todo Добавление товара в корзину*/}

        {/*<p className={styles.btitle}>Приятные мелочи</p>*/}
        {/*<AdditionalProducts*/}
        {/*activeIds={this.getAdditionalProductsIds()}*/}
        {/*onClick={this.handleAdditionalProductClick}*/}
        {/*/>*/}

        <br />
        <h1>{totalPrice.toLocaleString('ru-RU')} <RoubleSymbol /></h1>


        <div
          className={styles.addToCartBtn}
          onClick={handleAddToCart}>В корзину</div>

        <div className="d-lg-none d-xl-none">
          <FloristSay
            photo={florist.photo}
            name={florist.name}
            text={florist.text}
          />
        </div>

        {activeSize.flowers && (
          <ExpandBlock title="Состав композиции" initVisible={true}>
            <FlowersList
              flowers={activeSize.flowers}
              counts={activeSize.flowers_counts}
              className={styles.flowersList} />
          </ExpandBlock>
        )}

        <DeliveryInfo />

        <div className="d-lg-none d-xl-none">
          <FlowersInstruction />
        </div>

      </div>
    </div>
  )
}

// todo СДЕЛАЙ ТО, ЧТО НАПИСАНО ВО ВКЛАДКАХ СПРАВА
// https://codesandbox.io/s/github/reduxjs/redux/tree/master/examples/shopping-cart?from-embed

const mapStateToProps = (state, props) => {
  return {
    // slug: slugFromUrlSelector(state),
    // product: activeProductSelector(state),
    product: productSelector(state, props.id)
  }
}

const mapDispatchToProps = ({
  fetchProducts,
  addToCart: cartProductAdd
})

const mapApiMethodsToProps = (apiService) => ({
  getThumbImage: apiService.getThumbImage,
  getSmallImage: apiService.getSmallImage,
  getImage: apiService.getImage
})

// todo https://stackoverflow.com/questions/49213602/how-to-get-id-params-to-redux-action-from-react-router
// todo use it

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(withApiService(mapApiMethodsToProps)(ProductDetailsContainer))