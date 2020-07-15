import React, { Component } from 'react'
import { connect } from "react-redux"
// import cn from 'classnames'
// import {
//   string as YupString,
//   object as YupObject,
//   setLocale
// } from 'yup'
// import styles from './cartContainer.module.sass'
// import { Row } from "components/Bootstrap"
// import NextButton from "components/Cart/Common/NextButton"
import Step from "components/Cart/Common/Step"
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
import { DELIVERY_IS, PAY_TYPES } from "constants/common"
import { confimSelector, orderSelector, cartProductsSelector } from "store/selectors/cart"
import { fetchConfim, sendOrder } from "store/actions/cart/ordersActions"
import { phoneToTextFormat } from "utils"
import styles from "components/Cart/cart.module.sass"

const deliveryEmpty = {
  is: DELIVERY_IS.COURIER,
  courier_askRecipient: false,
  courier_street: '',
  courier_house: '',
  courier_flat: '',
  courier_entrance: '',
  courier_floor: '',
  courier_comment: '',
  courier_price: 200
}

const recipientEmpty = {
  iamResipient: false,
  iDontKnowRecipientNumber: false,
  recipient_name: '',
  recipient_phone: '',
  postcard: false,
  postcardText: ''
  // isPublic: true,
  // photoWithRecipient: false,
  // isSurprice: false,
  // anonymousCustomer: false
}

const deliveryDateTimeEmpty = {
  askRecipient: false,
  date: '',
  time: '',
  comment: ''
}

const payEmpty = {
  pay: PAY_TYPES.CARD,
  pay_comment: 'sdfsf'
}

const initialState = {
  customer: {
    isEdit: true,
    isValid: false,
    name: '',
    phone: '',
    toString() {
      return `${this.name}, ${phoneToTextFormat(this.phone)}`
    }
  },

  delivery: {
    isEdit: true,
    isValid: false,
    ...deliveryEmpty,
    toString() {
      if (this.is === DELIVERY_IS.COURIER &&
        this.courier_askRecipient === false) {
        return `
            ${this.courier_street} ${this.courier_house}
            ${this.courier_flat && `, кв. ${this.courier_flat}`}
            ${this.courier_entrance && `| ${this.courier_entrance} подъезд`}
            ${this.courier_floor && `| ${this.courier_floor} этаж`}
            ${this.courier_comment && `| Комментарий: ${this.courier_comment}`}
        `
      }
    }
  },

  recipient: {
    isEdit: true,
    isValid: false,
    ...recipientEmpty
  },

  deliveryDateTime: {
    isEdit: true,
    isValid: false,
    ...deliveryDateTimeEmpty
  },

  pay: {
    isEdit: true,
    isValid: false,
    ...payEmpty
  },

  order: {
    done: false,
    id: 0
  }
}


const setInSteps = (data, steps) => {
  const stepNames = Object.keys(steps)

  return stepNames.reduce((steps, currentStep) => {
    return {
      ...steps,
      [currentStep]: {
        ...steps[currentStep],
        ...data
      }
    }
  }, steps)
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

  handleSetStateKeyValue = (stepName, keyValue) => {
    this.setState(prev => ({
      [stepName]: {
        ...prev[stepName],
        ...keyValue
      }
    }))
  }

  validate = (obj) => {
    return true
  }

  handleChangeButton = (stepName) => () => {
    this.setState(prevState => {
      const steps = setInSteps({ isEdit: false }, prevState)

      return {
        ...steps,
        [stepName]: {
          ...prevState[stepName],
          isEdit: true
        }
      }
    })
  }

  handleStepSubmit = (stepName, nextStepName) => (values) => {
    // console.log(values)
    this.setState(prev => ({
      ...prev,

      [stepName]: {
        ...prev[stepName],
        ...values,
        isEdit: false
      },

      // [nextStepName]: {
      //   ...prev[nextStepName],
      //   isEdit: true
      // }
    }))
  }

  // handleNextButton = (step, nextStep) => () => {
  //   const currentStep = this.state[step]
  //   if (!this.validate(currentStep)) alert('no valid')

  //   this.setState(prev => {
  //     const steps = this.getStepsWith_isEdit_false()

  //     return {
  //       ...steps,
  //       [step]: {
  //         ...steps[step],
  //         isValid: true
  //       },
  //       [nextStep]: {
  //         ...prev[nextStep],
  //         isEdit: true
  //       }
  //     }
  //   })
  // }

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


  render() {
    const {
      customer, recipient, delivery, order,
      deliveryDateTime, pay
    } = this.state

    const deliveryTitle = delivery.is === DELIVERY_IS.COURIER ?
      'Доставка' : 'Самовывоз'

    const deliveryTimeTitle = delivery.is === DELIVERY_IS.COURIER ?
      'Время доставки' : 'Время самовывоза'

    // todo: NETWORK RELEASE - сделать это через CMS
    // Для установки radio по умолчанию, так как у курьера нет оплаты по карте
    let payType = pay.payType
    if (delivery.is === DELIVERY_IS.COURIER && payType === PAY_TYPES.CARD) {
      // Курьер может принимать только наличные
      payType = PAY_TYPES.CASH
    }

    console.log(deliveryDateTime);



    return (
      <>
        <Step number={1} title="Ваши контакты" active={customer.isEdit}>
          {customer.isEdit ? (
            <CustomerForm
              initialValues={customer}
              onSubmit={this.handleStepSubmit('customer', 'delivery')}
            />
          ) : (
              <CustomerResult {...customer}>
                <ChangeButton onClick={this.handleChangeButton('customer')} />
              </CustomerResult>
            )}
        </Step>

        <Step number={2} title={deliveryTitle} active={delivery.isEdit}>
          {delivery.isEdit ? (
            <DeliveryForm
              initialValues={delivery}
              emptyValues={deliveryEmpty}
              onSetKeyValue={this.handleSetStateKeyValue}
              onSubmit={this.handleStepSubmit('delivery', 'recipient')}
            />
          ) : (
              delivery.isValid && (
                <DeliveryResult {...delivery}>
                  <ChangeButton onClick={this.handleChangeButton('delivery')} />
                </DeliveryResult>
              )
            )}
        </Step>

        {delivery.is !== DELIVERY_IS.YOURSELF && (
          <Step number={3} title="Получатель" active={recipient.isEdit}>
            {recipient.isEdit ? (
              <RecipientForm
                initialValues={recipient}
                emptyValues={recipientEmpty}
                isVisible_iamResipient={delivery.courier_askRecipient === false}
                isVisible_iDontKnowRecipientNumber={delivery.courier_askRecipient === false}
                onSubmit={this.handleStepSubmit('recipient', 'deliveryDateTime')}
              />
            ) : (
                recipient.isValid && (
                  <RecipientResult {...recipient}>
                    <ChangeButton onClick={this.handleChangeButton('recipient')} />
                  </RecipientResult>
                )
              )}
          </Step>
        )}


        <Step number={4} title={deliveryTimeTitle} active={deliveryDateTime.isEdit}>
          {deliveryDateTime.isEdit ? (
            <DeliveryTimeForm
              initialValues={deliveryDateTime}
              emptyValues={deliveryDateTimeEmpty}
              onSubmit={this.handleStepSubmit('deliveryDateTime', 'pay')} />
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
              initialValues={pay}
              emptyValues={payEmpty}
              onSubmit={() => { }}
              payToCourier={delivery.is === DELIVERY_IS.COURIER}
            />
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