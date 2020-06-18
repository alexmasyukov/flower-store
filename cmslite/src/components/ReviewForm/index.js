import React, { Component } from 'react'
import { ErrorMessage, Field, Form, Formik } from 'formik'
import * as Yup from 'yup'
import { Row } from "components/Bootstrap"
import styles from 'components/cmslite.module.sass'
import ErrorTitle from "components/common/ErrorTitle"
import Checkbox from "components/common/Checkbox"


const oneOfErr = 'Одно из полей Имя, Instagram, Telegram должно быть заполнено'
const oneOfErr__onlyOneOf = 'Только одно из полей Имя, Instagram, Telegram может быть заполнено !'

function oneOfFunc() {
    return this.parent.name || this.parent.telegram || this.parent.instagram
}

function oneOfFunc_onlyOneOf() {
    const { name, telegram, instagram } = this.parent
    return [name, telegram, instagram].filter(item => !!item).length === 1
}

const reviewSchema = Yup.object({
    name: Yup.string()
      .test('t1', oneOfErr, oneOfFunc)
      .test('t2', oneOfErr__onlyOneOf, oneOfFunc_onlyOneOf),
    telegram: Yup.string(),
    instagram: Yup.string(),
    text: Yup.string().required('Заполните')
})


class ReviewForm extends Component {
    handleSave(data) {
        this.props.save(data)
          .then(res => {
              if (res && 'status' in res && res.status === 'done') {
                  this.props.history.push('/reviews')
              } else {
                  alert('Ошибка при сохранении. Подробности в консоли')
              }
          })
    }

    render() {
        const { review } = this.props

        return (
          <Formik
            initialValues={{
                ...review
            }}
            validationSchema={reviewSchema}
            onSubmit={(values, { setSubmitting }) => {
                setSubmitting(false)
                this.handleSave(values)
            }}
          >
              {({ values }) => (
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
                        <div className="col-md-12 mb-3">
                            <Field name={`public`} title="Опубликовано" type="checkbox"
                                   component={Checkbox}/>
                        </div>
                        <div className="col-md-4">
                            <span className={styles.btitle}>Имя:</span>
                            <Field name="name" style={{ width: '100%' }}/>
                        </div>
                        <div className="col-md-4">
                            <span className={styles.btitle}>Instagram:</span>
                            <Field name="instagram" style={{ width: '100%' }}/>
                        </div>
                        <div className="col-md-4">
                            <span className={styles.btitle}>Telegram:</span>
                            <Field name="telegram" style={{ width: '100%' }}/>
                        </div>
                        <div className="col-12">
                            <ErrorMessage name="name" component={ErrorTitle}/>
                        </div>

                        <div className="col-md-12 mt-3 mb-4">
                            <span className={styles.btitle}>Текст</span>
                            <Field name="text" as="textarea" rows={4}/>
                            <ErrorMessage name="text" component={ErrorTitle}/>
                        </div>
                    </Row>

                    <button type="submit">Сохранить</button>
                </Form>
              )}
          </Formik>
        )
    }
}

export default ReviewForm