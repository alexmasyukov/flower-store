import React from 'react'
import styles from './Button.module.sass'
import cn from 'classnames'

const Button = ({
                  title = '[title]',
                  active = false,
                  onClick = f => f
                }) =>
  <li
    className={cn(styles.btn, active && styles.active)}
    onClick={onClick}
  >
    {title}
  </li>


export default Button