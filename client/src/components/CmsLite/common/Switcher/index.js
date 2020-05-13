import React from 'react'

const Switcher = ({
                      title = '[title]',
                      id = '[id]',
                      isOn = false,
                      isLoading = false,
                      onSwitch
                  }) => (
  <label style={{
      opacity: isLoading ? 0.3 : 1,
      display: 'block',
      marginBottom: 10
  }}>
      <input
        className="mr-1"
        type="checkbox"
        checked={isOn}
        onChange={onSwitch}/>
      {isLoading ? 'Загрузка...' : title}
  </label>
)

export default Switcher