import React from 'react'
import { Form, Field } from 'react-final-form'
import { PAY_TYPES } from "constants/common"
import Input from "components/Cart/Common/Input"
import NextButton from "components/Cart/Common/NextButton"
import { ReactComponent as MasterCard } from './mastercard.svg';
import { ReactComponent as ApplePay } from './apple-pay.svg';
import { ReactComponent as GooglePay } from './google-pay-logo.svg';
import { ReactComponent as Mir } from './mir.svg';
import { ReactComponent as Visa } from './visa.svg';
import cartStyles from "components/Cart/cart.module.sass"
import styles from "./PayForm.module.sass"


const Icons = () => (
   <div className={styles.ml}>
      <p>
         Оплата производится через
         платежный шлюз ПАО "СБЕРБАНК"
      </p>
      <div className={styles.icons}>
         <MasterCard />
         <Visa />
         <Mir />
         <ApplePay />
         <GooglePay height="14" />
      </div>
   </div>
)

const PayForm = ({
   initialValues,
   emptyValues,
   onSubmit,
   payType = PAY_TYPES.CARD,
   payToCourier = true,
   comment,
   children
}) => {

   const handleSubmit = (values) => {
      onSubmit(values)
   }

   return (
      <div className={cartStyles.form}>
         <Form
            onSubmit={handleSubmit}
            initialValues={initialValues}
            validate={(values) => {
               const errors = {}

               // if (values.courier_askRecipient === false) {
               //    if (!values.courier_street) errors.courier_street = 'Заполните'
               // }

               return errors
            }}
            render={({ handleSubmit, form, submitting, values }) => {
               return (
                  <form onSubmit={handleSubmit}>
                     <Field name="pay" type="radio" value={PAY_TYPES.CARD}>
                        {({ input }) =>
                           <Input
                              label={payToCourier ? 'Картой курьеру' : 'Оплата картой'}
                              {...input}
                           />}
                     </Field>

                     <Field name="pay" type="radio" value={PAY_TYPES.CASH}>
                        {({ input }) =>
                           <Input
                              label={payToCourier ? 'Наличными курьеру' : 'Наличные'}
                              {...input}
                           />}
                     </Field>

                     <Field name="pay" type="radio" value={PAY_TYPES.TO_CORPORATE_CARD}>
                        {({ input }) => <Input label='Перевод на карту «Сбербанк»' {...input} />}
                     </Field>

                     <Field name="pay" type="radio" value={PAY_TYPES.CARD_ONLINE}>
                        {({ input }) => <Input label='Оплата онлайн' {...input} />}
                     </Field>

                     <Icons />

                     <br />

                     <Field name="pay_comment">
                        {({ input, meta }) =>
                           <Input type="textarea"
                              placeholder="Комментарий к заказу"
                              disabled={submitting}
                              meta={meta}
                              maxRows={2}
                              max={100}
                              {...input} />}
                     </Field>

                     {children}

                     <NextButton
                        title='Оформить заказ'
                        type="submit"
                        disabled={submitting}
                     />
                  </form>
               )
            }}
         />
      </div>
   )
}

export default PayForm