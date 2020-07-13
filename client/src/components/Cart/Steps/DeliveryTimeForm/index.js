import React from 'react'
import { Form, Field } from 'react-final-form'
import Input from "components/Cart/Common/Input"
import NextButton from "components/Cart/Common/NextButton"
import styles from 'components/Cart/cart.module.sass'


// function range(start = 0, end = 1) {
//   return Array.from({ length: end - start + 1 }, (v, k) => k + start)
// }

// const TimesGroup = ({ start = 9, end = 15, reverse = false, children }) => {
//   let from = start,
//       to = end
//
//   if (reverse) {
//     from = end
//     to = start
//   }
//   // console.log(range(from, to))
//
//   return range(from, to)
//     .reduce((acc, current, idx, arr) => {
//       const next = arr[idx + 1]
//       if (!next) return acc
//       return [...acc, [current, next]]
//     }, [])
//     .reverse()
//     .map(([first, second]) => children(first, second))
// }

const part_one = {
  title: 'c 09:00 до 15:00',
  chours: [
    [9, 10],
    [10, 11],
    [11, 12],
    [12, 13],
    [13, 14],
    [14, 15]
  ]
}

const part_two = {
  title: 'c 15:00 до 21:00',
  chours: [
    [15, 16],
    [16, 17],
    [17, 18],
    [18, 19],
    [19, 20],
    [20, 21]
  ]
}

const part_three = {
  title: 'c 21:00 до 09:00',
  chours: [
    [21, 22],
    [22, 23],
    [23, '00'],
    ['00', '01'],
    ['01', '02'],
    ['02', '03'],
    ['03', '04'],
    ['04', '05'],
    ['05', '06'],
    ['06', '07'],
    ['07', '08'],
    ['08', '09']
  ]
}

const TimesGroup = ({title = '', expand = false, children}) => {
  return (
    <div>
      <h1>{title}</h1>
      {children}
    </div>
  )
}


const Radio = ({ value, disabled = false }) => (
  <Field name="hours" type="radio" value={value}>
    {({ input }) =>
      <Input
        label={value}
        {...input}
        disabled={disabled}
      />}
  </Field>
)


const DeliveryTimeForm = ({
                            isCourier,
                            initialValues,
                            emptyValues,
                            onSubmit
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
          return errors
        }}
        render={({ handleSubmit, form, submitting, values }) => {
          return (
            <form onSubmit={handleSubmit}>
              {isCourier && (
                <Field name="askRecipient" type="checkbox">
                  {({ input }) =>
                    <Input
                      label="Узнать время у получателя"
                      {...input}
                    />}
                </Field>
              )}

              {!values.askRecipient && (
                <>
                  <p className={styles.blockText}>
                    Выберите удобный интервал времени
                    {isCourier ? ' доставки для получателя' : ' для самовывоза'}
                  </p>

                  <TimesGroup title={part_one.title} expand={true}>
                    {part_one.chours.map(([from, to]) => (
                      <Radio
                        key={from}
                        value={`${from}:00 - ${to}:00`}
                        disabled={true}
                      />
                    ))}
                  </TimesGroup>

                  {part_two.chours.map(([from, to]) => (
                    <Radio
                      key={from}
                      value={`${from}:00 - ${to}:00`}/>
                  ))}

                  {part_three.chours.map(([from, to]) => (
                    <Radio
                      key={from}
                      value={`${from}:00 - ${to}:00`}/>
                  ))}


                  {/*{isCourier ? (*/}
                  {/*<p>*/}
                  {/*Доставка, за пределами центрального района,*/}
                  {/*рассчитывается индивидуально*/}
                  {/*</p>*/}
                  {/*) : (*/}
                  {/*<p>sfssfss</p>*/}
                  {/*С 09 до 21 - 200₽*/}
                  {/*С 21 до 09 - 400₽*/}
                  {/**/}
                  {/*С 9-15 (раскрывается 9-10, 10-11 и т.д.),*/}
                  {/*С 15-21,*/}
                  {/*С 21-09 (+200₽)*/}
                  {/**/}
                  {/**/}
                  {/*Разделеняем время на интервалы по часу*/}
                  {/*с 9:00 до 21:00 бесплатно*/}

                  {/*)}*/}
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
    </div>
  )
}


export default DeliveryTimeForm