import React, { Component } from 'react'
import propTypes from 'prop-types'
import { connect } from "react-redux"
import { compose } from "redux"
import { fetchProducts } from "store/actions/productsActions"
import {
   getFilteredProducts,
   getStatusSizesFilter,
   getStatusPriceFilter,
   getSizesAndPriceSelectedFilters
} from "store/selectors/products"
import Product from "components/Product"
import { Row } from "components/Bootstrap"
import Preloader from "components/Preloader"
import CollectionsButtons from "components/Filter/CollectionsButtons"
import { date_25 } from "containers/TIME_date"


class ProductsListContainer extends Component {
   static propTypes = {
      products: propTypes.array.isRequired
   }

   static defaultProps = {
      products: []
   }

   setActiveFirstSizeInProduct = (products) => {
      return products.map(({ sizes, ...other }) => ({
         ...other,
         sizes: sizes.map((size, i) => {
            size.active = (i === 0)
            return size
         })
      }))
   }

   setActiveSizesInProducts = (products, selected, checkCallback) => {
      return products.map(product => {
         let firstActiveSizeIndex = false
         const sizes = product.sizes.map((size, i) => {
            size.active = checkCallback(size, selected)

            if (size.active && firstActiveSizeIndex === false)
               firstActiveSizeIndex = i

            return size
         })

         return {
            ...product,
            sizes,
            firstActiveSizeIndex // ключ для быстрого получения индекса размера
            // для отображения фото
         }
      })
   }

   componentDidMount() {
      this.props.fetchProducts(date_25)
   }

   render() {
      const {
         products,
         isActiveSizesFilter,
         isActivePriceFilter,
         selectedFilters
      } = this.props

      const preparedProducts = compose(
         (products) => isActiveSizesFilter ?
            this.setActiveSizesInProducts(
               products,
               selectedFilters.bySizes,
               (size, selected) => selected.includes(size.title)
            ) : this.setActiveFirstSizeInProduct(
               products
            ),

         (products) => isActivePriceFilter ?
            this.setActiveSizesInProducts(
               products,
               selectedFilters.bySizesPrice,
               (size, selected) => {
                  const [min, max] = selected
                  return size.price >= min && size.price <= max
               }
            ) : products
      )(products)

      // todo это должно приходить из redux,
      //  это должно быть отдельным экшеном начала загрузки
      //  (понять где это располагать в сторе)
      // сделать ui loading в redux
      if (!preparedProducts.length) return <Preloader/>

      //todo: замени это после встречи
      const collections = [
         { title: '23 февраля' },
         { title: '8 мая' },
         { title: 'Новый год' }
      ]

      return (
         <Row>
            {/*<div className={'col-12'}>*/}
               {/*<CollectionsButtons collections={collections}/>*/}
            {/*</div>*/}
            {preparedProducts.map(product => (
               <Product
                  key={product.id}
                  {...product}
                  showPriceAllSizes={true}
               />
            ))}
         </Row>
      )
   }
}

const mapStateToProps = state => ({
   products: getFilteredProducts(state),
   isActiveSizesFilter: getStatusSizesFilter(state),
   isActivePriceFilter: getStatusPriceFilter(state),
   selectedFilters: getSizesAndPriceSelectedFilters(state)
})

const mapDispatchToProps = {
   fetchProducts
}

export default connect(
   mapStateToProps,
   mapDispatchToProps
)(ProductsListContainer)