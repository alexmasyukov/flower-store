import React, { Component } from 'react'
import cn from 'classnames'
// import {
//   string as YupString,
//   object as YupObject,
//   setLocale
// } from 'yup'
// import styles from './cartContainer.module.sass'
import { Row } from "components/Bootstrap"
import Step from "components/Cart/Common/Step"
import NextButton from "components/Cart/Common/NextButton"
import ChangeButton from "components/Cart/Common/ChangeButton"
import CustomerForm from "components/Cart/Steps/CustomerFrom"
import CustomerResult from "components/Cart/Steps/CustomerResult"
import RecipientForm from "components/Cart/Steps/RecipientForm"
import RecipientResult from "components/Cart/Steps/RecipientResult"
import DeliveryResult from "components/Cart/Steps/DeliveryResult"
import DeliveryForm from "components/Cart/Steps/DeliveryForm"
import DeliveryTimeForm from "components/Cart/Steps/DeliveryTimeForm"
import DeliveryTimeResult from "components/Cart/Steps/DeliveryTimeResult"
import PayForm from "components/Cart/Steps/PayForm"
import PayResult from "components/Cart/Steps/PayResult"
import { DELIVERY_IS, PAY_TYPES, VALIDATION_MESSAGES as VM } from "constants/common"
import styles from "components/Cart/cart.module.sass"
import { connect } from "react-redux"
import { confimSelector, orderSelector, cartProductsSelector } from "store/selectors/cart"
import { fetchConfim, sendOrder } from "store/actions/cart/ordersActions"
import Timer from 'components/Cart/Timer'
import Input from "components/Cart/Common/Input"


const initialState = {
  customer: {
    isEdit: true,
    isValid: true,
    name: 'Алексей',
    phone: 79960225657
  },

  confimCustomer: {
    timerVisible: false,
    code: ''
  },

  order: {
    done: false,
    id: 0
  },

  delivery: {
    isEdit: true,
    isValid: false,
    is: DELIVERY_IS.COURIER,
    courierDirection: {
      askRecipient: false,
      street: 'dffs',
      house: '',
      flat: '',
      comment: '',
      price: 0
    }
  },
  recipient: {
    isEdit: true,
    isValid: false,
    iamResipient: false,
    iDontKnowRecipientNumber: false,
    name: '',
    phone: '',
    postcard: true,
    postcardText: ''
    // photoWithRecipient: false,
    // isSurprice: false,
    // anonymousCustomer: false
  },
  deliveryDateTime: {
    isEdit: true,
    isValid: false,
    askRecipient: false
  },
  pay: {
    isEdit: true,
    isValid: true,
    payType: PAY_TYPES.CARD,
    legalEntity: {
      name: '',
      inn: '',
      kpp: ''
    },
    comment: 'sdf'
  }
}


const validateOptions = {
  abortEarly: false
}

// const customerSchema = YupObject().shape({
//   // name: YupString().min(3, VM.MIN_SYMBOLS(3, 'символа')).required(VM.REQUIRE),
//   name: YupObject().shape({
//     one: YupString().min(3, VM.MIN_SYMBOLS(3, 'символа')).required(VM.REQUIRE)
//   }),
//   phone: YupString().min(3, VM.MIN_SYMBOLS(3, 'символа')).required(VM.REQUIRE)
// })


// customerSchema
//   .validate({
//     name: {
//       one: ''
//     },
//     phone: ''
//   }, validateOptions)
//   .then((valid) => {
//     console.log(valid)
//   })
//   .catch((err) => {
//     const errors = err.inner.map(item => ({
//       path: item.path,
//       message: item.message
//     }))
//     // console.log(errors)
//   })


// CODE_SENT
// CONFIM_DONE
// INCORRECT_CODE
// SEND_SMS_ERROR
const CONFIM_STATUS = {
  BEFORE_SEND: 'BEFORE_SEND',
  CODE_SENT: 'CODE_SENT',
  CONFIM_DONE: 'CONFIM_DONE',
  INCORRECT_CODE: 'INCORRECT_CODE',
  SEND_SMS_ERROR: 'SEND_SMS_ERROR'
}

class CartSteps extends Component {
  state = {
    ...initialState
  }

  handleInputChange = (statePath) => (e) => {
    const target = e.target
    const value = target.type === 'checkbox' ? target.checked : target.value

    this.setState(prevState => {
      const path = statePath.split('.')

      const newState = path.reduce((state, item, i, arr) => {
        if (typeof item !== 'object' && i === arr.length - 1) {
          state[item] = value
          return state
        }
        return state[item]
      }, prevState)

      return {
        ...newState
      }
    })
  }


  validate = (obj) => {
    return true
  }

  getStepsWith_isEdit_false = () => {
    const state = this.state
    const stepsNames = Object.keys(this.state)

    return stepsNames.reduce((steps, currentStep) => {
      return {
        ...steps,
        [currentStep]: {
          ...state[currentStep],
          isEdit: false
        }
      }
    }, state)
  }

  handleChangeButton = (step) => () => {
    this.setState(prev => {
      const steps = this.getStepsWith_isEdit_false()

      return {
        ...steps,
        [step]: {
          ...prev[step],
          isEdit: true
        }
      }
    })
  }

  handleNextButton = (step, nextStep) => () => {
    const currentStep = this.state[step]
    if (!this.validate(currentStep)) alert('no valid')

    this.setState(prev => {
      const steps = this.getStepsWith_isEdit_false()

      return {
        ...steps,
        [step]: {
          ...steps[step],
          isValid: true
        },
        [nextStep]: {
          ...prev[nextStep],
          isEdit: true
        }
      }
    })
  }

  handleTimeEnd = () => {
    this.setState(prev => ({
      confimTimerVisible: false
    }))
  }

  handleSendOrder = () => {
    const state = this.state
    const { products } = this.props

    this.props.sendOrder({
      city_id: 1,
      customer_id: 2,
      complete: false,
      steps: state,
      products
    })
    // .then(({ data }) => {
    //   console.log(data.result)
    //   this.setState(prev => ({
    //     order: {
    //       ...prev.order,
    //       done: true,
    //       id: data.result
    //     }
    //   }))
    // })
    // .catch(error => {
    //   alert('Ошибка отправки заказа')
    //   console.log(error)
    // })
    // const { confirmation: { smsCode, error, done } } = this.state
    // const { orderConfirmation } = this.props

    // if (!orderConfirmation.code && !done) {
    //    this.props.fetchConfim()
    //    return
    // }

    // if (orderConfirmation.code.toString() === smsCode.toString()) {
    //    this.setState(prev => ({
    //       confirmation: {
    //          ...prev.confirmation,
    //          done: true
    //       }
    //    }))
    // } else {
    //    this.setState(prev => ({
    //       confirmation: {
    //          ...prev.confirmation,
    //          error: true
    //       }
    //    }))
    // }
  }

  handleSendConfim = () => {
    console.log('handleSendConfim', this.state)

    const { customer: { name, phone } } = this.state

    this.setState(prev => ({
      confimCustomer: {
        ...prev.confimCustomer,
        timerVisible: true
      }
    }), () => this.props.fetchConfim({ name, phone }))
  }

  render() {
    const { confim } = this.props
    const {
      customer, recipient, delivery, order,
      deliveryDateTime, pay, confimCustomer
    } = this.state


    // console.log('confim', confim)
    // console.log('order', order)

    const deliveryTitle = delivery.is === DELIVERY_IS.COURIER ?
      'Адрес доставки' : 'Адрес самовывоза'

    const deliveryTimeTitle = delivery.is === DELIVERY_IS.COURIER ?
      'Время доставки' : 'Время самовывоза'

    // todo: NETWORK RELEASE - сделать это через CMS
    // Для установки radio по умолчанию, так как у курьера нет оплаты по карте
    let payType = pay.payType
    if (delivery.is === DELIVERY_IS.COURIER && payType === PAY_TYPES.CARD) {
      // Курьер может принимать только наличные
      payType = PAY_TYPES.CASH
    }


    // todo: переписать это через контекст
    //   https://ru.reactjs.org/docs/context.html
    return (
      <>
        <Step number={1} title="Ваши контакты" active={customer.isEdit}>
          {customer.isEdit ? (
            <CustomerForm {...customer} onInputChange={this.handleInputChange}>
              <NextButton onClick={this.handleNextButton('customer', 'recipient')} />
            </CustomerForm>
          ) : (
              customer.isValid && (
                <CustomerResult  {...customer}>
                  <ChangeButton onClick={this.handleSendConfim} />

                  {!order.done && (
                    <>
                      На ваш номер отправлен код подтверждения
                      <Input
                        placeholder="Код"
                        value={confimCustomer.code}
                        onChange={this.handleInputChange('confimCustomer.code')} />

                      <div onClick={this.handleSendConfim}>Отправаить код еще раз</div>
                      {confimCustomer.timerVisible && (
                        <>Запросить код повторно можно через <Timer maxSeconds={3}
                          onTimeEnd={this.handleTimeEnd} /> сек.</>
                      )}

                      <NextButton title='Подтвердить' onClick={this.handleNextButton('customer', 'recipient')} />
                    </>)}

                  {!order.done && <NextButton title='Оформить заказ' onClick={this.handleSendOrder} />}


                  {confim.isLoading && 'Отправка СМС...'}

                  {confim.error && 'Невозможно отправить смс'}
                  {confim.error && <pre>{JSON.stringify(confim.error, null, 2)}</pre>}


                  {confim.data && confim.data.status === CONFIM_STATUS.CODE_SENT &&
                    'Смс отправлено успешно'}




                  {/* <ChangeButton onClick={this.handleChangeButton('customer')} /> */}
                </CustomerResult>
              )
            )}
        </Step>

        {/*deliveryTitle*/}
        <Step number={2} title={'Доставка / самовывоз'} active={delivery.isEdit}>
          {delivery.isEdit ? (
            <DeliveryForm {...delivery} onInputChange={this.handleInputChange}>
              <NextButton onClick={this.handleNextButton('delivery', 'deliveryDateTime')} />
            </DeliveryForm>
          ) : (
              delivery.isValid && (
                <DeliveryResult {...delivery}>
                  <ChangeButton onClick={this.handleChangeButton('delivery')} />
                </DeliveryResult>
              )
            )}
        </Step>
        <Step number={3} title="Получатель" active={recipient.isEdit}>
          {recipient.isEdit ? (
            <RecipientForm {...recipient} onInputChange={this.handleInputChange}>
              <NextButton onClick={this.handleNextButton('recipient', 'delivery')} />
            </RecipientForm>
          ) : (
              recipient.isValid && (
                <RecipientResult {...recipient}>
                  <ChangeButton onClick={this.handleChangeButton('recipient')} />
                </RecipientResult>
              )
            )}
        </Step>
        <Step number={4} title={deliveryTimeTitle} active={deliveryDateTime.isEdit}>
          {deliveryDateTime.isEdit ? (
            <DeliveryTimeForm
              {...deliveryDateTime}
              deliveryIs={delivery.is}
              onInputChange={this.handleInputChange}
            >
              <NextButton onClick={this.handleNextButton('deliveryDateTime', 'pay')} />
            </DeliveryTimeForm>
          ) : (
              deliveryDateTime.isValid && (
                <DeliveryTimeResult {...deliveryDateTime}>
                  <ChangeButton onClick={this.handleChangeButton('deliveryDateTime')} />
                </DeliveryTimeResult>
              )
            )}
        </Step>
        <Step number={5} title="Оплата" active={pay.isEdit}>
          {pay.isEdit ? (
            <PayForm
              {...pay}
              cardTypeEnabled={delivery.is === DELIVERY_IS.YOURSELF}
              cardTypeTitle={delivery.is === DELIVERY_IS.YOURSELF ?
                'Наличные' : 'Наличными курьеру'}
              payType={payType}
              onInputChange={this.handleInputChange}
            >
              <button className={styles.nextButton} onClick={this.handleSendOrder}>
                Оформить заказ
              </button>


            </PayForm>
          ) : (
              pay.isValid && (
                <PayResult {...pay}>
                  <ChangeButton onClick={this.handleChangeButton('pay')} />
                </PayResult>
              )
            )}
        </Step>
      </>
    )
  }
}

const mapStateToProps = state => ({
  products: cartProductsSelector(state),
  confim: confimSelector(state),
  order: orderSelector(state)
})

const mapDispatchToProps = {
  fetchConfim,
  sendOrder
}

const CartStepsContainer = connect(
  mapStateToProps,
  mapDispatchToProps
)(CartSteps)

export default CartStepsContainer