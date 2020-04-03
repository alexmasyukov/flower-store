import React from 'react'
import Input from "components/Cart/Common/Input"
import Textarea from "components/Cart/Common/Textarea"
import styles from 'components/Cart/cart.module.sass'

const RecipientForm = ({
                          iamResipient,
                          name,
                          phone,
                          iDontKnowRecipientNumber,
                          postcard,
                          postcardText,
                          onInputChange,
                          children
                       }) => (
   <div className={styles.form}>
      <Input
         label="Я получатель"
         type="checkbox"
         checked={iamResipient}
         onChange={onInputChange('recipient.iamResipient')}/>

      {!iamResipient && (
         <>
            <Input
               placeholder="Имя получателя"
               value={name}
               onChange={onInputChange('recipient.name')}/>

            <Input
               label="Я не знаю номер получателя"
               type="checkbox"
               checked={iDontKnowRecipientNumber}
               onChange={onInputChange('recipient.iDontKnowRecipientNumber')}/>

            {!iDontKnowRecipientNumber && (
               <Input
                  placeholder="Телефон получателя"
                  value={phone}
                  onChange={onInputChange('recipient.phone')}/>
            )}
         </>
      )}

      <Input
         label="Бесплатная открытка"
         type="checkbox"
         checked={postcard}
         onChange={onInputChange('recipient.postcard')}/>

      {postcard && (
         <Textarea
            max={100}
            value={postcardText}
            onChange={onInputChange('recipient.postcardText')}/>
      )}

      {children}
   </div>
)

export default RecipientForm