import { combineReducers } from "redux"
import products from "store/reducers/cart/productsReducer"
import delevery from "store/reducers/cart/deleveryReducer"
import customer from "store/reducers/cart/customerReducer"
import confim from "store/reducers/cart/confimReducer"
import order from "store/reducers/cart/orderReducer"
// import additionalProducts from "store/reducers/cart/additionalProductsReducer"

export default combineReducers({
  products,
  delevery,
  customer,
  order,
  confim
  // additionalProducts,
})