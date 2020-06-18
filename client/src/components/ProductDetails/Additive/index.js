import React, { useState } from 'react'
import styles from 'components/ProductDetails/Additive/Additive.module.sass'
import AdditiveButton from "components/ProductDetails/Additive/AdditiveButton"

const Additive = ({ id, title, cart_title, data: buttons, onButtonClick }) => {
  const [activeIndex, setActiveIndex] = useState(0)
  const buttonClickHandler = (index, button) => (e) => {
    setActiveIndex(index)
    onButtonClick({ id, cart_title, ...button })
  }

  return (
    <div className={styles.additive}>
      <p className={styles.title}>{title}</p>
      {buttons.map((button, i) =>
        <AdditiveButton
          key={i}
          isActive={activeIndex === i}
          onClick={buttonClickHandler(i, button)}
          {...button}
        />
      )}
    </div>
  )
}

export default Additive