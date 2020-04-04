import { normalize } from "normalizr"
import {
  FETCH_PRODUCT_FAILURE,
  FETCH_PRODUCT_REQUEST,
  FETCH_PRODUCT_SUCCESS,
  FETCH_PRODUCTS_FAILURE,
  FETCH_PRODUCTS_REQUEST,
  FETCH_PRODUCTS_SUCCESS
} from "store/actionTypes"
import * as schema from "store/schemas/productsSchema"
import {
  fetchProducts as fetchProductsApi,
  fetchProduct as fetchProductApi,
} from 'api'


export const requestProducts = () => ({
  type: FETCH_PRODUCTS_REQUEST
})


export const successProducts = (response) => ({
  type: FETCH_PRODUCTS_SUCCESS,
  response
})


export const failureProducts = error => ({
  type: FETCH_PRODUCTS_FAILURE,
  error
})


export const requestProduct = () => ({
  type: FETCH_PRODUCT_REQUEST
})


export const successProduct = (response) => {
  console.log('successProduct', response)
  return {
  type: FETCH_PRODUCT_SUCCESS,
  response
}}


export const failureProduct = error => ({
  type: FETCH_PRODUCT_FAILURE,
  error
})


export const fetchProducts = (date) => async dispatch => {
  console.log('action fetchProducts')
  dispatch(requestProducts())
  try {
    const response = await fetchProductsApi(date)
    dispatch(
      successProducts(normalize(response, schema.items))
    )
  } catch (e) {
    dispatch(failureProducts(e))
  }
}

export const fetchProduct = (slug) => async dispatch => {
  // todo use it. Get product from state or from other API /product?slug=...

  // bookstoreService.getBooks()
  //   .then((data) => dispatch(booksLoaded(data)))
  //   .catch((err) => dispatch(booksError(err)));

  dispatch(requestProduct())
  try {
    const response = await fetchProductApi(slug)
    dispatch(
      successProduct(response)
    )
  } catch (e) {
    dispatch(failureProduct(e))
  }
}