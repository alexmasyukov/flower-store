import {
   DELIVERY_DATE_SET, DELIVERY_MODAL_CART_QUESTION_HIDE, DELIVERY_MODAL_CART_QUESTION_SHOW,
   DELIVERY_MODAL_HIDE,
   DELIVERY_MODAL_SHOW
} from "store/actionTypes"
import { formatDateDMY } from "utils"
import addDays from "date-fns/addDays"

const initialState = {
   modalVisible: false,
   modalCartQuestion: false,
   date: formatDateDMY(new Date()),
   // date: formatDateDMY(addDays(new Date(), 3)),
   time: null
}

const deliveryReducer = (state = initialState, action) => {
   switch (action.type) {
      case DELIVERY_DATE_SET:
         return {
            ...state,
            date: action.date,
            modalVisible: false,
         }

      case DELIVERY_MODAL_SHOW:
         return {
            ...state,
            modalVisible: true
         }

      case DELIVERY_MODAL_HIDE:
         return {
            ...state,
            modalVisible: false
         }

      case DELIVERY_MODAL_CART_QUESTION_SHOW:
         return {
            ...state,
            modalCartQuestion: true
         }

      case DELIVERY_MODAL_CART_QUESTION_HIDE:
         return {
            ...state,
            modalCartQuestion: false
         }



      default:
         return state
   }
}

export default deliveryReducer