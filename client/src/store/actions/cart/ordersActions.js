import {
  FETCH_CONFIM_REQUEST,
  FETCH_CONFIM_SUCCESS,
  FETCH_CONFIM_FAILURE,
  FETCH_ORDER_ADD_REQUEST,
  FETCH_ORDER_ADD_SUCCESS,
  FETCH_ORDER_ADD_FAILURE
} from "store/actionTypes"
import {
  fetchConfim as fetchConfimApi,
  saveOrder as saveOrderApi
} from 'api'


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


export const requestOrderSend = () => ({
  type: FETCH_ORDER_ADD_REQUEST
})

export const successOrderSend = ({data}) => ({
  type: FETCH_ORDER_ADD_SUCCESS,
  id: data.result
})

export const failureOrderSend = error => ({
  type: FETCH_ORDER_ADD_FAILURE,
  error: error.response.data
})


export const sendOrder = (data) => async (dispatch) => {
  console.log('action sendOrderApi', data)
  dispatch(requestOrderSend())
  try {
    const response = await saveOrderApi(data)
    dispatch(successOrderSend(response))
  } catch (e) {
    dispatch(failureOrderSend(e))
  }
}


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