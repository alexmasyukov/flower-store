import React from 'react'
import styles from "components/Cart/cart.module.sass"
import { getAvailableDate } from 'utils'

const Wrap = ({ children }) =>
   <div className={styles.result}>
      {children}
   </div>

const DeliveryTimeResult = ({
   date = new Date(),
   time = '',
   comment = '',
   askRecipient = false,
   children
}) => {
   const [timeText, price] = time.split('*')

   if (askRecipient === true) {
      return (
         <Wrap>
            {children}
            Узнать время у получателя

            {comment && <p style={{marginTop: 20}}>Комментарий: {comment}</p>}
         </Wrap>
      )
   }

   return (
      <Wrap>
         {children}
         <p>{getAvailableDate(date, true)}</p>
         <p>{timeText.replace('\n', '')}</p>
         <br />
         <p>Стоимость: {price ? `${price}₽` : 'рассчитывается индивидуально'}</p>
         {comment && <p>Комментарий: {comment}</p>}
      </Wrap>
   )
}

export default DeliveryTimeResult