import {
   FETCH_ORDER_CONFIRMATION_FAILURE,
   FETCH_ORDER_CONFIRMATION_REQUEST,
   FETCH_ORDER_CONFIRMATION_SUCCESS
} from "store/actionTypes"

const initialState = {
   isLoading: false,
   error: null,
   code: ''
}

const orderConfirmationReducer = (state = initialState, action) => {
   switch (action.type) {
      case FETCH_ORDER_CONFIRMATION_REQUEST:
         return {
            ...state,
            isLoading: true,
            error: null,
            code: '',
         }

      case FETCH_ORDER_CONFIRMATION_SUCCESS:
          return {
             ...state,
             isLoading: false,
             error: null,
             code: action.code
          }

      case FETCH_ORDER_CONFIRMATION_FAILURE:
         return {
            ...state,
            isLoading: false,
            error: action.error,
            code: ''
         }

      default:
         return state
   }
}

export default orderConfirmationReducer