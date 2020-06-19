import {
  FETCH_ORDER_ADD_REQUEST,
  FETCH_ORDER_ADD_SUCCESS,
  FETCH_ORDER_ADD_FAILURE
} from "store/actionTypes"

const initialState = {
  isLoading: false,
  error: null,
  id: 0,
  done: false
}

const orderReducer = (state = initialState, action) => {
  switch (action.type) {
    case FETCH_ORDER_ADD_REQUEST:
      console.log('FETCH_ORDER_ADD_REQUEST', action)
      return {
        isLoading: true,
        done: false,
        error: null
      }

    case FETCH_ORDER_ADD_SUCCESS:
      console.log('FETCH_ORDER_ADD_SUCCESS', action)
      return {
        isLoading: false,
        error: null,
        id: action.id,
        done: true
      }

    case FETCH_ORDER_ADD_FAILURE:
      console.log('FETCH_ORDER_ADD_FAILURE', action)
      return {
        isLoading: false,
        error: action.error,
        id: 0,
        done: false
      }

    default:
      return state
  }
}

export default orderReducer