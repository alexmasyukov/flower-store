import React from "react"
import styles from "components/Cart/cart.module.sass"

const NextButton = ({ onClick }) => (
   <button className={styles.nextButton} onClick={onClick}>Продолжить</button>
)

export default NextButton