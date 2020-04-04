import React from 'react'
import styles from './ColorButton.module.sass'
import { classes } from "utils"

const ColorButton = ({
                       id = false,
                       color = '',
                       active = false,
                       title = '',
                       onClick
                     }) =>
  <li
    style={{ background: color }}
    className={classes(
      styles.btn,
      active && styles.active,
      color === 'miltiply' && styles.btnAllColor,
    )}
    onClick={() => onClick(id)}
  >{color === 'miltiply' && 'Разноцветный'}</li>

export default ColorButton