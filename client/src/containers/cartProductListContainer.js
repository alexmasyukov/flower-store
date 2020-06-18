import React, { Component } from 'react'
import { connect } from "react-redux"
import cn from 'classnames'
// import Preloader from "components/Preloader"
import RoubleSymbol from "components/UI/RoubleSymbol"
import {
   cartProductsSelector,
   getCustomerPoints,
   getDeliveryCost,
   totalPriceSelector,
   getDeliveryDate
} from "store/selectors/cart"
import {
   cartProductDecrease,
   cartProductIncrease,
   cartProductDelete
} from "store/actions/cart/productsActions"
import { cartProductOptionDelete } from "store/actions/cart/optionsActions"
import FlowersList from 'components/Common/FlowersList'
// import { additionalProductsEntitiesSelector } from "store/selectors/additionalProducts"
// import { deliveryDateSelector } from "store/selectors/ui"
// import {
//    cartAdditionalProductAdd,
//    cartAdditionalProductDecrease,
//    cartAdditionalProductIncrease,
//    cartAdditionalProductRemove
// } from "store/actions/cart/additionalProductsActions"

import styles from 'components/Cart/cart.module.sass'

// import pMinDelay from "p-min-delay"
// pMinDelay(import('containers/additionalProductsContainer'), 100)

// const fallback = () => (
//    <div>Loading...</div>
// )

// const AdditionalProducts = loadable(() =>
//    import('containers/additionalProductsContainer'), {
//    fallback: fallback()
// })


const DeleteBtn = ({ onClick }) => (
   <button onClick={onClick}>x</button>
)

// const Options = ({ id, box, grass, onDelete }) => (
//    <div className={styles.options}>
//       {box && (
//          <div>
//             {box.title} коробка (+{box.price} <RoubleSymbol/>)
//             <ButtonDeleteOption
//                onClick={() => onDelete(id, 'box')}/>
//          </div>
//       )}
//       {grass && (
//          <div>
//             {grass.title} зелени (+{grass.price} <RoubleSymbol/>)
//             <ButtonDeleteOption
//                onClick={() => onDelete(id, 'grass')}/>
//          </div>
//       )}
//    </div>
// )

// state = {
//    pay: 'Наличными при получении'
// }



class CartProductList extends Component {
   handleProductDelete = (id) => () => this.props.onProductDelete(id)
   handleProductIncrease = (id) => () => this.props.onProductIncrease(id)
   handleProductDecrease = (id) => () => this.props.onProductDecrease(id)
   handleOptionDelete = (id, optionId) => () => this.props.onProductOptionDelete(id, optionId)
   handleChange = (key, value) => this.setState({ [key]: value })

   // handleRemoveAdditionalItem = id => this.props.onRemoveAdditionalItem(id)

   // getAdditionalProductsIds = () => this.props.additionalProducts.map((item) => item.id)

   // handleAdditionalProductIncrease = id => {
   //    this.props.onIncreaseAdditionalItem(id)
   // }

   // handleAdditionalProductDecrease = id => {
   //    this.props.onDecreaseAdditionalItem(id)
   // }


   // handleAdditionalProductClick = ({ id }) => {
   //    // todo Fix it
   //    const product = this.props.additionalProductsEntities.byId[id]
   //    // console.log(product)
   //    this.props.onAddAdditionalProduct({
   //       ...product
   //    })
   // }


   // renderAdditionalProductsInCart = (...arg) =>
   //    this.renderProductsInCart(this.props.deliveryDate, ...arg)


   renderProducts = () => {
      const { products } = this.props
      console.log(products)

      return products.length > 0 && products.map(({
         id = 0,
         title = '[title]',
         diameter,
         image = '',
         options,
         size = {
            title: '[size title]',
            price: 0
         },
         flowers = [],
         unavailable = [],
         count = 1,
         optionsCost = 0
      }) => {
         const unavailableProduct = unavailable.includes(1) //deliveryDate
         const total = (size.price + optionsCost) * count

         return (
            <div key={id}
               className={cn(styles.product, 'row', unavailableProduct && styles.unavailable, 'align-items-start', 'justify-content-between')}>
               <div className="col-2 pr-1">
                  <img src={image} alt={title} style={{ maxWidth: '100%' }} />
               </div>
               <div className={cn('col-7 pl-2', 'col-xs-8', styles.title)}>
                  <p>{title}</p>
                  <span className={styles.sizeLabel}>{size.title}{diameter && `, ${diameter} см`}</span>
                  {options && (
                     <div className={styles.options}>
                        {options.map(({ id: optionId, cart_title, button = '', price }) => (
                           <div key={optionId}>
                              {cart_title}{button && `: ${button}`} (+{price} <RoubleSymbol />)
                              {count > 1 && ` × ${count}`}
                              <button
                                 onClick={this.handleOptionDelete(id, optionId)}>×</button>
                           </div>
                        ))}
                     </div>)}

                  {flowers && <div className={styles.flowers}>{flowers.join(', ')}</div>}

                  {/* {unavailableProduct && (
                     <p className={styles.unavailable}>Не доступен на {deliveryDate}</p>
                  )} */}
               </div>
               <div className={cn('col-3', styles.panel)}>
                  <div className={cn(styles.price)}>
                     {total.toLocaleString('ru-RU')} <RoubleSymbol />
                  </div>
                  <div className={styles.counter}>
                     <button onClick={this.handleProductDecrease(id)} disabled={count === 1}>-</button>
                     {count}
                     <button onClick={this.handleProductIncrease(id)}>+</button>
                  </div>
                  <div>
                     <button className={styles.remove} onClick={this.handleProductDelete(id)}>Удалить</button>
                  </div>
               </div>
               <div className={styles.hr} />
            </div>
         )
      })
   }

   render() {
      const { products, totalPrice, deliveryCost, deliveryDate, points } = this.props

      if (!products.length) return <h1>Загрузка</h1>

      //, 'justify-content-center'
      return (
         <div className={styles.productList}>
            {this.renderProducts(products)}

            {/*{!!additionalProducts.length && (*/}
            {/*<h3>Приятные мелочи</h3>*/}
            {/*)}*/}
            {/* {
               this.renderAdditionalProductsInCart(
                  additionalProducts,
                  this.handleAdditionalProductIncrease,
                  this.handleAdditionalProductDecrease,
                  this.handleRemoveAdditionalItem
               )
            } */}

            <p className={styles.allCost}>
               Товары: <b>{totalPrice.toLocaleString('ru-RU')} <RoubleSymbol /></b>
            </p>

            <p className={styles.allCost}>Доставка: <b>{deliveryCost.toLocaleString('ru-RU')} <RoubleSymbol /></b></p>
            <p className={styles.allCost}>Бонусы: <b>{points.toLocaleString('ru-RU')} <RoubleSymbol /></b></p>
            <p className={styles.itog}>Итого: <b>{totalPrice.toLocaleString('ru-RU')} <RoubleSymbol /></b></p>


            {/* .toLocaleString('ru-RU') */}
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
   products: cartProductsSelector(state),
   points: getCustomerPoints(state),
   deliveryCost: getDeliveryCost(state),
   deliveryDate: getDeliveryDate(state),
   totalPrice: totalPriceSelector(state)

   // additionalProducts: getAdditionalItemsSelector(state),
   // additionalProductsEntities: additionalProductsEntitiesSelector(state),

})


const CartProductListContainer = connect(
   mapStateToProps,
   {
      onProductIncrease: cartProductIncrease,
      onProductDecrease: cartProductDecrease,
      onProductDelete: cartProductDelete,
      onProductOptionDelete: cartProductOptionDelete,
      // onAddAdditionalProduct: cartAdditionalProductAdd,
      // onIncreaseAdditionalItem: cartAdditionalProductIncrease,
      // onDecreaseAdditionalItem: cartAdditionalProductDecrease,
      // onRemoveAdditionalItem: cartAdditionalProductRemove,
   }
)(CartProductList)

export default CartProductListContainer