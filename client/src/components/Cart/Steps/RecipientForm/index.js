import React from 'react'
import { Form, Field } from 'react-final-form'
import Input from "components/Cart/Common/Input"
import NextButton from "components/Cart/Common/NextButton"
import styles from 'components/Cart/cart.module.sass'

const RecipientForm = ({
                         initialValues,
                         emptyValues,
                         onSubmit,
                         isVisible_iamResipient,
                         isVisible_iDontKnowRecipientNumber
                       }) => {

  const handleSubmit = (values) => {
    alert(JSON.stringify(values))
    // onSubmit(values)
  }

  return (
    <div className={styles.form}>
      <Form
        onSubmit={handleSubmit}
        initialValues={initialValues}
        validate={(values) => {
          const errors = {}

          if (values.iamResipient === false) {
            if (!values.recipient_name) errors.recipient_name = 'Заполните'
          }

          if (values.iDontKnowRecipientNumber === false) {
            if (!values.recipient_phone) errors.recipient_phone = 'Заполните'
          }

          return errors
        }}
        render={({ handleSubmit, form, submitting, values }) => {
          return (
            <form onSubmit={handleSubmit}>
              {isVisible_iamResipient && (
                <Field name="iamResipient" type="checkbox">
                  {({ input }) =>
                    <Input
                      label="Я получатель"
                      {...input}
                      style={{ marginBottom: '10px' }}
                    />}
                </Field>
              )}

              {!values.iamResipient && (
                <>
                  <Field name="recipient_name">
                    {({ input, meta }) =>
                      <Input
                        placeholder="Имя получателя"
                        {...input}
                        disabled={submitting}
                        meta={meta}
                        style={{ marginBottom: '20px' }}
                      />}
                  </Field>

                  {isVisible_iDontKnowRecipientNumber && (
                    <Field name="iDontKnowRecipientNumber" type="checkbox">
                      {({ input }) =>
                        <Input
                          label="Я не знаю номер получателя"
                          {...input}
                          style={{ marginBottom: '10px' }}
                        />}
                    </Field>
                  )}

                  {!values.iDontKnowRecipientNumber && (
                    <Field name="recipient_phone">
                      {({ input, meta }) =>
                        <Input
                          placeholder="Телефон получателя"
                          {...input}
                          disabled={submitting}
                          meta={meta}
                          style={{ marginBottom: '20px' }}
                        />}
                    </Field>
                  )}
                </>
              )}

              <Field name="postcard" type="checkbox">
                {({ input }) =>
                  <Input
                    label="Открытка (+50₽)"
                    {...input}
                    style={{ marginBottom: '10px' }}
                  />}
              </Field>

              {values.postcard && (
                <Field name="courier_comment">
                  {({ input, meta }) =>
                    <Input type="textarea"
                           placeholder="Комментарий"
                           disabled={submitting}
                           meta={meta}
                           maxRows={5}
                           max={100}
                           {...input}/>}
                </Field>
              )}

              <NextButton
                type="submit"
                disabled={submitting}
              />
            </form>
          )
        }}
      />
      {/*{children}*/}
    </div>
  )
}


export default RecipientForm