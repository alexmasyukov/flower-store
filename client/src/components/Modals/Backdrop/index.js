import React from 'react'
import styles from 'components/Modals/common.module.sass'
import cn from 'classnames'

const Backdrop = ({isVisible}) => {
   return (
      <div className={cn(styles.modalBackdrop, !isVisible && styles.hide)}> </div>
   )
}

export default Backdrop