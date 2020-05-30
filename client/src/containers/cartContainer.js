import React, { Component } from 'react'
import cn from 'classnames'
import {
   string as YupString,
   object as YupObject,
   setLocale
} from 'yup'
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
import { orderConfirmationSelector } from "store/selectors/cart"
import { fetchOrderConfirmation } from "store/actions/cart/ordersActions"
import CartProductListContainer from "containers/cartProductListContainer"


const initialState = {
   customer: {
      isEdit: true,
      isValid: true,
      name: 'Алексей',
      phone: '+79960225657'
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

const customerSchema = YupObject().shape({
   // name: YupString().min(3, VM.MIN_SYMBOLS(3, 'символа')).required(VM.REQUIRE),
   name: YupObject().shape({
      one: YupString().min(3, VM.MIN_SYMBOLS(3, 'символа')).required(VM.REQUIRE)
   }),
   phone: YupString().min(3, VM.MIN_SYMBOLS(3, 'символа')).required(VM.REQUIRE)
})


customerSchema
   .validate({
      name: {
         one: ''
      },
      phone: ''
   }, validateOptions)
   .then((valid) => {
      console.log(valid)
   })
   .catch((err) => {
      const errors = err.inner.map(item => ({
         path: item.path,
         message: item.message
      }))
      // console.log(errors)
   })


class Cart extends Component {
   state = {
      customer: initialState.customer,
      recipient: initialState.recipient,
      delivery: initialState.delivery,
      deliveryDateTime: initialState.deliveryDateTime,
      pay: initialState.pay,
      confirmation: {
         isEdit: false,
         done: false,
         error: false,
         smsCode: ''
      }
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
      if (this.validate(currentStep)) {

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

         return
      }

      alert('no valid')
   }

   handleSendOrder = () => {
      const { confirmation: { smsCode, error, done } } = this.state
      const { orderConfirmation } = this.props

      if (!orderConfirmation.code && !done) {
         this.props.fetchOrderConfirmation()
         return
      }

      if (orderConfirmation.code.toString() === smsCode.toString()) {
         this.setState(prev => ({
            confirmation: {
               ...prev.confirmation,
               done: true
            }
         }))
      } else {
         this.setState(prev => ({
            confirmation: {
               ...prev.confirmation,
               error: true
            }
         }))
      }
   }

   render() {
      const {
         customer, recipient, delivery,
         deliveryDateTime, pay, confirmation
      } = this.state

      const { orderConfirmation } = this.props

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

      if (confirmation.done) {
         return (
            <Row>
               Готово!
            </Row>
         )
      }

      // todo: переписать это через контекст
      //   https://ru.reactjs.org/docs/context.html
      return (
         <Row>
            <div className={cn('col-4')}>
               <Step number={1} title="Ваши контакты" active={customer.isEdit}>
                  {customer.isEdit ? (
                     <CustomerForm {...customer} onInputChange={this.handleInputChange}>
                        <NextButton onClick={this.handleNextButton('customer', 'recipient')}/>
                     </CustomerForm>
                  ) : (
                     customer.isValid && (
                        <CustomerResult  {...customer}>
                           <ChangeButton onClick={this.handleChangeButton('customer')}/>
                        </CustomerResult>
                     )
                  )}
               </Step>

               {/*deliveryTitle*/}
               <Step number={2} title={'Доставка / самовывоз'} active={delivery.isEdit}>
                  {delivery.isEdit ? (
                     <DeliveryForm {...delivery} onInputChange={this.handleInputChange}>
                        <NextButton onClick={this.handleNextButton('delivery', 'deliveryDateTime')}/>
                     </DeliveryForm>
                  ) : (
                     delivery.isValid && (
                        <DeliveryResult {...delivery}>
                           <ChangeButton onClick={this.handleChangeButton('delivery')}/>
                        </DeliveryResult>
                     )
                  )}
               </Step>
               <Step number={3} title="Получатель" active={recipient.isEdit}>
                  {recipient.isEdit ? (
                     <RecipientForm {...recipient} onInputChange={this.handleInputChange}>
                        <NextButton onClick={this.handleNextButton('recipient', 'delivery')}/>
                     </RecipientForm>
                  ) : (
                     recipient.isValid && (
                        <RecipientResult {...recipient}>
                           <ChangeButton onClick={this.handleChangeButton('recipient')}/>
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
                        <NextButton onClick={this.handleNextButton('deliveryDateTime', 'pay')}/>
                     </DeliveryTimeForm>
                  ) : (
                     deliveryDateTime.isValid && (
                        <DeliveryTimeResult {...deliveryDateTime}>
                           <ChangeButton onClick={this.handleChangeButton('deliveryDateTime')}/>
                        </DeliveryTimeResult>
                     )
                  )}
               </Step>
               <Step number={5} title="Оплата" active={pay.isEdit}>
                  {pay.isEdit ? (
                     <PayForm
                        {...pay}
                        orderConfirmation={orderConfirmation}
                        confirmError={confirmation.error}
                        cardTypeEnabled={delivery.is === DELIVERY_IS.YOURSELF}
                        cardTypeTitle={delivery.is === DELIVERY_IS.YOURSELF ?
                           'Наличные' : 'Наличными курьеру'}
                        payType={payType}
                        onInputChange={this.handleInputChange}
                     >
                        <button className={styles.nextButton} onClick={this.handleSendOrder}>
                           {orderConfirmation.code ? 'Подтвердить' : 'Оформить заказ'}
                        </button>

                        {/*klumba.store*/}
                        {/*Ваш заказ №12 получен, мы вам перезвоним.*/}

                     </PayForm>
                  ) : (
                     pay.isValid && (
                        <PayResult {...pay}>
                           <ChangeButton onClick={this.handleChangeButton('pay')}/>
                        </PayResult>
                     )
                  )}
               </Step>
            </div>
            <div className="col-6">
               <CartProductListContainer />
            </div>
         </Row>
      )
   }
}

const mapStateToProps = state => ({
   orderConfirmation: orderConfirmationSelector(state)
})

const mapDispatchToProps = {
   fetchOrderConfirmation
}

const CartContainer = connect(
   mapStateToProps,
   mapDispatchToProps
)(Cart)

export default CartContainer