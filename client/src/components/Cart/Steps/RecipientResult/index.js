import React from 'react'
import styles from 'components/Cart/cart.module.sass'

const RecipientResult = ({
   recipient_name,
   recipient_phone,
   iamResipient,
   iDontKnowRecipientNumber,
   postcard,
   postcardText,
   children
}) => (
      <div className={styles.result}>
         {children}

         {iamResipient && (
            <p>Получаю сам</p>
         )}
         {!iamResipient && (
            <p>{recipient_name}</p>
         )}
         {!iamResipient && iDontKnowRecipientNumber && (
            <p>Не знаю номер получателя</p>
         )}
         {!iDontKnowRecipientNumber && (
            <p>{recipient_phone}</p>
         )}
         {postcard ? (
            <p>
               <span>Текст открытки: </span>
               {postcardText}
            </p>
         ) : (
               <p>Без открытки</p>
            )}
      </div>
   )

export default RecipientResult