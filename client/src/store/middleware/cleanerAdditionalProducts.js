import { CART_PRODUCT_REMOVE } from "store/actionTypes"
import { cartAdditionalProductsClear } from "store/actions/cart/additionalProductsActions"

/**
 * UI
 * Удаляет все дополнительные товары в корзине (additionalProducts),
 * если пользователь удалил все основные товары (products)
 * (так как заказ становиться бессмысленным)
 *
 * @param store
 * @returns {function(*): Function}
 */
const cleanerAdditionalProducts = store => next => action => {
  if (action.type === CART_PRODUCT_REMOVE) {
    let result = next(action)
    const nextState = store.getState()

    if (!nextState.ui.cart.products.length) {
      result = next(cartAdditionalProductsClear())
      return result
    }
  }

  return next(action)
}

export default cleanerAdditionalProducts