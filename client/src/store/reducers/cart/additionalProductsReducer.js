import {
  CART_ADDITIONAL_PRODUCT_ADD, CART_ADDITIONAL_PRODUCT_DECREASE, CART_ADDITIONAL_PRODUCT_INCREASE,
  CART_ADDITIONAL_PRODUCT_REMOVE,
  CART_ADDITIONAL_PRODUCTS_CLEAR,
} from "store/actionTypes"
import itemReducer from "store/reducers/cart/itemReducer"

const initialState = {
  byId: {
    id0: {
      id: 'id0',
      title: 'Modern clear vase',
      image: 'https://bon-pion.ru/images/virtuemart/product/resized/1547237481_45756504_550x550.jpg',
      price: 900,
      count: 1
    }
  },
  allIds: ['id0']
}


const byIdReducer = (state, action) => {
  switch (action.type) {
    case CART_ADDITIONAL_PRODUCT_INCREASE:
    case CART_ADDITIONAL_PRODUCT_DECREASE:
      const additionalProduct = state[action.id]

      return {
        ...state,
        [action.id]: itemReducer(additionalProduct, action)
      }

    case CART_ADDITIONAL_PRODUCT_REMOVE:
      const { [action.id]: _, ...withoutKey } = state
      return { ...withoutKey }

    case CART_ADDITIONAL_PRODUCT_ADD:
      return {
        ...state,
        [action.product.id]: {
          ...action.product,
          count: 1
        }
      }

    case CART_ADDITIONAL_PRODUCTS_CLEAR:
      return {}

    default:
      return state
  }
}

const allIdsReducer = (state, action) => {
  switch (action.type) {
    case CART_ADDITIONAL_PRODUCT_REMOVE:
      return state.filter(id => id !== action.id)

    case CART_ADDITIONAL_PRODUCT_ADD:
      return [...state, action.product.id]

    case CART_ADDITIONAL_PRODUCTS_CLEAR:
      return []

    default:
      return state
  }
}


const additionalProductsReducer = (state = initialState, action) => ({
  byId: byIdReducer(state.byId, action),
  allIds: allIdsReducer(state.allIds, action)
})

export default additionalProductsReducer