import React from 'react'
import styles from "components/Cart/cart.module.sass"
import { PAY_TYPES, DELIVERY_IS, PAY_TEXTS_BY_DELIVERY_IS } from 'constants/common'

const PayResult = ({
   children,
   delivery_is = DELIVERY_IS.COURIER,
   pay = PAY_TYPES.CARD,
   pay_comment,
}) => {
   return (
      <div className={styles.result}>
         <p>{PAY_TEXTS_BY_DELIVERY_IS[delivery_is][pay]}</p>

         {pay_comment && (
            <p style={{ marginTop: 20 }}>Комментарий к заказу: {pay_comment}</p>
         )}
         {children}
      </div>
   )
}

export default PayResult