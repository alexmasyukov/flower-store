import React, { useState } from "react"
import cn from "classnames"
import styles from "components/Cart/cart.module.sass"

const InfoPopover = ({ title, text }) => {
   const [show, setShow] = useState(false)
   return (
      <span className={styles.popover}>
         <span
            className={styles.number}
            onMouseEnter={() => setShow(true)}
            onMouseOut={() => setShow(false)}
         >?
         </span>
         <span className={cn(styles.popup, show && styles.show)}>
            <b>{title}</b>
            {text}
         </span>
      </span>
   )
}

export default InfoPopover