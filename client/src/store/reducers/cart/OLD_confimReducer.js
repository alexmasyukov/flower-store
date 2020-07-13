import {
   FETCH_CONFIM_REQUEST,
   FETCH_CONFIM_SUCCESS,
   FETCH_CONFIM_FAILURE
} from "store/actionTypes"

const initialState = {
   isLoading: false,
   error: null,
   data: null
}

const orderConfirmationReducer = (state = initialState, action) => {
   switch (action.type) {
      case FETCH_CONFIM_REQUEST:
         return {
            isLoading: true,
            status: action.type,
            error: null
         }

      case FETCH_CONFIM_SUCCESS:
          console.log('FETCH_CONFIM_SUCCESS', action)
          return {
             isLoading: false,
             error: null,
             data: action.data,
          }

      case FETCH_CONFIM_FAILURE:
         console.log('FETCH_CONFIM_FAILURE', action)
         return {
            isLoading: false,
            error: action.error,
            data: null
         }

      default:
         return state
   }
}

export default orderConfirmationReducer