import React, { useState } from 'react'
import { Form, Field } from 'react-final-form'
import Input from "components/Cart/Common/Input"
import NumberFormat from "react-number-format"
import styles from 'components/Cart/cart.module.sass'
import Timer from "components/Cart/Timer"
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

const CustomerForm = ({ name, phone, onSubmit, children }) => {
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

  const sendSms = async () => {
    setIsLoading(true)
    return await new Promise((resolve, reject) => {
      setTimeout(() => {
        setIsLoading(false)
        Math.random() > 0.3 ?
          resolve({
            result: CONFIM_STATUS.SEND_SMS_DONE
          }) :
          reject({
            result: CONFIM_STATUS.SEND_SMS_ERROR
          })
        // const a = Math.random()
        // a > 0.6 && resolve(CONFIM_STATUS.SEND_SMS_DONE)
        // a > 0.9 && resolve(CONFIM_STATUS.INCORRECT_CODE)
        // a > 0.3 && resolve(CONFIM_STATUS.SEND_SMS_ERROR)
        // a > 0.7 && resolve(CONFIM_STATUS.DONE)
      }, 700)
    })
  }

  const handleRetrySendSms = async (values) => {
    // console.log('values', values)
    // if (values) {
    //   setConfim({
    //     values,
    //     status: confim.status
    //   })
    // }
    // let status = confim.status

    setAttempt(attempt + 1)

    try {
      const sms = await sendSms()
      setConfim({
        values,
        status: sms.result
      })
      // status = sms.result
    } catch (e) {
      // console.log('send error', e)
      // status = CONFIM_STATUS.SEND_SMS_ERROR
      if (attempt === 2) onSubmit(values)
      setIsTimer(true)
      setConfim({
        values,
        status: CONFIM_STATUS.SEND_SMS_ERROR
      })
    }

    // console.log('handleRetrySendSms status', status, values)
    //
    // if (status === CONFIM_STATUS.SEND_SMS_ERROR) {
    //   if (attempt === 2) onSubmit(values)
    //   setIsTimer(true)
    //
    //   setConfim({
    //     values,
    //     status: CONFIM_STATUS.SEND_SMS_ERROR
    //   })
    // }
    //
    // setConfim({
    //   values,
    //   status
    // })
  }

  const handleFormSubmit = (values) => {
    // console.log('handleFormSubmit values', values)
    // setConfim({
    //   values,
    //   status: CONFIM_STATUS.BEFORE_SEND
    // })
    //
    // const send = await handleRetrySendSms(values)


    // // console.log('handleFormSubmit', values, attempt)
    // let status = confim.status
    // try {
    //   const sms = await sendSms()
    //   status = sms.result
    // } catch (e) {
    //   // console.log('send error', e)
    //   status = CONFIM_STATUS.SEND_SMS_ERROR
    // }


    // let sendResult
    //
    //
    //
    // console.log('sendResult', sendResult)
    //
    // if (sendResult.result === CONFIM_STATUS.SEND_SMS_ERROR) {
    //   if (attempt === 2) onSubmit(confim.values)
    //
    //   setIsTimer(true)
    //
    //   setConfim({
    //     values,
    //     status: CONFIM_STATUS.SEND_SMS_ERROR
    //   })
    //
    //   return
    // }
    //
    // setConfim({
    //   values,
    //   status: sendResult.result
    // })
  }

  const handleCheckSms = () => {
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

    if (code.value === '1234') {
      onSubmit(confim.values)
    } else {
      setCode({
        ...code,
        validStatus: 'Неверный код'
      })
    }
  }


  return (
    <div className={styles.form}>
      {isLoading && 'Loading...'}
      <Form
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

              {confim.status === CONFIM_STATUS.BEFORE_SEND && (
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
            </form>
          )
        }}
      />


      {confim.status === CONFIM_STATUS.SEND_SMS_ERROR && (
        <>
          <p className={styles.smsError}>Мы не смогли отправит смс с кодом, проверьте введенный телефон</p>

          {isTimer && <>
            <center>
              Повторная отправка через
              {' '}
              <b><Timer maxSeconds={2} onEnd={() => setIsTimer(false)}/> сек.</b>
            </center>
          </>}

          <NextButton
            disabled={isTimer}
            title={"Отправить еще раз"}
            onClick={() => handleRetrySendSms(confim.values)}
          />
        </>
      )}

      {confim.status === CONFIM_STATUS.SEND_SMS_DONE && (
        <>
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
            title="Подтвердить"
            onClick={handleCheckSms}
          />
        </>
      )}
    </div>
  )
}

export default CustomerForm