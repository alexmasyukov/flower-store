import React from 'react'
import cn from 'classnames'
// import PropTypes from 'prop-types'
import RoubleSymbol from "components/UI/RoubleSymbol"

import styles from "./SizeTitle.module.sass"

const SizeTitle = ({
                       title = '[title]',
                       price = 0,
                       fast = false,
                       active = false,
                       onClick = () => {
                       }
                   }) => (
  <p onClick={onClick}
    className={cn(styles.title, active && styles.active, fast && styles.fast)}>
      {title} — {`\u0020`} <span className={styles.price}>
      {price} <RoubleSymbol/>
    </span>
      {fast && <span className={styles.fastTitle}>Собран</span>}
  </p>
)
//
// SizeTitle.propTypes = {
//     title: PropTypes.string.isRequired,
//     price: PropTypes.number.isRequired,
//     active: PropTypes.bool.isRequired
// }

export default SizeTitle
