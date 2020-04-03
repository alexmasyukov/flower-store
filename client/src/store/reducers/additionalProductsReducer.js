import {
  FETCH_ADDITIONAL_PRODUCTS_SUCCESS
} from "store/actionTypes"

const initialState = {
  byId: {},
  allIds: []
}

const additionalProductsReducer = (state = initialState, action) => {
  switch (action.type) {
    case FETCH_ADDITIONAL_PRODUCTS_SUCCESS:
      // console.log(action.response)
      const { entities , result } = action.response
      return {
        byId: { ...entities.items },
        allIds: [...result]
      }

    default:
      return state
  }
}

export default additionalProductsReducer