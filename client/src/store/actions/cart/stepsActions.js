import { CART_CUSTOMER_POINTS_SET } from "store/actionTypes"

export const cartCustomerPointsSet = (points) => ({
  type: CART_CUSTOMER_POINTS_SET,
  points
})