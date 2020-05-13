import React, { useState } from 'react'
import { Row } from "components/Bootstrap"

const PhotoAndUploader = ({ field, form, getImage, uploadImages }) => {
    const [isLoading, setIsLoading] = useState(false)

    return (
      <Row>
          <div className="col-md-3">
              <img src={getImage(field.value)} alt=""
                   style={{ width: '100%' }}/>
              {field.value}
          </div>

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
                               form.setFieldValue('photo', result.thumb[0])
                               setIsLoading(false)
                           })
                     }}/>
          </div>
      </Row>
    )
}

export default PhotoAndUploader