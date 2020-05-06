import React, { Component } from 'react'
import { Field, FieldArray, Form, Formik } from "formik"
import * as Yup from "yup"
import axios from 'axios'

class Cmslite_SizeForm extends Component {
    state = {
        imgIsLoading: false
    }

    getEntitiesByType(eType) {
        return this.props.entities.filter(item => item.eType === eType)
    }

    render() {
        const { imgIsLoading } = this.state
        const { data, entities } = this.props

        return (
          <Formik
            initialValues={{
                id: data.id,
                city_id: data.city_id,
                product_id: data.product_id,
                public: data.public,
                order: data.order,
                title: data.title,
                price: data.price,
                diameter: data.diameter,
                // flowers_count: data.flowers_count,
                images: data.images
            }}
            validationSchema={Yup.object({
                title: Yup.string()
                  .max(15, 'Must be 15 characters or less')
                  .required('Required')
            })}
            onSubmit={(values, { setSubmitting }) => {
                setTimeout(() => {
                    alert(JSON.stringify(values, null, 2))
                    setSubmitting(false)
                }, 400)
            }}
            render={({ values }) => (
              <Form>
                  <Field name="title" as="select">
                      {this.getEntitiesByType('size').map(({ id, value }) => (
                        <option key={id} value={id}>{value}</option>
                      ))}
                  </Field>

                  <Field name="public" as="select">
                      <option value={0}>Да</option>
                      <option value={1}>Нет</option>
                  </Field>

                  <Field name="diameter" as="input" type="number" placeholder="Диаметр"/>
                  <Field name="price" as="input" type="number" placeholder="Цена"/>

                  <b>Фото</b>
                  <FieldArray
                    name="images"
                    render={arrayHelpers => (
                      <div>
                          {/*{values.images && values.images.length > 0 ? (*/}
                          {values.images.map((image, index) => (
                            <div key={index}>
                                <img src={`/api/static/${image}`} alt="" style={{ width: 100 }}/>
                                <Field name={`images.${index}`}/>
                                <button
                                  type="button"
                                  onClick={() => arrayHelpers.remove(index)} // remove a friend from the list
                                >-
                                </button>
                            </div>
                          ))}

                          {imgIsLoading && 'Загрузка изображения...'}

                          <input type="file" accept="image/*" onChange={(event) => {
                              this.setState({
                                  imgIsLoading: true
                              })

                              // this.setState({"file": event.currentTarget.files[0]})}
                              const data = new FormData()
                              data.append('attachments', event.currentTarget.files[0])
                              axios.post("http://localhost/api/upload/", data, {
                                  headers: { 'Content-Type': 'multipart/form-data' }
                              })
                                .then(res => { // then print response status
                                    console.log('res')
                                    arrayHelpers.push(res.data.result.thumb)
                                    this.setState({
                                        imgIsLoading: false
                                    })
                                })
                                .catch(errors => {
                                    alert('Ошибка при загрузке изображения. Попробуйте другое изображение.')
                                    console.log(errors)
                                    console.log(errors.response.data)
                                })
                          }}/>

                          <div>
                              <button type="submit">Submit</button>
                          </div>
                      </div>
                    )}
                  />
                  images
                  {/*todo api PUT /product-sizes/:id/public*/}
                  {/*todo api DELETE  /product-sizes/:id/image/:id*/}
                  {/*http://localhost/api/static/aa322644-4e45-418f-a8e4-43f8da841de2_lg.png*/}

                  <button type="submit">Submit</button>
              </Form>
            )}
          />
        )
    }
}

export default Cmslite_SizeForm