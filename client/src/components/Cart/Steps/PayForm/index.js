import React from 'react'
import { Form, Field } from 'react-final-form'
import { PAY_TYPES, PAY_TEXTS_BY_DELIVERY_IS, DELIVERY_IS } from "constants/common"
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
   delivery_is = DELIVERY_IS.COURIER,
   children
}) => {

   return (
      <div className={cartStyles.form}>
         <Form
            onSubmit={onSubmit}
            initialValues={initialValues}
            validate={(values) => {
               const errors = {}
               return errors
            }}
            render={({ handleSubmit, submitting }) => {
               return (
                  <form onSubmit={handleSubmit}>
                     <Field name="pay" type="radio" value={PAY_TYPES.CARD}>
                        {({ input }) =>
                           <Input
                              label={PAY_TEXTS_BY_DELIVERY_IS[delivery_is].CARD}
                              {...input}
                           />}
                     </Field>

                     <Field name="pay" type="radio" value={PAY_TYPES.CASH}>
                        {({ input }) =>
                           <Input
                              label={PAY_TEXTS_BY_DELIVERY_IS[delivery_is].CASH}
                              {...input}
                           />}
                     </Field>

                     <Field name="pay" type="radio" value={PAY_TYPES.TO_CORPORATE_CARD}>
                        {({ input }) =>
                           <Input
                              label={PAY_TEXTS_BY_DELIVERY_IS[delivery_is].TO_CORPORATE_CARD}
                              {...input}
                           />}
                     </Field>

                     <Field name="pay" type="radio" value={PAY_TYPES.CARD_ONLINE}>
                        {({ input }) =>
                           <Input
                              label={PAY_TEXTS_BY_DELIVERY_IS[delivery_is].CARD_ONLINE}
                              {...input}
                           />}
                     </Field>

                     <Icons />

                     <br /><br />

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