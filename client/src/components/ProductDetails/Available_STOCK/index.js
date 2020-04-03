import React from 'react'
import styles from './Available.module.sass'
import { getAvailableDate } from "utils"


const Available = ({ now = true, fromDate = false, className = false }) => {
  const cls = [styles.available]
  className && cls.push(styles[className])
  !now && fromDate && cls.push(styles.no)
  return (
    <p className={cls.join(' ')}>
      {now && (
        'В наличии'
      )}
      {!now && fromDate && (
        <>Доступно с <b>{getAvailableDate(fromDate)}</b></>
      )}
    </p>
  )
}

export default Available

