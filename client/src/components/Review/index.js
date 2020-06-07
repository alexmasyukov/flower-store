import React from 'react'
import styles from './Review.module.sass'
import cn from 'classnames'
import { getAvailableDate } from "utils"

const Review = ({
                    name = '',
                    telegram = '',
                    instagram = '',
                    text = '',
                    created_at = '',
                    className = ''
                }) => {
    const date = new Date(created_at)

    return (
      <div className={cn(styles.review, className)}>
          <div className={styles.name}>
              {telegram && <a target="_blank" href={`http://t.me/${telegram.replace('@', '')}`}>{telegram}</a>}
              {instagram && <a target="_blank" href={`http://instagram.com/${instagram.replace('@', '')}`}>{instagram}</a>}
              {name && <b>{name}</b>}
              <span>{getAvailableDate(date, true)}</span>
          </div>

          {text}
      </div>
    )
}

export default Review