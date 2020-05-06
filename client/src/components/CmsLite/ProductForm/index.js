import React, { Component } from 'react'


import { Field, Form, Formik, useFormik } from 'formik'
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
        const { entities, florists  } = this.state
        const { sizes } = data

        return (
          <Formik
            initialValues={{
                title: data.title,
                public: data.public,
                florist_id: data.florist_id,
                florist_text: data.florist_text,
                slug: data.slug,
                color: data.color,
                stability: data.stability,
                shade: data.shade,
                packing: data.packing
            }}
            validationSchema={Yup.object({
                title: Yup.string()
                  .max(15, 'Must be 15 characters or less')
                  .required('Required'),
                lastName: Yup.string()
                  .max(20, 'Must be 20 characters or less')
                  .required('Required')
            })}
            onSubmit={(values, { setSubmitting }) => {
                setTimeout(() => {
                    alert(JSON.stringify(values, null, 2))
                    setSubmitting(false)
                }, 400)
            }}
          >
              <Form>
                  <div className="row">
                      {/*<Input formik={formik} field="title" label="Название"/>*/}
                      {/*<Input formik={formik} field="florist_text" label="Флорист говорит"/>*/}
                      {/*<Input formik={formik} field="slug" label="cpu"/>*/}
                      {/*<Input formik={formik} field="stability" label="Стойкость"/>*/}

                      <Field name="title" placeholder="Название"/>


                      <Field name="florist_id" as="select">
                          {florists.map(({ id, name }) => (
                            <option key={id} value={id}>{name} (id: {id})</option>
                          ))}
                      </Field>

                      <Field name="florist_text" as="textarea" placeholder="Флорист говорит " className="form-input"/>

                      <Field name="color" as="select">
                          {this.getEntitiesByType('color').map(({ id, value }) => (
                            <option key={id} value={id}>{value}</option>
                          ))}
                      </Field>


                      <Field name="stability" as="select">
                          {this.getEntitiesByType('stability').map(({ id, value }) => (
                            <option key={id} value={id}>{value}</option>
                          ))}
                      </Field>

                      <Field name="shade" as="select">
                          {this.getEntitiesByType('shade').map(({ id, value }) => (
                            <option key={id} value={id}>{value}</option>
                          ))}
                      </Field>

                      <Field name="packing" as="select">
                          {this.getEntitiesByType('packing').map(({ id, value }) => (
                            <option key={id} value={id}>{value}</option>
                          ))}
                      </Field>

                      <Field name="public" as="select">
                          <option value={0}>Да</option>
                          <option value={1}>Нет</option>
                      </Field>

                      <h2>Размеры</h2>

                      {sizes.map(size => (
                        <Cmslite_SizeForm key={size.id} data={size} entities={entities}/>
                      ))}

                      {/*{this.state.entities.map(item => (*/}
                      {/*<div>{item.value}</div>*/}
                      {/*))}*/}
                      {/*<DatePicker formik={formik} field="available" label="Доступен"/>*/}
                  </div>


                  <button type="submit">Submit</button>
              </Form>
          </Formik>
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
