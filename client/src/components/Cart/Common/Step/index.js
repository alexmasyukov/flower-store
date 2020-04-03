import React from 'react'
import styles from 'components/Cart/cart.module.sass'
import cn from "classnames"

const Step = ({
                 title,
                 number,
                 active,
                 children
              }) => (
   <div className={styles.step}>
      <p className={cn(
         styles.blockTitle,
         active && styles.active
      )}>
         <span className={styles.number}>{number}</span>
         {title}
      </p>
      {children}
   </div>
)


export default Step