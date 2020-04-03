import {
   FETCH_ORDER_CONFIRMATION_REQUEST,
   FETCH_ORDER_CONFIRMATION_SUCCESS,
   FETCH_ORDER_CONFIRMATION_FAILURE
} from "store/actionTypes"
import { fetchOrderConfirmation as fetchOrderConfirmationApi } from 'api'


export const requestOrderConfirmation = () => ({
   type: FETCH_ORDER_CONFIRMATION_REQUEST
})


export const successOrderConfirmation = ({code}) => ({
   type: FETCH_ORDER_CONFIRMATION_SUCCESS,
   code
})


export const failureOrderConfirmation = error => ({
   type: FETCH_ORDER_CONFIRMATION_FAILURE,
   error
})


export const fetchOrderConfirmation = () => async (dispatch, getState) => {
   // так можно проверить кешированные данные
   // const { posts } = getState()
   // if (posts[userId]) {
   //    // There is cached data! Don't do anything.
   //    return
   // }

   console.log('action fetchOrderConfirmation')
   dispatch(requestOrderConfirmation())
   try {
      const response = await fetchOrderConfirmationApi()
      dispatch(successOrderConfirmation(response))
   } catch (e) {
      dispatch(failureOrderConfirmation(e))
   }
}