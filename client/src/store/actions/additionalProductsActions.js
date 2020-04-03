import {
  FETCH_ADDITIONAL_PRODUCTS_REQUEST,
  FETCH_ADDITIONAL_PRODUCTS_SUCCESS ,
  FETCH_ADDITIONAL_PRODUCTS_FAILURE
} from "store/actionTypes"
import { fetchAdditionalProducts as fetchAdditionalProductsApi } from "api"
import { normalize } from "normalizr"
import * as schema from "store/schemas/productsSchema"

export const requestAdditionalProducts = () => ({
  type: FETCH_ADDITIONAL_PRODUCTS_REQUEST
})


export const successAdditionalProducts = (response) => ({
  type: FETCH_ADDITIONAL_PRODUCTS_SUCCESS,
  response
})


export const failureAdditionalProducts = error => ({
  type: FETCH_ADDITIONAL_PRODUCTS_FAILURE,
  error
})


export const fetchAdditionalProducts = () => async dispatch => {
  console.log('fetchAdditionalProducts')
  dispatch(requestAdditionalProducts())
  try {
    const response = await fetchAdditionalProductsApi()
    dispatch(
      successAdditionalProducts(normalize(response, schema.items))
    )
  } catch (e) {
    dispatch(failureAdditionalProducts(e))
  }
}