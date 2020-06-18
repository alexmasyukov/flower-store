import {
   FETCH_CONFIM_REQUEST,
   FETCH_CONFIM_SUCCESS,
   FETCH_CONFIM_FAILURE
} from "store/actionTypes"
import { fetchConfim as fetchConfimApi } from 'api'


export const requestConfim = () => ({
   type: FETCH_CONFIM_REQUEST
})


export const successConfim = (response) => ({
   type: FETCH_CONFIM_SUCCESS,
   data: response.data
})


export const failureConfim = error => ({
   type: FETCH_CONFIM_FAILURE,
   error: error.response.data
})


export const fetchConfim = (customer) => async (dispatch, getState) => {
   // так можно проверить кешированные данные
   // const { posts } = getState()
   // if (posts[userId]) {
   //    // There is cached data! Don't do anything.
   //    return
   // }

   console.log('action fetchOrderConfirmation', customer)
   dispatch(requestConfim())
   try {
      const response = await fetchConfimApi(customer)
      dispatch(successConfim(response))
   } catch (e) {
      dispatch(failureConfim(e))
   }
}