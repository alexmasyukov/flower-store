import React from "react"
import styles from "components/Cart/cart.module.sass"

const ChangeButton = ({ onClick }) => (
   <span className={styles.changeButton} onClick={onClick}>изменить</span>
)

export default ChangeButton