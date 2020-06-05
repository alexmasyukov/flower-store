import React from 'react'
import cn from 'classnames'
import styles from "components/ProductDetails/Additive/Additive.module.sass"
import RoubleSymbol from "components/UI/RoubleSymbol"

const AdditiveButton = ({ button: title, price, isActive, onClick }) => {
    return (
      <div
        className={cn(styles.button, isActive && styles.active)}
        onClick={onClick}
      >
          {title}
          {price > 0 && (
            <> (+{price} <RoubleSymbol/>)</>
          )}
      </div>
    )
}

export default AdditiveButton