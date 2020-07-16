import React, { Component } from 'react'
import { connect } from "react-redux"
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
import withCity from "components/hoc/withCity"
import { DELIVERY_IS, PAY_TYPES, PAY_TEXTS_BY_DELIVERY_IS } from "constants/common"
import { confimSelector, orderSelector, cartProductsSelector } from "store/selectors/cart"
import { fetchConfim, sendOrder } from "store/actions/cart/ordersActions"
import { phoneToTextFormat, formatDateDMY } from "utils"
// import styles from "components/Cart/cart.module.sass"
// import cn from 'classnames'


const deliveryEmpty = {
  is: DELIVERY_IS.COURIER,
  courier_askRecipient: false,
  courier_street: 'Бабушкина',
  courier_house: '108',
  courier_flat: '117',
  courier_entrance: '5',
  courier_floor: '7',
  courier_comment: 'Домофон не работает',
  courier_price: 0
}

const recipientEmpty = {
  iamResipient: false,
  iDontKnowRecipientNumber: false,
  recipient_name: 'Юлия',
  recipient_phone: '+7(996)888-4455',
  postcard: true,
  postcardText: 'С днейм рождения'
}

const deliveryDateTimeEmpty = {
  askRecipient: false,
  date: new Date(),
  time: '',
  comment: 'Везите бережно'
}

const payEmpty = {
  pay: PAY_TYPES.CARD,
  pay_comment: 'К заказу добавить нечего'
}

const initialState = {
  customer: {
    order: 1,
    isPublic: true,
    isEdit: true,
    isValid: false,
    id: 0,
    name: 'Тест',
    phone: '+7(996)022-5657',
    toString() {
      return `${this.name}, ${phoneToTextFormat(this.phone)}`
    }
  },

  delivery: {
    order: 2,
    isPublic: true,
    isEdit: true,
    isValid: false,
    ...deliveryEmpty,
    toString() {
      if (this.is === DELIVERY_IS.COURIER &&
        this.courier_askRecipient === false) {
        return `
            ${this.courier_street} ${this.courier_house}
            ${this.courier_flat && `| кв. ${this.courier_flat}`}
            ${this.courier_entrance && `| ${this.courier_entrance} подъезд`}
            ${this.courier_floor && `| ${this.courier_floor} этаж`}
            ${this.courier_comment && `| Комментарий: ${this.courier_comment}`}
        `
      }
    }
  },

  recipient: {
    order: 3,
    isPublic: true,
    isEdit: true,
    isValid: false,
    ...recipientEmpty,
    toString() {
      return `
        ${this.iamResipient ? `Получаю сам` : `Имя: ${this.recipient_name}`}
        ${this.iDontKnowRecipientNumber ? ` | Не знаю номер получателя` : ` | Тел: ${this.recipient_phone}`}
        ${this.postcard ? ` | Текст открытки: ${this.postcardText} ` : ` | Без открытки`}
      `
    }
  },

  deliveryDateTime: {
    order: 4,
    isPublic: true,
    isEdit: true,
    isValid: false,
    ...deliveryDateTimeEmpty,
    toString() {
      const comment = this.comment ? `Коммент: ${this.comment}` : ``

      if (this.askRecipient) {
        return `Узнать время у получателя. ${comment}`
      }

      const [text, price] = this.time.split('*')
      return `${formatDateDMY(this.date)}, ${text}, Цена: ${price}, ${comment}`
    }
  },

  pay: {
    order: 5,
    isPublic: true,
    isEdit: true,
    isValid: false,
    ...payEmpty,
    toString(delivery_is) {
      const text = PAY_TEXTS_BY_DELIVERY_IS[delivery_is][this.pay]
      return `Оплата: ${text}; 
        ${this.pay_comment ? `Коммент: ${this.pay_comment}` : ``}`
    }
  }
}


const setInSteps = (data, steps) => {
  const stepNames = Object.keys(steps)

  return stepNames.reduce((acc, currentStep) => {
    return {
      ...acc,
      [currentStep]: {
        ...acc[currentStep],
        ...data
      }
    }
  }, steps)
}


class CartSteps extends Component {
  state = {
    ...initialState
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

  //nextStepName
  handleStepSubmit = (stepName, nextStepName = false) => (values, changesToState = {}) => {
    this.setState(prev => {
      let state = { ...prev }

      if (changesToState.stepName) {
        const { stepName, changes } = changesToState

        state = {
          ...state,
          [stepName]: {
            ...state[stepName],
            ...changes
          }
        }
      }

      return {
        ...state,
        [stepName]: {
          ...state[stepName],
          ...values,
          isValid: true,
          isEdit: false
        }
      }
    }, () => {
      if (nextStepName === false) this.handleSendOrder()

      let nextStep = nextStepName

      if (Array.isArray(nextStepName)) {
        nextStep = nextStepName.find(name =>
          this.state[name].isPublic === true)
      }

      this.setState(prev => ({
        ...prev,
        [nextStep]: {
          ...prev[nextStep],
          isEdit: true
        }
      }))
    })
  }

  handleTimeEnd = () => {
    this.setState(prev => ({
      confimTimerVisible: false
    }))
  }

  handleSendOrder = () => {
    const {
      customer,
      recipient,
      delivery,
      deliveryDateTime,
      pay
    } = this.state
    const { products, city } = this.props

    let steps_text =
      `Клиент: ${customer.toString()}\n\n` +
      `Доставка: ${delivery.toString()}\n\n` + //.replaceAll('            ', ''
      `Получатель: ${recipient.toString()}\n\n` +
      `Время доставка/самовывоза: ${deliveryDateTime.toString()}\n\n` +
      `Оплата: ${pay.toString(delivery.is)}`

    try {
      steps_text = steps_text.replace(/         |        /g, '')
    } catch (e) {
    }

    this.props.sendOrder({
      city_id: city.id,
      customer_id: customer.id, // todo: get this from sms response
      complete: false,
      steps: {
        customer,
        delivery,
        recipient,
        deliveryDateTime,
        pay
      },
      steps_text,
      products
    })
  }


  render() {
    const {
      customer, recipient, delivery,
      deliveryDateTime, pay
    } = this.state

    const deliveryTitle = delivery.is === DELIVERY_IS.COURIER ?
      'Доставка' : 'Самовывоз'
    const deliveryTimeTitle = delivery.is === DELIVERY_IS.COURIER ?
      'Время доставки' : 'Время самовывоза'
    let stepNumber = 1

    return (
      <>
        <Step number={stepNumber++} title="Ваши контакты" active={customer.isEdit}>
          {customer.isEdit ? (
            <CustomerForm
              initialValues={customer}
              onSubmit={this.handleStepSubmit('customer', 'delivery')}
            />
          ) : (
            <CustomerResult {...customer}>
              <ChangeButton onClick={this.handleChangeButton('customer')}/>
            </CustomerResult>
          )}
        </Step>

        <Step number={stepNumber++} title={deliveryTitle} active={delivery.isEdit}>
          {delivery.isEdit ? (
            <DeliveryForm
              initialValues={delivery}
              emptyValues={deliveryEmpty}
              onSubmit={this.handleStepSubmit('delivery', ['recipient', 'deliveryDateTime'])}
            />
          ) : (
            delivery.isValid && (
              <DeliveryResult {...delivery}>
                <ChangeButton onClick={this.handleChangeButton('delivery')}/>
              </DeliveryResult>
            )
          )}
        </Step>

        {/* {delivery.is !== DELIVERY_IS.YOURSELF && ( */}
        {recipient.isPublic !== false && (
          <Step number={stepNumber++} title="Получатель" active={recipient.isEdit}>
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
                  <ChangeButton onClick={this.handleChangeButton('recipient')}/>
                </RecipientResult>
              )
            )}
          </Step>
        )}


        <Step number={stepNumber++} title={deliveryTimeTitle} active={deliveryDateTime.isEdit}>
          {deliveryDateTime.isEdit ? (
            <DeliveryTimeForm
              initialValues={deliveryDateTime}
              emptyValues={deliveryDateTimeEmpty}
              isCourier={delivery.is === DELIVERY_IS.COURIER}
              onSubmit={this.handleStepSubmit('deliveryDateTime', 'pay')}/>
          ) : (
            deliveryDateTime.isValid && (
              <DeliveryTimeResult {...deliveryDateTime}>
                {deliveryDateTime.toString()}
                <ChangeButton onClick={this.handleChangeButton('deliveryDateTime')}/>
              </DeliveryTimeResult>
            )
          )}
        </Step>

        <Step number={stepNumber++} title="Оплата" active={pay.isEdit}>
          {pay.isEdit ? (
            <PayForm
              initialValues={pay}
              emptyValues={payEmpty}
              onSubmit={this.handleStepSubmit('pay')}
              delivery_is={delivery.is}
            />
          ) : (
            pay.isValid && (
              <PayResult {...pay} delivery_is={delivery.is}>
                <ChangeButton onClick={this.handleChangeButton('pay')}/>
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

export default withCity(CartStepsContainer)