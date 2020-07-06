import React, { Component } from 'react'
import { ErrorMessage, Field, FieldArray, Form, Formik } from 'formik'
import * as Yup from 'yup'
import { Row } from "components/Bootstrap"
import ErrorTitle from "components/common/ErrorTitle"
import styles from 'components/cmslite.module.sass'

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

  handleSave(data) {
    this.props.save(data)
      .then(() => this.props.history.push(`/${this.props.city}/`))
  }

  handleBotTest() {
    this.props.testBot()
      .then(res => this.setState({
        test: res
      }))
  }


  render() {
    const { bot  } = this.props
    const { test } = this.state

    return (
      <>
        <br/>
        <button onClick={() => this.handleBotTest()}>Тестировать бота</button>
        {test && (
          <div className='mt-3 mb-3'>
            {JSON.stringify(test, null, 2)}
          </div>
        )}
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
                    <span className={styles.btitle}>token:</span>
                    <Field name="token" style={{ width: '100%', marginBottom: 10 }}/>
                    Указывайте данные согласно <a
                    href="https://partners.viber.com/">partners.viber.com</a>
                    <br/><br/>
                    <ErrorMessage name={`token`} component={ErrorTitle}/>
                  </div>
                  <div className="w-100"/>
                  <div className="col-md-7 mt-3">
                    <span className={styles.btitle}>
                      expose url
                    </span>
                    <Field name="expose_url" style={{ width: '100%' }}/>
                    <ErrorMessage name={`expose_url`} component={ErrorTitle}/>
                  </div>
                  <div className="col-md-12 mt-3">
                    <span
                      className={styles.btitle}>Пароль на право получения уведомлений для менеджеров:</span>
                    <Field name="subscribe_password"/>
                    <ErrorMessage name={`subscribe_password`} component={ErrorTitle}/>
                  </div>
                  <div className="col-md-12 mt-3">
                    <h2>Команды бота</h2>
                    <b>/all</b> - Показать все команды
                    <br/>
                    <b>/notify</b> - подписаться на уведомления для менеджеров
                    (о заказах и т.п.)
                    <br/>
                    <b>/sms-balance</b> - Баланс денег на смс
                    <br/>
                    <b>/order-complete</b> - Техническая
                    <br/>
                    <b>/order-uncomplete</b> - Техническая
                  </div>
                </Row>

                <Row>
                  <div className="col-md-12 mt-4">
                    <h2>Пользователи подписавшиеся на уведомления от магазина</h2>
                    <p><b className={styles.red}>Внимание!</b> Если вы сменили <b>token</b> бота, все подписки этих
                      пользователей становятся не актуальны и в новом боте работать не будут! При смене токена, нужно
                      снова подписаться на уведомления.
                      Если вы вернете старый токен бота, подписки вновь станут актуальны и заработают</p>
                    <p><b className={styles.red}>Причина:</b> На каждый token Viber генерирует новый id пользователя</p>
                    <br/>
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