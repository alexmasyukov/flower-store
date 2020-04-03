import {
   DELIVERY_DATE_SET,
   DELIVERY_MODAL_CART_QUESTION_HIDE,
   DELIVERY_MODAL_CART_QUESTION_SHOW,
   DELIVERY_MODAL_SHOW
} from "store/actionTypes"
import { fetchProducts } from "store/actions/productsActions"

export function setDeliveryDate(date) {
   return {
      type: DELIVERY_DATE_SET,
      date
   }
}

export function showCartQuestionModal() {
   return {
      type: DELIVERY_MODAL_CART_QUESTION_SHOW
   }
}

export function hideCartQuestionModal() {
   return {
      type: DELIVERY_MODAL_CART_QUESTION_HIDE
   }
}

export function showDeliveryModal() {
   return {
      type: DELIVERY_MODAL_SHOW
   }
}

export const setDeliveryDateAndFetchProductsexport = (date) => async dispatch => {
   console.log('action setDeliveryDateAndFetchProductsexport')

   dispatch(setDeliveryDate(date))
   dispatch(fetchProducts(date))

   //todo: дописать try catch
}