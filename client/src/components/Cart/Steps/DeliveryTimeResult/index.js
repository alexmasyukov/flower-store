import React from 'react'
import styles from "components/Cart/cart.module.sass"

const DeliveryTimeResult = ({
                               name,
                               askRecipient,
                               children
                            }) => {
   return (
      <div className={styles.result}>
         {children}

         <p>{name}</p>
         {askRecipient && (
            <p>Узнать время у получателя</p>
         )}
      </div>
   )
}

export default DeliveryTimeResult