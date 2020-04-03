import React from 'react'
import { DELIVERY_IS } from "constants/common"
import styles from "components/Cart/cart.module.sass"

const DeliveryResult = ({
                           is,
                           courierDirection,
                           children
                        }) => (
   <div className={styles.result}>
      {children}

      {is === DELIVERY_IS.COURIER ? (
         <>
            <p>
               {courierDirection.street}, {courierDirection.house}, {courierDirection.flat}
            </p>
            {courierDirection.comment && (
               <>
                  <hr/>
                  <p>{courierDirection.comment}</p>
               </>
            )}

         </>
      ) : (
         <>
            <p>Чита, ...адрес</p>
            <div>Карта</div>
         </>
      )}
   </div>
)

export default DeliveryResult