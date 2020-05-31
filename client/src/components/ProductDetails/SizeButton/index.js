import React from 'react'
import styles from './SizeButton.module.sass'
import cn from 'classnames'

const SizeButton = ({
                        sizeIndex = 0,
                        title = '',
                        price = '',
                        isFast = false,
                        active = false,
                        onClick
                    }) => (
  <div
    className={cn(styles.button, active && styles.active, isFast && styles.fast)}
    onClick={() => onClick(sizeIndex)}
  >
      {title} <br/>
      {price} {`\u20BD`}
  </div>
)

export default SizeButton