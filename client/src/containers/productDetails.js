import React, { Component } from 'react'
import { connect } from "react-redux"
import cn from 'classnames'
// import propTypes from "prop-types"
// import Page404 from "pages/404"
// import { getRouter } from "store/selectors/router"
// import { push } from 'connected-react-router'
// import loadable from "@loadable/component"
import Preloader from "components/Preloader"
import FloristSay from "components/ProductDetails/FloristSay"
import Available from "components/ProductDetails/Available"
import SizeButton from "components/ProductDetails/SizeButton"
import SizeInformer from "components/ProductDetails/SizeInformer"
import RoubleSymbol from "components/UI/RoubleSymbol"
import FlowersInstruction from "components/ProductDetails/FlowersInstruction"
import DeliveryInfo from "components/ProductDetails/DeliveryInfo"
import ExpandBlock from "components/ProductDetails/ExpandBlock"
import { slugFromUrlSelector } from "store/selectors/router"
import { fetchProduct } from "store/actions/productsActions"
import { activeProductSelector } from "store/selectors/product"
import { cartProductAdd } from "store/actions/cart/productsActions"
import styles from "./productDetails.module.sass"
import Additive from "components/ProductDetails/Additive"
import { Row } from "components/Bootstrap"
// import GrassPluserButton from "components/ProductDetails/GrassPluserButton"


// const fallback = () => (
//    <div>Loading...</div>
// )

// const AdditionalProducts = loadable(() =>
//   import('containers/additionalProductsContainer'),
//    fallback: fallback()
// })

// // todo fix it перенеси это конфигуратор товара, так как в ПУ
// //  будет чекбокс для указания, есть доп коробка и цена для нее
// //  считывать title в корзине нет смысла так как это не названия коробки
// const box = [
//    {
//       id: "id0",
//       price: 0,
//       title: "Нет"
//    },
//    {
//       id: "id0",
//       price: 1500,
//       title: "Да"
//    }
// ]

class ProductDetailsContainer extends Component {
    // static propTypes = {
    //   products: propTypes.array.isRequired
    // }

    static defaultProps = {
        product: {}
    }

    state = {
        activeSizeIndex: 0,
        activeImageIndex: 0,
        selectedAdditives: [],
        // activeGrassIndex: 0,
        // activeBoxIndex: 0,
        // activeAdditionalProducts: [],
        error: false
    }

    renderSizesButtons = (sizes) => {
        return (
          <div className={styles.sizesButtons}>
              {sizes.map((size, i) =>
                <SizeButton
                  key={i}
                  sizeIndex={i}
                  title={size.title}
                  price={size.price}
                  isFast={size.fast}
                  active={this.state.activeSizeIndex === i}
                  onClick={this.handleSizeButtonClick}
                />
              )}
          </div>
        )
    }


    // renderGrassPluserButtons = (grasses, activeIndex, onClick) => (
    //    <div className={styles.grassPluserButtons}>
    //       {grasses.map((button, i) =>
    //          <GrassPluserButton
    //             key={i}
    //             index={i}
    //             title={button.title}
    //             price={button.price}
    //             active={activeIndex === i}
    //             onClick={onClick}
    //          />
    //       )}
    //    </div>
    // )

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

    // getTotalPriceAdditionalProducts = () => {
    //    return this.state.activeAdditionalProducts.reduce(
    //       (total, current) => {
    //          if (Object.prototype.hasOwnProperty.call(current, 'price')) {
    //             return total + current.price
    //          } else {
    //             return total
    //          }
    //       }, 0)
    // }

    // getAdditionalProductsIds = () => {
    //    return this.state.activeAdditionalProducts.map(({ id }) => id)
    // }

    handleSizeButtonClick = (activeSizeIndex) => {
        this.setState({
            activeSizeIndex,
            activeImageIndex: 0
        })
    }

    // handleGrassButtonClick = (activeGrassIndex) => {
    //    this.setState({
    //       activeGrassIndex
    //    })
    // }

    // handleBoxButtonClick = (activeBoxIndex) => {
    //    this.setState({
    //       activeBoxIndex
    //    })
    // }

    // handleAdditionalProductClick = ({ id, price }) => {
    //    if (this.getAdditionalProductsIds().includes(id)) {
    //       this.setState(prevState => ({
    //          activeAdditionalProducts:
    //             prevState.activeAdditionalProducts.filter(item => item.id !== id)
    //       }))
    //    } else {
    //       const newItem = {
    //          id,
    //          price
    //       }
    //       this.setState(prevState => ({
    //          activeAdditionalProducts:
    //             [...prevState.activeAdditionalProducts, newItem]
    //       }))
    //    }
    // }

    handleAddToCart = () => {
        const { product } = this.props

        // todo вынеси это отдельными функциями для получения и внутри карточке
        //  избавляемся от дублирования кода
        const {
            activeSizeIndex
            // activeGrassIndex,
            // activeBoxIndex
        } = this.state

        // todo add it to new
        //   activeAdditionalProducts: [],

        const image = product.sizes[activeSizeIndex].image
        const sizePrice = product.sizes[activeSizeIndex].price
        const sizeTitle = product.sizes[activeSizeIndex].title
        // const grassItem = grass[activeGrassIndex]
        // const boxItem = box[activeBoxIndex]

        // console.log(grassItem)
        // console.log(boxItem)

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

    componentDidMount() {
        const { slug, fetchProduct } = this.props
        fetchProduct(slug)
    }

    render() {
        const { product } = this.props

        // todo Понять как сделать редирект на 404
        // this.props.goToLink('/404')
        // if (!isLoading) return <Page404 />
        if (!product) return <Preloader/>

        const {
            activeSizeIndex,
            selectedAdditives,
            activeImageIndex
            //activeGrassIndex, //activeBoxIndex
            // activeAdditionalProducts
        } = this.state
        const { florist, additives, sizes } = product

        const activeSize = sizes[activeSizeIndex]
        const activeImage = activeSize.images[activeImageIndex]
        // const activeGrass = grass[activeGrassIndex]
        // const activeBox = box[activeBoxIndex]

        const totalSelectedAdditives = Object
          .entries(selectedAdditives)
          .reduce((total, [id, price]) => total + price, 0)

        const totalPrice = activeSize.price
          + totalSelectedAdditives
        // + activeGrass.price
        // + this.getTotalPriceAdditionalProducts()
        // + activeBox.price

        return (
          <div className="row mt-2">
              <div className={`col-5 ${styles.photo}`}>
                  <div className={styles.photoSizeTitle}>
                      «{activeSize.title}»
                  </div>
                  <img src={activeImage} alt=""/>

                  <div>
                      {activeSize.images.map((img, i) => (
                        <div key={i} className={cn(styles.thumb, i > 0 && "ml-2",
                          activeImageIndex === i && styles.active)}>
                            <img src={img} onClick={this.handleSetIndexImage(i)} alt=""/>
                        </div>
                      ))}
                  </div>


                  <FloristSay
                    photo={florist.photo}
                    name={florist.name}
                    text={florist.text}
                  />

                  <FlowersInstruction/>
              </div>
              <div className={`col-7 ${styles.usn}`}>
                  <h1>{product.title}</h1>

                  <Available
                    fast={activeSize.fast}
                    isDetails={true}
                  />

                  {this.renderSizesButtons(product.sizes)}

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

                  {/*<p className={styles.btitle}>Добавить зелени?</p>*/}
                  {/*{this.renderGrassPluserButtons(*/}
                  {/*grass,*/}
                  {/*activeGrassIndex,*/}
                  {/*this.handleGrassButtonClick*/}
                  {/*)}*/}

                  {/*{product.title.includes('Сборный') && (*/}
                  {/*<>*/}
                  {/*<p className={styles.btitle}>Использовать бархатную коробку?</p>*/}
                  {/*{this.renderGrassPluserButtons(*/}
                  {/*box,*/}
                  {/*activeBoxIndex,*/}
                  {/*this.handleBoxButtonClick*/}
                  {/*)}*/}
                  {/*</>*/}
                  {/*)}*/}


                  {/*// todo Дополнительные фото к товару*/}
                  {/*// todo Выделение и подсчет доп товара*/}
                  {/*// todo Добавление товара в корзину*/}
                  {/*// todo  ОК  Дополнительная Каробка бархатная как трава*/}
                  {/*// todo Отзыв случайный*/}

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
                  {/*<p>Купить в один клик</p>*/}

                  {activeSize.flowers && (
                    <ExpandBlock title="Состав композиции" initVisible={true}>
                        {this.renderFlowers(activeSize.flowers, activeSize.flowers_counts)}
                    </ExpandBlock>
                  )}

                  <DeliveryInfo/>

              </div>
          </div>
        )
    }
}

// todo СДЕЛАЙ ТО, ЧТО НАПИСАНО ВО ВКЛАДКАХ СПРАВА

// https://codesandbox.io/s/github/reduxjs/redux/tree/master/examples/shopping-cart?from-embed

const mapStateToProps = state => ({
    slug: slugFromUrlSelector(state),
    product: activeProductSelector(state)
})

const mapDispatchToProps = ({
    fetchProduct,
    addToCart: cartProductAdd
})

// todo https://stackoverflow.com/questions/49213602/how-to-get-id-params-to-redux-action-from-react-router
// todo use it

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(ProductDetailsContainer)