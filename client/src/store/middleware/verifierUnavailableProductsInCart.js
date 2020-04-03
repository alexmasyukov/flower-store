import { DELIVERY_DATE_SET } from "store/actionTypes"
import { showCartQuestionModal } from "store/actions/uiActions"

/**
 * UI
 *
 *
 * @param store
 * @returns {function(*): Function}
 */
const verifierUnavailableProductsInCart = store => next => action => {
   if (action.type === DELIVERY_DATE_SET) {
      let result = next(action)

      const state = store.getState()
      const deliveryDate = state.ui.delivery.date
      const productsInCart = state.ui.cart.products.byId

      console.log(state)
      console.log(deliveryDate)
      console.log(productsInCart)

      Object.values(productsInCart).forEach(product => {
         if (product.unavailable.includes(deliveryDate)) {
            console.log(product)
            result = next(showCartQuestionModal())
            return result
         }
      })
   }

   return next(action)
}

export default verifierUnavailableProductsInCart