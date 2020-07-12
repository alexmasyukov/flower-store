import React from "react"
import styles from "components/Cart/cart.module.sass"

const NextButton = ({
                      onClick = () => {
                      },
                      title = 'Продолжить',
                      disabled = false
                    }) => (
  <button
    className={styles.nextButton}
    disabled={disabled}
    onClick={onClick}
  >
    {title}
  </button>
)

export default NextButton