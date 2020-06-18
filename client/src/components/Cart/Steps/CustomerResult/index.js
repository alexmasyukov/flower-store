import React from 'react'
import styles from 'components/Cart/cart.module.sass'

const CustomerResult = ({ name, phone, children }) => (
   <div className={styles.result}>
      <p>{name}</p>
      <p>{phone}</p>

      {children}
   </div>
)

export default CustomerResult