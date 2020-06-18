import React from "react"
import styles from "components/Cart/cart.module.sass"

const NextButton = ({ onClick, title = 'Продолжить' }) => (
   <button className={styles.nextButton} onClick={onClick}>{title}</button>
)

export default NextButton