import { combineReducers } from "redux"
import products from "store/reducers/cart/productsReducer"
import additionalProducts from "store/reducers/cart/additionalProductsReducer"
import orderConfirmation from "store/reducers/cart/orderConfirmationReducer"

export default combineReducers({
  products,
  additionalProducts,
  orderConfirmation
})