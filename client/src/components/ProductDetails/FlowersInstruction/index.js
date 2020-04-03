import React, { useState } from 'react'

const FlowersInstruction = () => {
  const [visible, setVisible] = useState(false)


  return (
    <div>
      <h4 onClick={() => setVisible(!visible)}>Инструкция свежести</h4>
      {
        visible && (
          <>
            Инструкция вот здесь будет оформленная
          </>
        )
      }

    </div>
  )
}

export default FlowersInstruction