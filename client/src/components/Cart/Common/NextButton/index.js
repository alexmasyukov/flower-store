import React from "react"
import styles from "components/Cart/cart.module.sass"
import Preloader from "components/Preloader"

const NextButton = ({
                      onClick = () => {
                      },
                      title = 'Продолжить',
                      disabled = false,
                      isLoading = false
                    }) =>
  isLoading ? (
    <Preloader/>
  ) : (
    <button
      className={styles.nextButton}
      disabled={disabled}
      onClick={onClick}
    >
      {title}
    </button>
  )


export default NextButton