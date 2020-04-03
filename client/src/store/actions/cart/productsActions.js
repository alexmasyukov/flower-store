import {
  CART_PRODUCT_ADD,
  CART_PRODUCT_DECREASE,
  CART_PRODUCT_INCREASE,
  CART_PRODUCT_REMOVE
} from "store/actionTypes"

export const cartProductIncrease = id => ({
  type: CART_PRODUCT_INCREASE,
  id
})

export const cartProductDecrease = id => ({
  type: CART_PRODUCT_DECREASE,
  id
})

export const cartProductRemove = (id) => ({
  type: CART_PRODUCT_REMOVE,
  id
})

export const cartProductAdd = (product) => ({
  type: CART_PRODUCT_ADD,
  product
})

// тип запроса - объект - действие
