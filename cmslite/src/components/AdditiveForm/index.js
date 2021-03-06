import React, { Component } from 'react'
import { ErrorMessage, Field, FieldArray, Form, Formik } from 'formik'
import * as Yup from 'yup'
import { additiveModel } from "models/additive"
import { Row } from "components/Bootstrap"
import ErrorTitle from "components/common/ErrorTitle"
import Checkbox from "components/common/Checkbox"
import CmsImage from "components/common/Image"
import ImagesUploader from "components/common/ImagesUploader"
import styles from 'components/cmslite.module.sass'
import ListItemsControlButtons from "components/common/ListItemsControlButtons"

const yup_string_required = Yup
  .string()
  .required('Заполните')

const additiveSchema = Yup.object({
  title: yup_string_required,
  cart_title: yup_string_required,
  data: Yup.array()
    .of(
      Yup.object().shape({
        order: Yup.number(),
        button: yup_string_required,
        price: Yup.number().required('Укажите'),
        image: Yup.string()
      }))
})

class AdditiveForm extends Component {
  handleSave(data) {
    this.props.save(data)
      .then(() => {
        this.props.history.push(`/${this.props.city}/additives`)
      })
  }

  render() {
    const { additive, getImage, uploadImages, cityId: city_id } = this.props
    const itemModel = additiveModel.data[0]
    const maxButtonItems = 3

    return (
      <Formik
        initialValues={{
          ...additive,
          city_id
        }}
        validationSchema={additiveSchema}
        onSubmit={(values, { setSubmitting }) => {
          setSubmitting(false)
          this.handleSave(values)
        }}
      >
        {({ values }) => {
          return (
            <Form>
              <Row className="mb-4">
                <div className="col-md-1">
                  <b>ID:</b> {values.id}
                </div>
                <div className="col-md-7">
                  <b>city_id:</b> {values.city_id}
                </div>
              </Row>

              <Row className="align-items-center">
                <div className="col-md-4">
                  <span className={styles.btitle}>Вопрос (пример: Добавить зелени?):</span>
                  <Field name="title" style={{ width: '100%' }}/>
                </div>
                <div className="col-md-3">
                  <Field name={`public`} title="Опубликовано" type="checkbox"
                         component={Checkbox}/>
                </div>
              </Row>
              <Row>
                <div className="col-md-12 mt-3">
                  <span
                    className={styles.btitle}>Надпись в корзине, под товаром (пример: Коробка, Зелень и т.п.):</span>
                </div>
                <div className="col-md-4">
                  <Field name="cart_title" style={{ width: '100%' }}/>
                </div>
              </Row>
              <Row>
                <div className="col-md-12 mt-4">
                  <h2>Кнопки</h2>
                  <br/>

                  <FieldArray
                    name={`data`}
                    render={ahi => (
                      <>
                        {values.data && values.data.length > 0 && values.data.map((item, index) => {
                          return (
                            <React.Fragment key={index}>
                              <Row className="mb-3">
                                <div className="col-md-1">
                                  <b>№:</b> {index}
                                </div>
                                <div className="col-md-6">
                                  <ListItemsControlButtons
                                    index={index}
                                    length={values.data.length - 1}
                                    maxItems={maxButtonItems}
                                    arrayHelpers={ahi}
                                    deleteTitle={"Удалить кнопку"}/>
                                </div>
                              </Row>
                              <Row>
                                <div className="col-md-3">
                                  <span className={styles.btitle}>Надпись на кнопке:</span>
                                  <Field name={`data.${index}.button`}/>
                                  <ErrorMessage name={`data.${index}.button`}
                                                component={ErrorTitle}/>
                                </div>
                                <div className="col-md-3">
                                  <span className={styles.btitle}>Цена:</span>
                                  <Field type="number" name={`data.${index}.price`}/>
                                  <ErrorMessage name={`data.${index}.price`}
                                                component={ErrorTitle}/>
                                </div>
                              </Row>
                              <Row className="mt-3">
                                {item.image && (
                                  <Field
                                    name={`data.${index}.image`}
                                    getImage={getImage}
                                    canDelete={true}
                                    component={CmsImage}/>
                                )}
                                <Field
                                  name={`data.${index}.image`}
                                  component={ImagesUploader}
                                  uploadImages={uploadImages}/>
                                <hr/>
                              </Row>
                            </React.Fragment>
                          )
                        })}

                        <button
                          type="button"
                          disabled={values.data.length > maxButtonItems}
                          onClick={() => ahi.push(itemModel)}>
                          + Добавить кнопку
                        </button>
                      </>
                    )}
                  />
                </div>
              </Row>

              <button
                type="submit"
                disabled={!values.data.length}
                className={styles.saveBtn}
              >Сохранить
              </button>
            </Form>
          )
        }}
      </Formik>
    )
  }
}

export default AdditiveForm