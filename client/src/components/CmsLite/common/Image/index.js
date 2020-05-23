import React from 'react'

const CmsImage = ({ field, form, getImage, canDelete }) => {
    return (
      <div className={'col-md-2'}>
          <img src={getImage(field.value)} alt="" style={{ width: '100%' }}/>
          {field.value}
          <br/>
          {canDelete && field.value && (
            <button
              type="button"
              onClick={() => {
                  const r = window.confirm("Удалить фото?")
                  if (r === true)
                      form.setFieldValue(field.name, '')
              }}
            >Удалить фото</button>
          )}
      </div>
    )
}

export default CmsImage