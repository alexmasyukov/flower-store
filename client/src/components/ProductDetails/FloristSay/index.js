import React from 'react'
import styles from './FloristSay.module.sass'
import { classes } from 'utils'

const FloristSay = ({ photo, name, text }) => {
  return (
    <div className={classes( styles.floristSay)}>
      <img className="respon" src={photo} alt={name}/>
      <div>
        <b>{name}, флорист «Клумба»</b>
        <i>«{text}»</i>
      </div>
    </div>
  )
}

export default FloristSay