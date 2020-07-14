import React, { useState } from 'react'
import { Form, Field } from 'react-final-form'
import Input from "components/Cart/Common/Input"
import NextButton from "components/Cart/Common/NextButton"
import styles from 'components/Cart/cart.module.sass'
import { addDays, getDay, getDaysInMonth } from 'date-fns'
import { getDayName, getMonthName } from "utils"


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


const DayBtn = ({ title }) => {
  return <div>|{title}|</div>
}


const DaysButtons = ({ onClick }) => {
  const days = Array.from({ length: 4 }).fill(new Date())
    .map((day, i) => ({
      date: addDays(day, i),
      dayM() {
        return this.date.getDate()
      },
      month() {
        return getMonthName(this.date.getMonth()).substr(0, 3)
      },
      name() {
        return getDayName(getDay(this.date)).short.toUpperCase()
      }
    }))

  return (
    <ul className={styles.daysBtns}>
      {days.map((day, i) => (
        <li key={i} onClick={onClick}>
          <span>
            {day.name()}
            <br/>{day.month()} {day.dayM()}
          </span>
        </li>
      ))}
      <li onClick={onClick}>
        <span>
          Кале
          </span>
      </li>
    </ul>
  )
}


const ExpandBlock = ({ title = '', isVisible = false, children }) => {
  const [visible, setVisible] = useState(isVisible)

  return (
    <>
      <h4 onClick={() => setVisible(!visible)}>{title}</h4>
      {visible && children}
    </>
  )
}

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
                  {/*<p className={styles.blockText}>*/}
                  {/*Выберите удобный интервал времени*/}
                  {/*{isCourier ? ' доставки для получателя' : ' для самовывоза'}*/}
                  {/*</p>*/}

                  <DaysButtons onClick={() => {}}/>

                  <ExpandBlock title={part_one.title} isVisible={true}>
                    {part_one.chours.map(([from, to]) => (
                      <Radio
                        key={from}
                        value={`${from}:00 - ${to}:00`}
                        disabled={true}
                      />
                    ))}
                  </ExpandBlock>

                  <ExpandBlock title={part_two.title} isVisible={false}>
                    {part_two.chours.map(([from, to]) => (
                      <Radio
                        key={from}
                        value={`${from}:00 - ${to}:00`}/>
                    ))}
                  </ExpandBlock>

                  <ExpandBlock title={part_three.title} isVisible={false}>
                    {part_three.chours.map(([from, to]) => (
                      <Radio
                        key={from}
                        value={`${from}:00 - ${to}:00`}/>
                    ))}
                  </ExpandBlock>


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