import React from 'react'
import { Form, Field } from 'react-final-form'
import Input from "components/Cart/Common/Input"
import { Row } from "components/Bootstrap"
import NextButton from "components/Cart/Common/NextButton"
import { DELIVERY_IS } from "constants/common"
import styles from "components/Cart/cart.module.sass"


const DeliveryForm = ({
                        is,
                        courierDirection,
                        onInputChange,
                        children
                      }) => {
  const handleSubmit = (values) => {
    alert(JSON.stringify(values))
  }

  return (
    <div className={styles.form}>
      <Form
        initialValues={{
          is: DELIVERY_IS.COURIER,

          courier_askRecipient: false,
          courier_street: 'street',
          courier_house: '',
          courier_flat: '',
          courier_entrance: '',
          courier_floor: '',
          courier_comment: '',
          courier_price: 0
        }}
        onSubmit={handleSubmit}
        validate={values => {
          const errors = {}

          if (values.is === DELIVERY_IS.COURIER) {
            if (!values.courier_street) errors.courier_street = 'Заполните'
            if (!values.courier_house) errors.courier_house = 'Заполните'
          }

          return errors
        }}
        render={({
                   handleSubmit,
                   form,
                   submitting,
                   values
                 }) => {
          // console.log('render form', other)
          return (
            <form onSubmit={handleSubmit}>
              <Row>
                <div className="col-md-5">
                  <Field name="is" type="radio" value={DELIVERY_IS.COURIER}>
                    {({ input }) => <Input label="Курьером" {...input}/>}
                  </Field>
                </div>

                  <div className="col-md-7">
                  <Field name="is" type="radio" value={DELIVERY_IS.YOURSELF}>
                    {({ input }) => <Input label="Самовывоз" {...input}/>}
                  </Field>
                </div>
              </Row>

              {values.is === DELIVERY_IS.COURIER ? (
                <>
                  <Field name="courier_askRecipient" type="checkbox">
                    {({ input }) =>
                      <Input label="Узнать адрес у получателя" {...input}/>}
                  </Field>


                  {values.courier_askRecipient === false && (
                    <>
                      <Field name="courier_street">
                        {({ input, meta }) =>
                          <Input placeholder="Улица" {...input} disabled={submitting} meta={meta}/>}
                      </Field>

                      <Row>
                        <div className="col-md-6 pr-1">
                          <Field name="courier_house">
                            {({ input, meta }) =>
                              <Input placeholder="Дом" {...input} disabled={submitting} meta={meta}/>}
                          </Field>
                        </div>
                        <div className="col-md-6 pl-1">
                          <Field name="courier_flat">
                            {({ input, meta }) =>
                              <Input placeholder="Квартира / офис" {...input} disabled={submitting} meta={meta}/>}
                          </Field>
                        </div>

                        <div className="col-md-6 pr-1">
                          <Field name="courier_entrance">
                            {({ input, meta }) =>
                              <Input placeholder="Подъезд" {...input} disabled={submitting} meta={meta}/>}
                          </Field>
                        </div>
                        <div className="col-md-6 pl-1">
                          <Field name="courier_floor">
                            {({ input, meta }) =>
                              <Input placeholder="Этаж" {...input} disabled={submitting} meta={meta}/>}
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
                                 {...input}
                          />}
                      </Field>
                    </>
                  )}

                </>
              ) : (
                <>
                  <p>Чита, ...адрес</p>
                  <div>Карта</div>
                </>
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

export default DeliveryForm