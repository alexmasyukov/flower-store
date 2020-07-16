import {
  CART_DELIVERY_COST_SET,
  CART_DELIVERY_POINTS_SET,
  CART_DELIVERY_POSTCARD_SET
} from "store/actionTypes"

const initialState = {
  points: 0,
  cost: 0,
  postcard: 0
}

export default (state = initialState, { type, ...payload }) => {
  switch (type) {
    case CART_DELIVERY_POINTS_SET:
    case CART_DELIVERY_COST_SET:
    case CART_DELIVERY_POSTCARD_SET:
      return {
        ...state,
        ...payload
      }

    default:
      return state
  }
}
