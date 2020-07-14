import React, { useState } from 'react'

const ExpandBlock = ({ title = '', initVisible = false, children }) => {
  const [visible, setVisible] = useState(initVisible)

  return (
    <>
      <h4 onClick={() => setVisible(!visible)}>{title}</h4>
      {visible && children}
    </>
  )
}

export default ExpandBlock