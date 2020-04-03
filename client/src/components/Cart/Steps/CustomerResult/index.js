import React from 'react'
import styles from 'components/Cart/cart.module.sass'

const CustomerResult = ({ name, phone, children }) => (
   <div className={styles.result}>
      {children}
      <p>{name}</p>
      <p>{phone}</p>
   </div>
)

export default CustomerResult