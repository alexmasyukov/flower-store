import { createSelector } from "reselect"

const getCostProductOptions = (options) =>
  options.reduce((total, { price }) => total + price, 0)

const getCartProducts = state => state.ui.cart.products

export const cartProductsSelector = createSelector(
  getCartProducts,
  (products) => products.map(product => ({
    ...product,
    optionsCost: getCostProductOptions(product.options)
  })))

const productsOptionsCostSelector = createSelector(
  cartProductsSelector,
  (products) => products.reduce((total, { count, options }) =>
    total + getCostProductOptions(options) * count, 0))

const productsCostSelector = createSelector(
  cartProductsSelector,
  (products) => products.reduce((total, { count, size }) =>
    total + size.price * count, 0)
)

export const getDeliveryCost = (state) => state.ui.cart.delevery.cost
export const getDeliveryDate = (state) => state.ui.cart.delevery.date
export const getCustomerPoints = (state) => state.ui.cart.customer.points

export const totalPriceSelector = createSelector(
  [
    productsCostSelector,
    productsOptionsCostSelector,
    getDeliveryCost,
    getCustomerPoints
  ],
  (products, options, delivery, points) =>
    (products + options + delivery) - points
)

export const totalProductsCostSelector = createSelector(
  [
    productsCostSelector,
    productsOptionsCostSelector
  ],
  (products, options) => products + options
)

const getConfim = (state) => state.ui.cart.confim

export const confimSelector = createSelector(
  getConfim,
  (confim) => confim
)

const getOrder = (state) => state.ui.cart.order
export const orderSelector = createSelector(
  getOrder,
  (order) => order
)




// todo: так делать нормально? (2 вниз)
// const orderConfirmationSelector = state =>
//   state.ui.cart.orderConfirmation

// export const orderConfirmationSelector = createSelector(
//    [orderConfirmation],
//    (result) => result
// )

// todo: Проверить все эти селекторы на вызов и правильность использования

// const getCartProducts = state => state.ui.cart.products.byId
// const getProductsAllIds = state => state.ui.cart.products.allIds

// const cartAdditionalItemsSelector = state => state.ui.cart.additionalProducts.byId
// const cartAdditionalItemsAllIdsSelector = state => state.ui.cart.additionalProducts.allIds


// const getTotalByAdditives = (additives = {}) =>
//   Object.entries(additives)
//     .reduce((total, { price }) => total + price, 0)


// const totalProductPriceSelector = createSelector(
//   [cartItemsAllIdsSelector, cartItemsSelector],
//   (allIds, itemsById) => {
//     return allIds.reduce((total, id) => {
//       const product = itemsById[id]
//       const { count, price, options } = product
//       const totalByOptions = getTotalByOptions(options)
//       return total + ((price + totalByOptions) * count)
//     }, 0)
//   }
// )

// const totalAdditionalProductPriceSelector = createSelector(
//   [cartAdditionalItemsAllIdsSelector, cartAdditionalItemsSelector],
//   (allIds, itemsById) => {
//     return allIds.reduce((total, id) => {
//       const product = itemsById[id]
//       const { count, price } = product
//       return total + (count * price)
//     }, 0)
//   }
// )

// todo fix name this totalPrice
// export const totalSelector = createSelector(
//   totalProductPriceSelector,
//   totalAdditionalProductPriceSelector,
//   (productsTotal, AdditionalProductsTotal) =>
//     productsTotal + AdditionalProductsTotal
// )


// export const getAdditionalItemsSelector = createSelector(
//   [cartAdditionalItemsAllIdsSelector, cartAdditionalItemsSelector],
//   (allIds, itemsById) => allIds.map(id => itemsById[id])
// )

// export const allItemsCountsSelector = createSelector(
//   [getItemsSelector, getAdditionalItemsSelector],
//   (products, additionalProducts) => [...products, ...additionalProducts].length
// )