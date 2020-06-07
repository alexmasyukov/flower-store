import React, { Component } from 'react'
import { connect } from "react-redux"
import cn from 'classnames'
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
import { fetchProduct } from "store/actions/productsActions"
import { activeProductSelector, productSelector } from "store/selectors/product"
import { cartProductAdd } from "store/actions/cart/productsActions"
import styles from "./productDetails.module.sass"
import Additive from "components/ProductDetails/Additive"
import Lightbox from 'react-image-lightbox'
import 'react-image-lightbox/style.css'
import { getFilterSelectedByKey } from "store/selectors/products"
import { useLocation } from "react-router-dom"
import { isNumber } from "utils"
// import { history } from 'store/configureStore'
// import { Row } from "components/Bootstrap"
// import propTypes from "prop-types"
// import Page404 from "pages/404"
// import { getRouter } from "store/selectors/router"
// import { push } from 'connected-react-router'
// import loadable from "@loadable/component"

function useQuery() {
    return new URLSearchParams(useLocation().search);
}

class ProductDetailsContainer extends Component {
    state = {
        activeSizeIndex: undefined,
        activeImageIndex: 0,
        selectedAdditives: [],
        // activeAdditionalProducts: [],
        fullScreenPhotoIsOpen: false,
        error: false
    }

    renderSizesButtons = (sizes, activeSizeIndex) => {
        return (
          <div className={styles.sizesButtons}>
              {sizes.map((size, i) =>
                <SizeButton
                  key={i}
                  sizeIndex={i}
                  title={size.title}
                  price={size.price}
                  isFast={size.fast}
                  active={activeSizeIndex === i}
                  onClick={this.handleSizeButtonClick}
                />
              )}
          </div>
        )
    }

    renderFlowers = (flowers, flowers_counts) => (
      <ul className={styles.properties}>
          {flowers.map((flower, i) => (
              <li key={i}>
                  <b>{flower}</b>{flowers_counts[i] > 0 && `: ${flowers_counts[i]} шт.`}
              </li>
            )
          )}
      </ul>
    )

    handleSizeButtonClick = (activeSizeIndex) => {
        this.setState({
            activeSizeIndex,
            activeImageIndex: 0
        })
    }


    handleAddToCart = () => {
        const { product } = this.props

        // todo вынеси это отдельными функциями для получения и внутри карточке
        //  избавляемся от дублирования кода
        const { activeSizeIndex } = this.state

        // todo add it to new
        //   activeAdditionalProducts: [],

        const image = product.sizes[activeSizeIndex].image
        const sizePrice = product.sizes[activeSizeIndex].price
        const sizeTitle = product.sizes[activeSizeIndex].title


        // todo вынеси это отдельной функцией,
        //  чтобы ключи объекты были стандартизированы и прозрачны
        const newProduct = {
            id: product.id,
            title: product.title,
            image: image,
            options: {
                // grass: {
                //    title: grassItem.title,
                //    price: grassItem.price
                // },
                // box: {
                //    title: boxItem.title,
                //    price: boxItem.price
                // }
            },
            size: sizeTitle,
            price: sizePrice // + grassItem.price + boxItem.price
        }
        this.props.addToCart(newProduct)
    }

    handleAdditiveButtonClick = (id, button) => {
        this.setState(prev => ({
            selectedAdditives: {
                ...prev.selectedAdditives,
                [`additive_${id}`]: button.price
            }
        }))
    }

    handleSetIndexImage = (index) => (e) => {
        this.setState({
            activeImageIndex: index
        })
    }

    handleFullScreenPhotoClose = () => {
        this.setState({
            fullScreenPhotoIsOpen: false
        })
    }


    componentDidMount() {
        const { id, fetchProduct } = this.props
        fetchProduct(id)
    }

    render() {
        const { product, bySizesFilterSelected } = this.props
        console.log('product', product)

        // todo Понять как сделать редирект на 404
        // this.props.goToLink('/404')
        if (!product) return <Preloader/>
        // if (!product) return history.push('/404')


        const {
            fullScreenPhotoIsOpen,
            selectedAdditives,
            activeImageIndex
            // activeAdditionalProducts
        } = this.state
        let { activeSizeIndex } = this.state
        const { florist, additives, sizes } = product


        const activeSizeIndexFromRouter = useQuery().get("activeSizeIndex")
        if (isNumber(activeSizeIndexFromRouter))
            activeSizeIndex = activeSizeIndexFromRouter

        // Устанавливаем первый размер, который был выбран в фильтре
        // (берется первое найденное вхождение, размеры товаров уже
        // должны быть остортированы по возрастанию (по человеческому
        // восприятию) (на сервере это сортировка по productSizes title))
        // СРАБОТАЕТ ТОЛЬКО ПРИ ПЕРВОМ РЕНДЕРЕ КОМПОНЕНТА (activeSizeIndex === undefined)
        if (activeSizeIndex === undefined) {
            if (
              product &&
              bySizesFilterSelected &&
              bySizesFilterSelected.length
            ) {
                const found = product.sizes.findIndex(({ title }) => bySizesFilterSelected.includes(title))
                activeSizeIndex = found >= 0 ? found : 0
            } else {
                activeSizeIndex = 0
            }
        }

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
          .entries(selectedAdditives)
          .reduce((total, [id, price]) => total + price, 0)

        const totalPrice = activeSize.price
          + totalSelectedAdditives
        // + this.getTotalPriceAdditionalProducts()


        return (
          <div className="row mt-2">
              <div className={cn('col-md-5', styles.photo)}>
                  <div className={styles.photoSizeTitle}>
                      «{activeSize.title}»
                  </div>

                  <img
                    src={activeImage}
                    onClick={() => this.setState({ fullScreenPhotoIsOpen: true })}
                    alt=""
                  />

                  {fullScreenPhotoIsOpen && (
                    <Lightbox
                      mainSrc={images[activeImageIndex]}
                      onCloseRequest={this.handleFullScreenPhotoClose}
                      {...lightBoxProps}
                    />
                  )}

                  {activeSize.images.length > 1 && (
                    activeSize.images.map((img, i) => (
                      <div key={i} className={cn(styles.thumb, i > 0 && "ml-2",
                        activeImageIndex === i && styles.active)}>
                          <img src={img} onClick={this.handleSetIndexImage(i)} alt=""/>
                      </div>
                    ))
                  )}

                  <div className="d-none d-lg-block d-xl-block">
                      <FloristSay
                        photo={florist.photo}
                        name={florist.name}
                        text={florist.text}
                      />
                  </div>

                  <div className="d-none d-lg-block d-xl-block">
                      <FlowersInstruction/>
                  </div>
              </div>
              <div className={cn('col-md-7', styles.usn)}>
                  <h1>{product.title}</h1>

                  <Available
                    fast={activeSize.fast}
                    isDetails={true}
                  />

                  {this.renderSizesButtons(product.sizes, activeSizeIndex)}

                  <SizeInformer
                    className={styles.sizeInformer}
                    diameter={activeSize.diameter}
                  />

                  {additives && additives.length > 0 && (
                    additives.map(additive =>
                      <Additive
                        {...additive}
                        key={additive.id}
                        onButtonClick={this.handleAdditiveButtonClick}
                      />
                    ))}


                  {/*// todo Выделение и подсчет доп товара*/}
                  {/*// todo Добавление товара в корзину*/}

                  {/*<p className={styles.btitle}>Приятные мелочи</p>*/}
                  {/*<AdditionalProducts*/}
                  {/*activeIds={this.getAdditionalProductsIds()}*/}
                  {/*onClick={this.handleAdditionalProductClick}*/}
                  {/*/>*/}

                  <br/>
                  <h1>{totalPrice.toLocaleString('ru-RU')} <RoubleSymbol/></h1>


                  <div
                    className={styles.addToCartBtn}
                    onClick={this.handleAddToCart}>
                      В корзину
                  </div>

                  <div className="d-lg-none d-xl-none">
                      <FloristSay
                        photo={florist.photo}
                        name={florist.name}
                        text={florist.text}
                      />
                  </div>

                  {activeSize.flowers && (
                    <ExpandBlock title="Состав композиции" initVisible={true}>
                        {this.renderFlowers(activeSize.flowers, activeSize.flowers_counts)}
                    </ExpandBlock>
                  )}

                  <DeliveryInfo/>

                  <div className="d-lg-none d-xl-none">
                      <FlowersInstruction/>
                  </div>

              </div>
          </div>
        )
    }
}

// todo СДЕЛАЙ ТО, ЧТО НАПИСАНО ВО ВКЛАДКАХ СПРАВА
// https://codesandbox.io/s/github/reduxjs/redux/tree/master/examples/shopping-cart?from-embed

const
  mapStateToProps = (state, props) => {
      console.log(props)

      return {
          // slug: slugFromUrlSelector(state),
          product: activeProductSelector(state),
          bySizesFilterSelected: getFilterSelectedByKey(state, 'bySizes')
          // product: productSelector(state, props.id)
      }
  }

const
  mapDispatchToProps = ({
      fetchProduct,
      addToCart: cartProductAdd
  })

// todo https://stackoverflow.com/questions/49213602/how-to-get-id-params-to-redux-action-from-react-router
// todo use it

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(ProductDetailsContainer)