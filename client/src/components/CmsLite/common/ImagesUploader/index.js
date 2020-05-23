import React, { useState } from 'react'

const ImagesUploader = ({field, form, uploadImages}) => {
    const [isLoading, setIsLoading] = useState(false)

    return (
      <>
          {isLoading && (
            <div className="col-md-12 mb-2">
                Загрузка изображения...
            </div>
          )}

          <div className="col-md-12 mt-3">
              <label htmlFor="files" className="btn">Загрузить фото</label>
              <input id="files" type="file" accept="image/*"
                     onChange={(event) => {
                         setIsLoading(true)

                         uploadImages(event.currentTarget.files[0])
                           .then(result => {
                               setIsLoading(false)
                               form.setFieldValue(field.name, result.lg[0])
                           })
                     }}/>
          </div>
      </>
    )
}

export default ImagesUploader