import React from 'react'
import styles from './Available.module.sass'
import cn from 'classnames'

const Available = ({
                      isDetails = false,
                      expect = false,
                      fast = false,
                      small = false
                   }) => {

   let title = 'В наличии'
   if (fast) title = 'Готовый букет'

   if (isDetails) {
      title = 'В наличии, соберем за 90 минут'

      if (fast) {
         title = 'Без ожидания, букет уже собран'
      }
   }

   return (
      <p className={cn(
         styles.available,
         small && styles.small,
         fast && styles.fast
      )}>
         {title}
      </p>
   )
}


export default Available

