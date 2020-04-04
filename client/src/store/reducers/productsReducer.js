import {
  FETCH_PRODUCT_REQUEST,
  FETCH_PRODUCTS_SUCCESS
} from "store/actionTypes"

const initialState = {
  byId: {},
  allIds: []
}

const productsReducer = (state = initialState, action) => {
  switch (action.type) {
    case FETCH_PRODUCTS_SUCCESS:
      const { entities , result } = action.response
      return {
        byId: { ...entities.items },
        allIds: [...result]
      }

    default:
      return state
  }
}

export default productsReducer
