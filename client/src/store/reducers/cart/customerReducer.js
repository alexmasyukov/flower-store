import { CART_CUSTOMER_POINTS_SET } from "store/actionTypes"

const initialState = {
  points: 0
}

export default (state = initialState, { type, points }) => {
  switch (type) {
    case CART_CUSTOMER_POINTS_SET:
      return {
        ...state,
        points
      }

    default:
      return state
  }
}
