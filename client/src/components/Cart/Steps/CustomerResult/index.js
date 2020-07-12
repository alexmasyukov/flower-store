import React from 'react'
import { phoneToTextFormat } from "utils"
import styles from 'components/Cart/cart.module.sass'

const CustomerResult = ({ name, phone = '', children }) => (
  <div className={styles.result}>
    <p>{name}</p>
    <p>{phoneToTextFormat(phone)}</p>

    {children}
  </div>
)

export default CustomerResult