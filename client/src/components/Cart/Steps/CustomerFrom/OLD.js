import React, { useState } from 'react'
import { Form, Field } from 'react-final-form'
import Input from "components/Cart/Common/Input"
import NumberFormat from "react-number-format"
import styles from 'components/Cart/cart.module.sass'
// import Timer from "containers/cartStepsContainer"
import { CONFIM_STATUS, PHONE_FORMAT } from "constants/common"
import NextButton from "components/Cart/Common/NextButton"

const CurrencyInput = ({
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
      // thousandSeparator=" "
      // decimalScale="2"
      // fixedDecimalScale={true}
      // allowNegative={false}
      // placeholder=""
      // autoComplete="on"
      // allowEmptyFormatting={true}
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
//
// const sleep = ms => new Promise(resolve => setTimeout(resolve, ms))
//
// const onSubmit = async values => {
//   await sleep(300)
//   window.alert(JSON.stringify(values, 0, 2))
// }

const sendSms = async () => {
  return await new Promise((resolve, reject) => {
    setTimeout(() => {
      resolve(CONFIM_STATUS.SEND_SMS_DONE)
      // const a = Math.random()
      // a > 0.6 && resolve(CONFIM_STATUS.SEND_SMS_DONE)
      // a > 0.9 && resolve(CONFIM_STATUS.INCORRECT_CODE)
      // a > 0.3 && resolve(CONFIM_STATUS.SEND_SMS_ERROR)
      // a > 0.7 && resolve(CONFIM_STATUS.DONE)
    }, 0)
  })
}


const CustomerForm = ({ name, phone, onSubmit, children }) => {
  // const [confimStatus, setConfimStatus] = useState(CONFIM_STATUS.BEFORE_SEND)
  // const [code, setCode] = useState('')

  const handleFormSubmit = async (values) => {
    console.log('handleFormSubmit', values)

    try {
      const status = await sendSms()
      console.log('status', status)
      if (status === CONFIM_STATUS.SEND_SMS_DONE && values.code === '1111') alert('Подтверждено')
      return {
        confimStatus: status,
        code: 'Введите код'
      }



    } catch (e) {
      console.log('send error', e)
    }


    if (values && !('code' in values)) {
      console.log('res')
      return {
        confimStatus: CONFIM_STATUS.SEND_SMS_DONE,
        code: 'Введите код'
      }
    }

    if (values.code === '')
      return {
        code: 'Введите код',
        confimStatus: CONFIM_STATUS.SEND_SMS_DONE,
      }

    if (values.code.length < 4)
      return {
        code: 'Минимум 4 цыфры',
        confimStatus: CONFIM_STATUS.SEND_SMS_DONE,
      }

    if (values.code === '1111') {
      onSubmit(values)
    }

    return {
      code: 'Неверный код подтверждения',
      confimStatus: CONFIM_STATUS.INCORRECT_CODE,
    }


    // console.log('handleFormSubmit', values)

    //   return { confimStatus: CONFIM_STATUS.SEND_SMS_ERROR }
    //   // setConfimStatus(CONFIM_STATUS.SEND_SMS_ERROR)
    // }
  }

  const handleCheckSms = () => {
    // if (code === '1234') {
    //
    // }


  }

  return (
    <div className={styles.form}>
      <Form
        onSubmit={handleFormSubmit}
        validate={values => {
          console.log('validate', values)
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
          // if (values.code && values.code.length < 4) {
          //   errors.code = 'Минимум 4 цифры'
          // }
          //
          // if (values.code && values.code.length === 3) {
          //   delete errors.code
          // }

          // if (!values.confirm) {
          //   errors.confirm = 'Required'
          // } else if (values.confirm !== values.password) {
          //   errors.confirm = 'Must match'
          // }
          console.log('errors', errors)
          return errors
        }}
        render={({
                   handleSubmit,
                   form,
                   submitting,
                   submitErrors,
                   //   = {
                   //   confimStatus: CONFIM_STATUS.BEFORE_SEND
                   // },
                   ...other
                 }) => {

          // console.log(submitting, submitErrors)

          //
          return (
            <form onSubmit={handleSubmit}>
              {/*{smsStatus}*/}
              {/*<Field name="code">*/}
              {/*{({ input, meta }) =>*/}
              {/*<p>{submitErrors.sendSmsResult}</p>*/}
              {/*}*/}
              {/*</Field>*/}

              <Field name="name" initialValue={name}>
                {({ input, meta }) =>
                  <Input placeholder="Имя" {...input} disabled={submitting} meta={meta}/>}
              </Field>
              <Field name="phone" initialValue={phone}>
                {({ input, meta }) =>
                  <Input placeholder="Мобильный телефон" {...input} disabled={submitting} meta={meta}>
                    {(input) => {
                      return <CurrencyInput {...input} />
                    }}
                  </Input>}
              </Field>

              {/*<div className="buttons">*/}
              {/*<button type="submit" disabled={submitting}>*/}
              {/*Submit*/}
              {/*</button>*/}
              {/*<button*/}
              {/*type="button"*/}
              {/*onClick={form.reset}*/}
              {/*disabled={submitting || pristine}*/}
              {/*>*/}
              {/*Reset*/}
              {/*</button>*/}
              {/*</div>*/}

              {!submitErrors && (
                <>
                  <p className={styles.blockText}> Ваши данные – это тайна.
                    Получателю доступен только текст открытки
                    (её можно написать далее)</p>

                  <NextButton
                    type="submit"
                    disabled={submitting}
                  />
                </>
              )}

              {submitErrors
              && 'confimStatus' in submitErrors
              && submitErrors.confimStatus !== CONFIM_STATUS.BEFORE_SEND && (
                <>
                  <Field name="code" initialValue={undefined}>
                    {({ input, meta }) =>
                      <Input placeholder="Код из смс" {...input} disabled={submitting} meta={meta}/>}
                  </Field>

                  <NextButton
                    title="Подтвердить"
                    type="submit"
                    disabled={submitting}
                  />
                </>
              )}


              {/*<pre>{JSON.stringify(values, 0, 2)}</pre>*/}
            </form>
          )
        }}
      />

      {/*{confimStatus !== CONFIM_STATUS.BEFORE_SEND && (*/}
      {/*<>*/}
      {/*<Input placeholder="Код из смс" value={code} onChange={(e) => setCode(e.target.value)}/>}*/}

      {/*<NextButton*/}
      {/*title="Подтвердить"*/}
      {/*onClick={handleCheckSms}*/}
      {/*/>*/}
      {/*</>*/}
      {/*)}*/}

      {/*{smsStatus && (*/}
      {/*<>*/}
      {/*<Input*/}
      {/*placeholder="Код из смс"*/}
      {/*onChange={() => {*/}
      {/*}}*/}
      {/*meta={{*/}
      {/*error: false,*/}
      {/*touch: false*/}
      {/*}}*/}
      {/*/>*/}


      {/*<NextButton*/}
      {/*title={"Подтвердить"}*/}
      {/*/>*/}
      {/*</>*/}
      {/*)}*/}


      {/*{!order.done && (*/}
      {/*<>*/}
      {/*На ваш номер отправлен код подтверждения*/}
      {/*<Input*/}
      {/*placeholder="Код"*/}
      {/*value={confimCustomer.code}*/}
      {/*onChange={this.handleInputChange('confimCustomer.code')}/>*/}

      {/*<div onClick={this.handleSendConfim}>Отправаить код еще раз</div>*/}
      {/*{confimCustomer.timerVisible && (*/}
      {/*<>Запросить код повторно можно через <Timer maxSeconds={3}*/}
      {/*onTimeEnd={this.handleTimeEnd}/> сек.</>*/}
      {/*)}*/}

      {/*<NextButton title='Подтвердить' onClick={this.handleNextButton('customer', 'delivery')}/>*/}
      {/*</>)}*/}

      {/*/!* {!order.done && <NextButton title='Оформить заказ' onClick={this.handleSendOrder} />} *!/*/}


      {/*{confim.isLoading && 'Отправка СМС...'}*/}

      {/*{confim.error && 'Невозможно отправить смс'}*/}
      {/*{confim.error && <pre>{JSON.stringify(confim.error, null, 2)}</pre>}*/}


      {/*{confim.data && confim.data.status === CONFIM_STATUS.SEND_SMS_DONE &&*/}
      {/*'Смс отправлено успешно'}*/}

    </div>
  )
}

export default CustomerForm