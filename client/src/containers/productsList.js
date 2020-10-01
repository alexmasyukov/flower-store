import React, { Component } from 'react'
// import propTypes from 'prop-types'
import { connect } from "react-redux"
import { compose } from "redux"
import { fetchProducts } from "store/actions/productsActions"
import {
  getFilteredProducts,
  getStatusSizesFilter,
  getStatusPriceFilter,
  getSizesAndPriceSelectedFilters,
  getTypeAvailabilityFilter, getStatusAvailabilityFilter
} from "store/selectors/products"
import Product from "components/Product"
import { Row } from "components/Bootstrap"
import Preloader from "components/Preloader"
import withApiService from "components/hoc/withApiService"
import { AVAILABLE_TYPES, CITIES } from "constants/common"
import { when } from "utils"
import withRouterParams from "components/hoc/withRouterParams"
import withCity from "components/hoc/withCity"

// import CollectionsButtons from "components/Filter/CollectionsButtons"


class ProductsList extends Component {
  // static propTypes = {
  //     products: propTypes.array.isRequired
  // }

  static defaultProps = {
    products: []
  }

  setActiveFirstSizeInProduct = (products) => {
    console.warn('call setActiveFirstSizeInProduct', products)
    return products.map(({ sizes, ...base }) => ({
      ...base,
      sizes: sizes.map((size, i) => ({
        ...size,
        active: (i === 0)
      }))
    }))
  }

  setActiveSizesInProducts = (products, selected, checkCallback) => {
    console.warn('call setActiveSizesInProducts', products)
    return products.map(product => {
      // let firstActiveSizeIndex = false
      const sizes = product.sizes.map((size, i) => {
        size.active = checkCallback(size, selected)

        // if (size.active && firstActiveSizeIndex === false)
        //     firstActiveSizeIndex = i

        return size
      })

      return {
        ...product,
        sizes
        // firstActiveSizeIndex // ключ для быстрого получения индекса размера
        // для отображения фото
      }
    })
  }

  filterProductsSizesByAvailableType(type) {
    return function(products) {
      console.warn('typeOfAvailabilityFilter', type, products)

      const filterFunctions = {
        [AVAILABLE_TYPES.BASE]: (size) => size.fast === false,
        [AVAILABLE_TYPES.FAST]: (size) => size.fast === true
      }
      return products.map(({ sizes, ...base }) => ({
        ...base,
        sizes: sizes.filter(filterFunctions[type])
      }))
    }
  }

  prepareProducts = (products) => {
    const {
      isActiveSizesFilter,
      isActivePriceFilter,
      isActiveAvailabilityFilter,
      typeOfAvailabilityFilter,
      selectedFilters
    } = this.props

    return products

    // return compose(
    //   (products) => {
    //     console.warn('4 result', products)
    //     return products
    //   },
    //   (products) => {
    //     console.warn('3 isActiveSizesFilter || setActiveFirstSizeInProduct', products)
    //     if (isActiveSizesFilter) {
    //       return this.setActiveSizesInProducts(
    //         products,
    //         selectedFilters.bySizes,
    //         (size, selected) => selected.includes(size.title)
    //       )
    //     }
    //     // return this.setActiveFirstSizeInProduct(products)
    //     return products
    //   },
    //   (products) => {
    //     console.warn('2 isActivePriceFilter', products)
    //     if (isActivePriceFilter) {
    //       return this.setActiveSizesInProducts(
    //         products,
    //         selectedFilters.bySizesPrice,
    //         (size, selected) => {
    //           const [min, max] = selected
    //           console.log(size.price, min, max, size.price >= min, size.price <= max)
    //           return size.price >= min && size.price <= max
    //         })
    //     }
    //     return products
    //   },
    //   when(isActiveAvailabilityFilter, this.filterProductsSizesByAvailableType(typeOfAvailabilityFilter)),
    //   this.setActiveFirstSizeInProduct
    // )(products)
  }

  componentDidMount() {
    const { city } = this.props
    // todo МАЙ Вызываться может с датой date_25
    this.props.fetchProducts(city.id)
  }

  render() {
    const {
      products,
      isActiveSizesFilter,
      isActivePriceFilter,
      typeOfAvailabilityFilter,
      selectedFilters,
      getThumbImage,
      city
    } = this.props

    if (!products.length) return <h1>Ничего не найдено</h1>

    // todo products должны приходить из redux УЖЕ ЗАГРУЖЕННЫЕ
    //  этот компонент должен отвечать только за отображение
    const preparedProducts = this.prepareProducts(products)

    console.log('isActiveSizesFilter', isActiveSizesFilter)
    console.log('isActivePriceFilter', isActivePriceFilter)
    console.log('typeOfAvailabilityFilter', typeOfAvailabilityFilter)
    console.log('selectedFilters', selectedFilters)
    console.log('products', products)
    console.log('preparedProducts', preparedProducts)

    return (
      <Row>
        {/*<div className={'col-12'}>*/}
        {/*<CollectionsButtons collections={collections}/>*/}
        {/*</div>*/}
        {preparedProducts.map(product => (
          <Product
            key={product.id}
            cityName={city.eng}
            getThumbImage={getThumbImage}
            firstActiveSizeIndex={product.sizes.findIndex(size => size.active === true)}
            {...product}
          />
        ))}
      </Row>
    )
  }
}


const mapApiMethodsToProps = (apiService) => ({
  getThumbImage: apiService.getThumbImage
})


const mapStateToProps = state => ({
  products: getFilteredProducts(state),
  isActiveSizesFilter: getStatusSizesFilter(state),
  isActivePriceFilter: getStatusPriceFilter(state),
  isActiveAvailabilityFilter: getStatusAvailabilityFilter(state),
  typeOfAvailabilityFilter: getTypeAvailabilityFilter(state),
  selectedFilters: getSizesAndPriceSelectedFilters(state)
})

const mapDispatchToProps = {
  fetchProducts
}

const ProductListContainer = compose(
  withCity,
  withRouterParams,
  withApiService(mapApiMethodsToProps),
  connect(
    mapStateToProps,
    mapDispatchToProps
  )
)(ProductsList)

export default ProductListContainer
