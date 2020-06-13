import React, { Component } from 'react'
import { ErrorMessage, Field, FieldArray, Form, Formik } from 'formik'
import * as Yup from 'yup'
import { Row } from "components/Bootstrap"
import ErrorTitle from "components/CmsLite/common/ErrorTitle"
import styles from 'components/CmsLite/cmslite.module.sass'

const yup_string_required = Yup
  .string()
  .required('Заполните')

const schema = Yup.object({
    token: yup_string_required,
    subscribe_password: yup_string_required
})

class BotViberForm extends Component {
    state = {
        test: false
    }

    save(data) {
        this.props.save(data)
          .then(res => {
              if (res && 'status' in res && res.status === 'done') {
                  return res
              } else {
                  alert('Ошибка при сохранении. Подробности в консоли')
              }
          })
    }

    handleSave(data) {
        this.save(data)
          .then(res => this.props.history.push('/cmslite/products'))
    }

    handleBotTest() {
        this.props.testBot()
          .then(res => this.setState({
              test: res
          }))
    }


    render() {
        const { bot } = this.props
        const { test } = this.state

        return (
          <>
              <br/>
              <button onClick={() => this.handleBotTest()}>Тестировать бота</button>
              <br/>
              {JSON.stringify(test)}
              <br/><br/>
              <Formik
                initialValues={{
                    ...bot
                }}
                validationSchema={schema}
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
                                <div className="col-md-7">
                                    <span className={styles.btitle}>Токен:</span>
                                    <Field name="token" style={{ width: '100%' }}/>
                                    <ErrorMessage name={`token`} component={ErrorTitle}/>
                                </div>
                                <div className="w-100"/>
                                <div className="col-md-12 mt-3">
                                <span
                                  className={styles.btitle}>Пароль на право получения уведомлений для менеджеров:</span>
                                    <Field name="subscribe_password"/>
                                    <ErrorMessage name={`subscribe_password`} component={ErrorTitle}/>
                                </div>
                                <div className="col-md-12 mt-3">
                                    Указывайте данные согласно <a
                                  href="https://partners.viber.com/">partners.viber.com</a>
                                    <br/>
                                    Для получения права на уведомления для менеджеров (о заказах и т.п.), в чате с ботом
                                    введите по порядку:
                                    <ul>
                                        <li>/notify</li>
                                        <li>ПАРОЛЬ</li>
                                    </ul>
                                </div>
                            </Row>

                            <Row>
                                <div className="col-md-12 mt-4">
                                    <h2>Пользователи с правами уведомлений от магазина</h2>

                                    <FieldArray
                                      name={`notify_subscribers`}
                                      render={ahi =>
                                        values.notify_subscribers && values.notify_subscribers.length > 0 &&
                                        values.notify_subscribers.map(({ id, name }, index) => (
                                          <div className='mt-2' key={index}>
                                              <b>{name}</b> (id: {id})
                                              {`  `}
                                              <button
                                                type="button"
                                                onClick={() => ahi.remove(index)}>
                                                  Удалить
                                              </button>
                                          </div>
                                        ))}
                                    />
                                </div>
                            </Row>

                            <button
                              type="submit"
                              className={styles.saveBtn}>
                                Сохранить
                            </button>
                        </Form>
                      )
                  }}
              </Formik>
          </>
        )
    }
}

export default BotViberForm