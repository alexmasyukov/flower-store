import React, { useState } from 'react'
// import styles from './Details.module.sass'

const Details = ({ children }) => {
  const [visible, setVisible] = useState(true)

  return (
    <div>
      <h4 onClick={() => setVisible(!visible)}>Состав композиции</h4>
      {visible && (
        children
      )}
    </div>
  )
}

export default Details