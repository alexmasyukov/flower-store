import React from 'react'
import { Form, Field } from 'react-final-form'

import Input from "components/Cart/Common/Input"
import { Row } from "components/Bootstrap"
import NextButton from "components/Cart/Common/NextButton"
import { DELIVERY_IS } from "constants/common"
import { compose, when } from "utils"

import styles from "components/Cart/cart.module.sass"
import loadable from '@loadable/component'

const YourselfMap = loadable(() => import('components/Cart/Common/YourselfMap'), () => <div>Загрузка...</div>)

const run = (cb) => new Promise(resolve => cb(resolve))

const DeliveryForm = ({
  initialValues,
  emptyValues,
  onSubmit,
  // onSetKeyValue
}) => {
  const handleSubmit = (values) => {
    let changes = {}

    // onSetKeyValue('recipient', { iamResipient: false })
    if (values.is === DELIVERY_IS.YOURSELF) {
      changes = {
        ...changes,
        isPublic: false
      }
    } else {
      changes = {
        ...changes,
        isPublic: true
      }
    }

    if (values.is === DELIVERY_IS.COURIER && values.courier_askRecipient) {
      changes = {
        ...changes,
        iamResipient: false
      }
    }

    const data = compose(
      when(values.is === DELIVERY_IS.YOURSELF, (values) => {
        const { is: _, ...baseEmpty } = emptyValues

        return {
          ...values,
          ...baseEmpty
        }
      }),
      when(
        values.is === DELIVERY_IS.YOURSELF || values.courier_askRecipient,
        (values) => {
          const { is: _, courier_askRecipient: __, ...baseEmpty } = emptyValues
          return {
            ...values,
            ...baseEmpty
          }
        })
    )(values)

    onSubmit({
      ...emptyValues,
      ...data,
      isValid: true
    }, {
      stepName: 'recipient',
      changes
    })
    // () => {
    //   const changes = {}

    //   // onSetKeyValue('recipient', { isPublic: true })

    //   if (values.is === DELIVERY_IS.YOURSELF) {
    //     changes.recipient.isPublic = false
    //   } else {
    //     changes.recipient.isPublic = true
    //   }

    //   if (values.is === DELIVERY_IS.COURIER && values.courier_askRecipient) {
    //     changes.recipient.iamResipient = false
    //     // onSetKeyValue('recipient', { iamResipient: false })
    //   }

    // })
  }

  return (
    <div className={styles.form}>
      <Form
        onSubmit={handleSubmit}
        initialValues={initialValues}
        validate={(values) => {
          const errors = {}

          if (
            values.is === DELIVERY_IS.COURIER &&
            values.courier_askRecipient === false
          ) {
            if (!values.courier_street) errors.courier_street = 'Заполните'
            if (!values.courier_house) errors.courier_house = 'Заполните'
          }

          return errors
        }}
        render={({ handleSubmit, form, submitting, values }) => {
          return (
            <form onSubmit={handleSubmit}>
              <Row>
                <div className="col-md-5">
                  <Field name="is" type="radio" value={DELIVERY_IS.COURIER}>
                    {({ input }) => <Input label="Курьером" {...input} />}
                  </Field>
                </div>

                <div className="col-md-7">
                  <Field name="is" type="radio" value={DELIVERY_IS.YOURSELF}>
                    {({ input }) => <Input label="Самовывоз" {...input} />}
                  </Field>
                </div>
              </Row>

              <hr />

              {values.is === DELIVERY_IS.COURIER ? (
                <>
                  <Field name="courier_askRecipient" type="checkbox">
                    {({ input }) =>
                      <Input label="Узнать адрес у получателя" {...input} />}
                  </Field>


                  {values.courier_askRecipient === false && (
                    <>
                      <Field name="courier_street">
                        {({ input, meta }) =>
                          <Input placeholder="Улица" {...input} disabled={submitting} meta={meta} />}
                      </Field>

                      <Row>
                        <div className="col-md-6 pr-1">
                          <Field name="courier_house">
                            {({ input, meta }) =>
                              <Input placeholder="Дом" {...input} disabled={submitting} meta={meta} />}
                          </Field>
                        </div>
                        <div className="col-md-6 pl-1">
                          <Field name="courier_flat">
                            {({ input, meta }) =>
                              <Input placeholder="Квартира / офис" {...input} disabled={submitting} meta={meta} />}
                          </Field>
                        </div>

                        <div className="col-md-6 pr-1">
                          <Field name="courier_entrance">
                            {({ input, meta }) =>
                              <Input placeholder="Подъезд" {...input} disabled={submitting} meta={meta} />}
                          </Field>
                        </div>
                        <div className="col-md-6 pl-1">
                          <Field name="courier_floor">
                            {({ input, meta }) =>
                              <Input placeholder="Этаж" {...input} disabled={submitting} meta={meta} />}
                          </Field>
                        </div>
                      </Row>

                      <Field name="courier_comment">
                        {({ input, meta }) =>
                          <Input type="textarea"
                            placeholder="Комментарий"
                            disabled={submitting}
                            meta={meta}
                            maxRows={2}
                            max={100}
                            {...input} />}
                      </Field>
                    </>
                  )}

                </>
              ) : (
                  <YourselfMap />
                )}


              <NextButton
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

export default DeliveryForm