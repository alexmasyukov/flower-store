import React from 'react'
import styles from './FloristSay.module.sass'

const FloristSay = ({ photo, name, text}) => {
    return (
      <div className={styles.floristSay}>
          <img className="respon" src={photo} alt={name}/>
          <div>
              <b>{name}, флорист «Клумба»</b>
              <i>«{text}»</i>
          </div>
      </div>
    )
}

export default FloristSay