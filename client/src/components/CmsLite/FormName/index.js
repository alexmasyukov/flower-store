import React from 'react'

const FormName = ({ isNew }) => {
    return (
      <h1>
          {isNew ? 'Добавление' : 'Редактирование'}
      </h1>
    )
}

export default FormName