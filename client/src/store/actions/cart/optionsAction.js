import { CART_PRODUCT_OPTION_DELETE } from "store/actionTypes"

export const cartProductOptionDelete = (id, optionKey) => ({
  type: CART_PRODUCT_OPTION_DELETE,
  id,
  optionKey
})