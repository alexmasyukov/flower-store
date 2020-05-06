import React, { Component } from 'react'


import { ErrorMessage, Field, FieldArray, Form, Formik } from 'formik'
import * as Yup from 'yup'
import { compose } from "utils"
import withApiService from "components/hoc/withApiService"
import withData from "components/hoc/withData"
import withRouterParams from "components/hoc/withRouterParams"
import Cmslite_SizeForm from "components/CmsLite/SizeForm"


const ValidIndicator = ({ formik, field }) => (
  <>
      {formik.touched[field] && formik.errors[field] ? (
        <div>{formik.errors[field]}</div>
      ) : null}
  </>
)

const Input = ({ formik, field, label = false }) => (
  <>
      {label && <label htmlFor={field}>{label}</label>}
      <input name={field} {...formik.getFieldProps(field)} />
      <ValidIndicator formik={formik} field={field}/>
  </>
)

const FieldInput = ({ name, placeholder, as = "input" }) => {
    return (
      <Field name={name} placeholder={placeholder}>
          {({ field, form, meta }) => (
            <>
                <label htmlFor={field.name}>{placeholder}</label>
                {as === "textarea" ? (
                  <textarea rows={3} {...field} placeholder=""/>
                ) : (
                  <input type="input" {...field} placeholder=""/>
                )}
                {meta.touched &&
                meta.error && <div className="error">{meta.error}</div>}
            </>
          )}
      </Field>
    )
}

const productSchema = Yup.object({
    title: Yup.string()
      .min(2, 'Must be 2 characters or more')
      .max(255, 'Must be 255 characters or less')
      .required('Required'),
    florist_text: Yup.string()
      .min(30, 'Must be 30 characters or more')
      .required('Required'),
    shade: Yup.number()
      .moreThan(0, 'Выберете нужное')
      .required('Required'),
    sizes: Yup.array().of(
      Yup.object().shape({
          title: Yup.string().required('Заполните'),
          public: Yup.boolean().required(),
          price: Yup.number().required('Заполните').positive('Больше чем 0').integer(),
          flowers: Yup.array()
      })
    )
})

const emptyProductSize = {
    city_id: 1,
    product_id: 0,
    public: true,
    order: 0,
    title: "",
    price: "",
    diameter: "",
    flowers_count: [],
    images: []
}

const SizeButtons = ({ index, length, arrayHelpers }) => (
  <>
      <button
        type="button"
        onClick={() => {
            if (index > 0) arrayHelpers.swap(index, index - 1)
        }} // remove a friend from the list
      >
          Вверх
      </button>
      <button
        type="button"
        onClick={() => {
            if (index < length) arrayHelpers.swap(index, index + 1)
        }} // remove a friend from the list
      >
          Вниз
      </button>
      <button
        type="button"
        onClick={() => {
            const r = window.confirm("Удалить этот размер?")
            if (r === true) arrayHelpers.remove(index)
        }} // remove a friend from the list
      >
          Удалить размер
      </button>
      <br/>
  </>
)

class ProductForm extends Component {
    state = {
        entities: [],
        florists: []
    }

    componentDidMount() {
        this.props.getAllEntities()
          .then(res => {
              this.setState({
                  entities: res
              })
          })

        this.props.getAllFlorists()
          .then(res => {
              this.setState({
                  florists: res
              })
          })
    }

    getEntitiesByType(eType) {
        return this.state.entities.filter(item => item.eType === eType)
    }

    render() {
        const { data } = this.props
        const { entities, florists } = this.state
        const { sizes } = data

        return (
          <Formik
            initialValues={{
                id: data.id,
                title: data.title,
                public: data.public,
                florist_id: data.florist_id,
                florist_text: data.florist_text,
                slug: data.slug,
                color: data.color,
                stability: data.stability,
                shade: data.shade,
                packing: data.packing,
                flowers: data.flowers,
                sizes: data.sizes
            }}
            validationSchema={productSchema}
            onSubmit={(values, { setSubmitting }) => {
                alert(JSON.stringify(values, null, 2))
                setSubmitting(false)
            }}
            render={({ values }) => (
              <Form>
                  {/*<div className="row">*/}
                  {/*<Input formik={formik} field="title" label="Название"/>*/}
                  {/*<Input formik={formik} field="florist_text" label="Флорист говорит"/>*/}
                  {/*<Input formik={formik} field="slug" label="cpu"/>*/}
                  {/*<Input formik={formik} field="stability" label="Стойкость"/>*/}

                  <Field name="id">
                      {({ field }) => (
                        <p>ID: {field.value}</p>
                      )}
                  </Field>

                  <Field name="slug">
                      {({ field }) => (
                        <p>cpu: {field.value}</p>
                      )}
                  </Field>

                  <label>Название</label>
                  <Field name="title" placeholder="Название"/>
                  <ErrorMessage name="title"/>

                  <label>Флорист</label>
                  <Field name="florist_id" as="select">
                      <option value={0}>&nbsp;</option>
                      {florists.map(({ id, name }) => (
                        <option key={id} value={id}>{name} (id: {id})</option>
                      ))}
                  </Field>
                  <ErrorMessage name="florist_id"/>

                  <label>Флорист о композиции</label>
                  <Field name="florist_text" as="textarea" rows={4}/>
                  <ErrorMessage name="florist_text"/>

                  <label>Цвет</label>
                  <Field name="color" as="select">
                      <option value={0}>&nbsp;</option>
                      {this.getEntitiesByType('color').map(({ id, value }) => (
                        <option key={id} value={id}>{value}</option>
                      ))}
                  </Field>
                  <ErrorMessage name="color"/>

                  <label>Стойкость</label>
                  <Field name="stability" as="select">
                      <option value={0}>&nbsp;</option>
                      {this.getEntitiesByType('stability').map(({ id, value }) => (
                        <option key={id} value={id}>{value}</option>
                      ))}
                  </Field>
                  <ErrorMessage name="stability"/>

                  <label>Гамма</label>
                  <Field name="shade" as="select">
                      <option value={0}>&nbsp;</option>
                      {this.getEntitiesByType('shade').map(({ id, value }) => (
                        <option key={id} value={id}>{value}</option>
                      ))}
                  </Field>
                  <ErrorMessage name="shade"/>

                  <label>Оформление</label>
                  <Field name="packing" as="select">
                      <option value={0}>&nbsp;</option>
                      {this.getEntitiesByType('packing').map(({ id, value }) => (
                        <option key={id} value={id}>{value}</option>
                      ))}
                  </Field>
                  <ErrorMessage name="packing"/>

                  <label>Опубликовано</label>
                  <Field name="public" as="select">
                      <option value={true}>Да</option>
                      <option value={false}>Нет</option>
                  </Field>

                  {values.flowers && values.flowers.length > 0 && (
                    <FieldArray
                      name="flowers"
                      render={arrayHelpers => (
                        <div>
                            {values.flowers.map((flower, index) => (
                              <>
                                  <Field name={`flowers.${index}`} as="select">
                                      <option value={0}>&nbsp;</option>
                                      {this.getEntitiesByType('flower').map(({ id, value }) => (
                                        <option key={id} value={id}>{value}</option>
                                      ))}
                                  </Field>
                                  <ErrorMessage name={`flowers.${index}`}/>
                                  <br/>
                              </>
                            ))}

                            <button type="button" onClick={() => arrayHelpers.push(0)}>
                                + Добавить
                            </button>
                        </div>
                      )}
                    />
                  )}
                  available
                  collection
                  flowers
                  additionalProducts

                  <h2>Размеры</h2>

                  {/*{sizes.map(size => (*/}
                  {/*<Cmslite_SizeForm key={size.id} data={size} entities={entities}/>*/}
                  {/*))}*/}

                  {values.sizes && values.sizes.length > 0 && (
                    <FieldArray
                      name="sizes"
                      render={arrayHelpers => (
                        <div>
                            {values.sizes.map((size, index) => (
                              <div key={index}>
                                  <p><b>ID:</b> {size.id}</p>
                                  <SizeButtons index={index} length={values.sizes.length - 1}
                                               arrayHelpers={arrayHelpers}/>

                                  <label>Размер</label>
                                  <Field name={`sizes.${index}.title`} as="select">
                                      <option value={0}>&nbsp;</option>
                                      {this.getEntitiesByType('size').map(({ id, value }) => (
                                        <option key={id} value={id}>{value}</option>
                                      ))}
                                  </Field>
                                  <ErrorMessage name={`sizes.${index}.title`}/>

                                  <label>Диаметр букета</label>
                                  <Field name={`sizes.${index}.diameter`} type="number"/>

                                  <label>Цена</label>
                                  <Field name={`sizes.${index}.price`} type="number"/>
                                  <ErrorMessage name={`sizes.${index}.price`}/>

                                  <label>Опубликовано</label>
                                  <Field name={`sizes.${index}.public`} as="select">
                                      <option value={true}>Да</option>
                                      <option value={false}>Нет</option>
                                  </Field>

                                  flowers_count
                              </div>
                            ))}

                            <button type="button" onClick={() => arrayHelpers.push(emptyProductSize)}>
                                Добавить размер
                            </button>
                        </div>
                      )}
                    />
                  )}

                  {/*{this.state.entities.map(item => (*/}
                  {/*<div>{item.value}</div>*/}
                  {/*))}*/}
                  {/*<DatePicker formik={formik} field="available" label="Доступен"/>*/}
                  {/*</div>*/}


                  <button type="submit">Submit</button>
              </Form>
            )}
          />
        )
    }
}

const mapMethodsToProps = (apiService, props) => {
    return {
        getData: apiService.getProduct(props.id),
        getAllEntities: apiService.getAllEntities,
        getAllFlorists: apiService.getAllFlorists
        // updatePublicProductSize: apiService.updatePublicProductSize
    }
}


export default compose(
  withRouterParams,
  withApiService(mapMethodsToProps),
  withData
)(ProductForm)
