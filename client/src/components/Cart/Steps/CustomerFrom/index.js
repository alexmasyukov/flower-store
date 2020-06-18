import React from 'react'
import Input from "components/Cart/Common/Input"
import styles from 'components/Cart/cart.module.sass'

const CustomerForm = ({ name, phone, onInputChange, children }) => (
   <div className={styles.form}>
      <Input
         placeholder="Имя"
         value={name}
         onChange={onInputChange('customer.name')} />
      <Input
         placeholder="Мобильный телефон"
         value={phone}
         onChange={onInputChange('customer.phone')} />

      <p className={styles.blockText}> Ваши данные – это тайна.
         Получателю доступен только текст открытки
         (её можно написать далее)</p>

      {children}
   </div>
)

export default CustomerForm