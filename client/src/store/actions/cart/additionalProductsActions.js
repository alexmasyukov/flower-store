import {
  CART_ADDITIONAL_PRODUCT_ADD,
  CART_ADDITIONAL_PRODUCT_DECREASE,
  CART_ADDITIONAL_PRODUCT_INCREASE,
  CART_ADDITIONAL_PRODUCT_REMOVE, CART_ADDITIONAL_PRODUCTS_CLEAR
} from "store/actionTypes"

export const cartAdditionalProductAdd= (product) => ({
  type: CART_ADDITIONAL_PRODUCT_ADD,
  product
})

export const cartAdditionalProductIncrease = id => ({
  type: CART_ADDITIONAL_PRODUCT_INCREASE,
  id
})

export const cartAdditionalProductDecrease = id => ({
  type: CART_ADDITIONAL_PRODUCT_DECREASE,
  id
})

export const cartAdditionalProductRemove = id => ({
  type: CART_ADDITIONAL_PRODUCT_REMOVE,
  id
})

export const cartAdditionalProductsClear = () => ({
  type: CART_ADDITIONAL_PRODUCTS_CLEAR
})

