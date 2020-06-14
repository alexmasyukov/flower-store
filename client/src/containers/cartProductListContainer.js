import React, { Component } from 'react'
import { connect } from "react-redux"
import cn from 'classnames'
import styles from 'components/Cart/cart.module.sass'
import Preloader from "components/Preloader"
import RoubleSymbol from "components/UI/RoubleSymbol"
import { getAdditionalItemsSelector, getItemsSelector, getTotalByOptions, totalSelector } from "store/selectors/cart"
import { cartProductDecrease, cartProductIncrease, cartProductRemove } from "store/actions/cart/productsActions"
import {
   cartAdditionalProductAdd,
   cartAdditionalProductDecrease,
   cartAdditionalProductIncrease,
   cartAdditionalProductRemove
} from "store/actions/cart/additionalProductsActions"
import { cartProductOptionDelete } from "store/actions/cart/optionsAction"
import loadable from "@loadable/component"
import { additionalProductsEntitiesSelector } from "store/selectors/additionalProducts"
import { deliveryDateSelector } from "store/selectors/ui"

// import pMinDelay from "p-min-delay"
// pMinDelay(import('containers/additionalProductsContainer'), 100)

const fallback = () => (
   <div>Loading...</div>
)

const AdditionalProducts = loadable(() =>
   import('containers/additionalProductsContainer'), {
   fallback: fallback()
})


const ButtonDeleteOption = ({ onClick }) => (
   <button onClick={onClick}>x</button>
)

const Options = ({ id, box, grass, onDelete }) => (
   <div className={styles.options}>
      {box && (
         <div>
            {box.title} коробка (+{box.price} <RoubleSymbol/>)
            <ButtonDeleteOption
               onClick={() => onDelete(id, 'box')}/>
         </div>
      )}
      {grass && (
         <div>
            {grass.title} зелени (+{grass.price} <RoubleSymbol/>)
            <ButtonDeleteOption
               onClick={() => onDelete(id, 'grass')}/>
         </div>
      )}
   </div>
)


class CartProductList extends Component {
   state = {
      name: '',
      phone: '',
      loading: false,
      labelWidth: 0,
      pay: 'Наличными при получении'
   }

   getAdditionalProductsIds = () => {
      return this.props.additionalProducts.map((item) => item.id)
   }

   handleRemoveItem = (id) => {
      this.props.onRemoveItem(id)
   }

   handleRemoveAdditionalItem = id => {
      this.props.onRemoveAdditionalItem(id)
   }

   handleProductIncrease = id => {
      this.props.onIncreaseItem(id)
   }

   handleProductDecrease = id => {
      this.props.onDecreaseItem(id)
   }

   handleAdditionalProductIncrease = id => {
      this.props.onIncreaseAdditionalItem(id)
   }

   handleAdditionalProductDecrease = id => {
      this.props.onDecreaseAdditionalItem(id)
   }

   handleChange = (stateKey, value) => {
      this.setState({
         [stateKey]: value
      })
   }

   handleDeleteOption = (id, optionKey) => {
      this.props.onDeleteOption(id, optionKey)
   }

   handleAdditionalProductClick = ({ id }) => {
      // todo Fix it
      const product = this.props.additionalProductsEntities.byId[id]
      // console.log(product)
      this.props.onAddAdditionalProduct({
         ...product
      })
   }

   getProductTotalPrice = (price, count, optionsTotal) => {
      return (price + optionsTotal) * count
   }


   renderProductsInCart = (deliveryDate, items, onIncrease, onDecrease, onRemove) =>
      items.map(({
                    unavailable = [],
                    id = 1,
                    image = '',
                    title = '[title]',
                    price = 0,
                    options = {},
                    size,
                    count = 1
                 }) => {
         console.log(deliveryDate, id, unavailable)
         // console.log()
         let unavailableProduct = false
         if (unavailable.includes(deliveryDate)) {
            unavailableProduct = true
         }

         return (
               <div key={id}
                    className={cn(styles.product, 'row', unavailableProduct && styles.unavailable, 'align-items-start', 'justify-content-between')}>
                  <div className="col-2 pr-1">
                     <img src={image} alt={title} style={{ maxWidth: '100%' }}/>
                  </div>
                  <div className={cn('col-6 pl-2', 'col-xs-8', styles.title)}>
                     <p>{title}</p>
                     <span>{size}</span>
                     <Options {...options} id={id} onDelete={this.handleDeleteOption}/>

                     {unavailableProduct && (
                        <p className={styles.unavailable}>Не доступен на {deliveryDate}</p>
                     )}
                  </div>
                  <div className={cn('col-4', styles.panel)}>
                     <div className={cn(styles.price)}>
                        {
                           this.getProductTotalPrice(
                              price,
                              count,
                              getTotalByOptions(options)
                           ).toLocaleString('ru-RU')
                        } <RoubleSymbol/>
                     </div>
                     <div className={styles.counter}>
                        <button onClick={() => onDecrease(id)} disabled={count === 1}>-</button>
                        {count}
                        <button onClick={() => onIncrease(id)}>+</button>
                     </div>
                     <div>
                        <button className={styles.remove} onClick={() => onRemove(id)}>Удалить</button>
                     </div>
                  </div>
                  <div className={styles.hr}/>
               </div>
         )
})


   renderAdditionalProductsInCart = (...arg) =>
      this.renderProductsInCart(this.props.deliveryDate, ...arg)


   render() {
      const { loading } = this.state
      const { deliveryDate } = this.props

      if (loading) return <Preloader/>

      const { products, additionalProducts, totalPrice } = this.props

      //, 'justify-content-center'
      return (
         <div className={cn('row', styles.productList)}>
            {
               this.renderProductsInCart(
                  deliveryDate,
                  products,
                  this.handleProductIncrease,
                  this.handleProductDecrease,
                  this.handleRemoveItem
               )
            }

            {/*{!!additionalProducts.length && (*/}
            {/*<h3>Приятные мелочи</h3>*/}
            {/*)}*/}
            {
               this.renderAdditionalProductsInCart(
                  additionalProducts,
                  this.handleAdditionalProductIncrease,
                  this.handleAdditionalProductDecrease,
                  this.handleRemoveAdditionalItem
               )
            }

            <p className={styles.allCost}>
                Товар: <b>{totalPrice.toLocaleString('ru-RU')} <RoubleSymbol/></b>
            </p>

            <p className={styles.allCost}>Доставка: <b>0 <RoubleSymbol/></b></p>
            <p className={styles.allCost}>Бонусы: <b>0 <RoubleSymbol/></b></p>
            <p className={styles.itog}>Итого: <b>{totalPrice.toLocaleString('ru-RU')} <RoubleSymbol/></b></p>

            {/*<h3>Рекомендуем к вашему заказу</h3>*/}
            {/*<AdditionalProducts*/}
            {/*activeIds={this.getAdditionalProductsIds()}*/}
            {/*onClick={this.handleAdditionalProductClick}*/}
            {/*/>*/}
         </div>
      )
   }
}


const mapStateToProps = state => ({
   products: getItemsSelector(state),
   additionalProducts: getAdditionalItemsSelector(state),
   additionalProductsEntities: additionalProductsEntitiesSelector(state),
   totalPrice: totalSelector(state),
   deliveryDate: deliveryDateSelector(state)
})


const CartProductListContainer = connect(
   mapStateToProps,
   {
      onIncreaseItem: cartProductIncrease,
      onDecreaseItem: cartProductDecrease,
      onRemoveItem: cartProductRemove,

      onAddAdditionalProduct: cartAdditionalProductAdd,
      onIncreaseAdditionalItem: cartAdditionalProductIncrease,
      onDecreaseAdditionalItem: cartAdditionalProductDecrease,
      onRemoveAdditionalItem: cartAdditionalProductRemove,

      onDeleteOption: cartProductOptionDelete

   }
)(CartProductList)

export default CartProductListContainer