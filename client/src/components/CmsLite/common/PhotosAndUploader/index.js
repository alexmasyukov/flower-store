import React, { useState } from 'react'
import { Row } from "components/Bootstrap"

const Image = ({ getImage, name, onDelete = false }) => (
  <div className="col-3">
      <img src={getImage(name)} alt="" style={{ width: '100%' }}/>
      {name}
      <br/>
      {onDelete && (
        <button className="mt-2" onClick={onDelete}>Удалить</button>
      )}
  </div>
)


const PhotosAndUploader = ({ field, form, getImage, uploadImages }) => {
    const [isLoading, setIsLoading] = useState(false)

    const handleDelete = (index) => (e) => {
        e.preventDefault()
        if (!window.confirm("Удалить?")) return
        const items = field.value.filter((item, i) => i !== index)
        form.setFieldValue(field.name, items)
    }

    return (
      <Row>
          {Array.isArray(field.value) ? (
            field.value.map((img, i) => <Image key={i} getImage={getImage} name={img} onDelete={handleDelete(i)}/>)
          ) : (
            <Image getImage={getImage} name={field.value}/>
          )}

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
                               if (Array.isArray(field.value)) {
                                   form.setFieldValue(field.name, [...field.value, result.lg[0]])
                               } else {
                                   form.setFieldValue(field.name, result.thumb[0])
                               }
                               setIsLoading(false)
                           })
                     }}/>
          </div>
      </Row>
    )
}

export default PhotosAndUploader