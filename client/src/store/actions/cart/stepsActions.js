import {
  CART_DELIVERY_COST_SET,
  CART_DELIVERY_POINTS_SET,
  CART_DELIVERY_POSTCARD_SET
} from "store/actionTypes"

export const setCartDeliveryPoints = (points) => ({
  type: CART_DELIVERY_POINTS_SET,
  points
})

export const setCartDeliveryCost = (cost) => ({
  type: CART_DELIVERY_COST_SET,
  cost
})

export const setCartDeliveryPostcard = (postcard) => ({
  type: CART_DELIVERY_POSTCARD_SET,
  postcard
})