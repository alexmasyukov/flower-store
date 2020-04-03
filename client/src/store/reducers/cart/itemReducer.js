import {
  CART_ADDITIONAL_PRODUCT_DECREASE,
  CART_ADDITIONAL_PRODUCT_INCREASE,
  CART_PRODUCT_DECREASE,
  CART_PRODUCT_INCREASE
} from "store/actionTypes"

const itemReducer = (state = {}, action) => {
  switch (action.type) {
    case CART_PRODUCT_INCREASE:
    case CART_ADDITIONAL_PRODUCT_INCREASE:
      return {
        ...state,
        count: ++state.count
      }

    case CART_PRODUCT_DECREASE:
    case CART_ADDITIONAL_PRODUCT_DECREASE:
      if (state.count === 1) return state
      return {
        ...state,
        count: --state.count
      }
  }
}

export default itemReducer