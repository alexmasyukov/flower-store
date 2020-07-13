import React, { useState } from 'react'
import { Form, Field } from 'react-final-form'
import { connect } from "react-redux"
import NumberFormat from "react-number-format"
import { compose, phoneToValue, when } from "utils"
import { cartCustomerPointsSet } from "store/actions/cart/stepsActions"
import { CONFIM_STATUS, PHONE_FORMAT } from "constants/common"
import Input from "components/Cart/Common/Input"
import Timer from "components/Cart/Timer"
import NextButton from "components/Cart/Common/NextButton"
import withApiService from "components/hoc/withApiService"
import styles from 'components/Cart/cart.module.sass'


const PhoneInput = ({
                      placeholder,
                      onChange,
                      onBlur,
                      onFocus,
                      name,
                      value,
                      disabled,
                      mask = '_',
                      format = PHONE_FORMAT.FORMAT_FOR_INPUT
                    }) => {
  return (
    <NumberFormat
      disabled={disabled}
      type="tel"
      id={name}
      mask={mask}
      format={format}
      placeholder={placeholder}
      onBlur={onBlur}
      onFocus={onFocus}
      value={value}
      onChange={value => onChange(value)}
      onValueChange={({ formattedValue }) =>
        onChange(formattedValue)
      }
    />
  )
}


const BtnContinue = ({ onClick }) => (
  <p className={styles.btnContinue} onClick={onClick}>Не приходит смс</p>
)


const Customer = ({
                    onSubmit,
                    confimCustomer,
                    cartCustomerPointsSet,
                    initialValues
                  }) => {
  const [confim, setConfim] = useState({
    values: undefined,
    status: CONFIM_STATUS.BEFORE_SEND
  })
  const [code, setCode] = useState({
    value: '',
    validStatus: ''
  })
  const [attempt, setAttempt] = useState(0)
  const [isTimer, setIsTimer] = useState(false)
  const [isLoading, setIsLoading] = useState(false)

  const handleRetrySendSms = async (values) => {
    // console.warn('handleRetrySendSms', values)
    setAttempt(attempt + 1)
    setIsLoading(true)

    try {
      const sms = await confimCustomer({
        phone: phoneToValue(values.phone),
        name: values.name
      })

      setIsLoading(false)

      setConfim({
        values,
        status: sms.status
      })
    } catch (e) {
      setIsLoading(false)
      if (attempt === 2) onSubmit(values)
      setIsTimer(true)

      setConfim({
        values,
        status: CONFIM_STATUS.SEND_SMS_ERROR
      })
    }
  }

  const contninueWithoutConfim = () => {
    setIsLoading(false)
    onSubmit(confim.values)
  }

  const handleCheckSms = async () => {
    if (!code.value) {
      setCode({
        ...code,
        validStatus: 'Введите код'
      })
      return
    }
    if (code.value.length < 4) {
      setCode({
        ...code,
        validStatus: 'Минимум 4 цыфры'
      })
      return
    }


    const { phone, name } = confim.values
    const data = compose(
      when(code.value !== '', (data) => ({ ...data, sms_code: code.value }))
    )({
      phone: phoneToValue(phone),
      name: name
    })

    try {
      const sms = await confimCustomer(data)
      console.warn('sms', sms)
      if (sms.status === CONFIM_STATUS.DONE) {
        console.log(sms.result.points)
        cartCustomerPointsSet(sms.result.points)
        onSubmit(confim.values)
      }
      if (sms.status === CONFIM_STATUS.SEND_SMS_ERROR) {
        setCode({
          value: '',
          validStatus: ''
        })
        setConfim({
          values: confim.values,
          status: CONFIM_STATUS.SEND_SMS_ERROR
        })
      }

      if (sms.status === CONFIM_STATUS.INCORRECT_CODE)
        setCode({
          value: '',
          validStatus: 'Неверный код'
        })
    } catch (e) {
      setCode({
        ...code,
        validStatus: 'Неверный код'
      })
    }
  }


  return (
    <div className={styles.form}>
      <Form
        initialValues={initialValues}
        onSubmit={handleRetrySendSms}
        validate={values => {
          const errors = {}
          if (!values.name) {
            errors.name = 'Заполните'
          }
          if (!values.phone) {
            errors.phone = 'Заполните'
          }
          if (values.phone && values.phone.includes('_')) {
            errors.phone = 'Укажите полный номер'
          }
          return errors
        }}
        render={({
                   handleSubmit,
                   form,
                   submitting
                 }) => {
          console.log('render form')
          return (
            <form onSubmit={handleSubmit}>
              <Field name="name">
                {({ input, meta }) =>
                  <Input placeholder="Имя" {...input} disabled={submitting} meta={meta}/>}
              </Field>
              <Field name="phone">
                {({ input, meta }) =>
                  <Input placeholder="Мобильный телефон" {...input} disabled={submitting} meta={meta}>
                    {(input) => <PhoneInput {...input} />}
                  </Input>}
              </Field>

              {confim.status === CONFIM_STATUS.BEFORE_SEND && <>
                <p className={styles.blockText}> Ваши данные – это тайна.
                  Получателю доступен только текст открытки
                  (её можно написать далее)</p>

                <NextButton
                  isLoading={isLoading}
                  type="submit"
                  disabled={submitting}
                />
              </>}

              {confim.status === CONFIM_STATUS.SEND_SMS_ERROR && <>
                <p className={styles.smsError}>Мы не смогли отправит смс с кодом, проверьте введенный телефон</p>

                {isTimer && <>
                  <center>
                    Повторная отправка через
                    {' '}
                    <b><Timer maxSeconds={2} onEnd={() => setIsTimer(false)}/> сек.</b>
                  </center>
                </>}

                <NextButton
                  isLoading={isLoading}
                  disabled={isTimer || submitting}
                  title={"Отправить еще раз"}
                  type="submit"
                />

                <BtnContinue onClick={() => contninueWithoutConfim()}/>
              </>}
            </form>
          )
        }}
      />


      {
        (confim.status === CONFIM_STATUS.SEND_SMS_DONE ||
          confim.status === CONFIM_STATUS.INCORRECT_CODE) && <>
          <Input
            placeholder="Код из смс"
            value={code.value}
            onChange={(e) => setCode({
              value: e.target.value,
              validStatus: false
            })}
            meta={code.validStatus && {
              error: code.validStatus,
              touched: true
            }}/>

          <NextButton
            isLoading={isLoading}
            title="Подтвердить"
            onClick={handleCheckSms}
          />

          {
            <BtnContinue onClick={() => contninueWithoutConfim()}/>
          }
        </>}
    </div>
  )
}

const mapMethodsToProps = (apiService) => {
  return {
    confimCustomer: apiService.confimCustomer
  }
}

const mapDispatchToProps = {
  cartCustomerPointsSet
}

const CustomerForm = compose(
  withApiService(mapMethodsToProps),
  connect(
    null,
    mapDispatchToProps
  )
)(Customer)

export default CustomerForm