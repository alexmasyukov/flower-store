import React, { useState } from 'react'
import { Form, Field } from 'react-final-form'
import Input from "components/Cart/Common/Input"
import NextButton from "components/Cart/Common/NextButton"
import styles from 'components/Cart/cart.module.sass'
import { addDays, getDay, getDaysInMonth } from 'date-fns'
import { getDayName, getMonthName } from "utils"
import cn from 'classnames'
import ExpandBlock from "components/ProductDetails/ExpandBlock"


const generateHours = (min, max) => {
  return Array.from({ length: max - min }).fill([0, 0])
    .map((item, idx) => {
      let from = min + idx
      let to = min + idx + 1

      if (to === 24) {
        to = '0'
      }

      return [
        from <= 9 ? `0${from}` : from,
        to <= 9 ? `0${to}` : to
      ]
    })
}

const getDisabledHours = (hours, min) =>
  hours.map(([from, to]) =>
    Number(to) <= min && to !== '00' ? [from, to, true] : [from, to])

const nowHour = (new Date()).getHours() + 1

const from_0_to_9 = generateHours(0, 9)
const from_9_to_15 = generateHours(9, 15)
const from_15_to_21 = generateHours(15, 21)
const from_21_to_24 = generateHours(21, 24)

console.log(from_21_to_24)

function getDays() {
  return Array.from({ length: 4 }).fill(new Date())
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
    .map((day, idx) => {
      const today = idx === 0

      const times = [
        {
          title: 'c 00:00 до 9:00',
          hours: today ?
            getDisabledHours(from_0_to_9, nowHour) : from_0_to_9,
          isVisible: 0 < nowHour < 9
        },
        {
          title: 'c 09:00 до 15:00',
          hours: today ?
            getDisabledHours(from_9_to_15, nowHour) : from_9_to_15,
          isVisible: 9 < nowHour < 15
        },
        {
          title: 'c 15:00 до 21:00',
          hours: today ?
            getDisabledHours(from_15_to_21, nowHour) : from_15_to_21,
          isVisible: 15 < nowHour < 21
        },
        {
          title: 'c 21:00 до 24:00',
          hours: today ?
            getDisabledHours(from_21_to_24, nowHour) : from_21_to_24,
          isVisible: 21 < nowHour < 24 || nowHour === 0
        }
        // two: {
        //   ...times_two,
        //   hours: idx === 0 ?
        //     getDisabledHours(times_two.hours, nowHour) : times_two.hours,
        //   isVisible: 15 < nowHour < 21
        // },
        // three: {
        //   ...times_three,
        //   hours: idx === 0 ?
        //     getDisabledHours(times_three.hours, nowHour) : times_three.hours,
        //   isVisible: [21, 22, 23, 24, 0, 1, 2, 3, 4, 5, 6, 7, 8].some(item => item === nowHour)
        // }
      ]

      return {
        ...day,
        times,
        isActive: idx === 0
      }
    })
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


const DaysButtons = ({ days, onClick }) => {
  return (
    <ul className={styles.daysBtns}>
      {days.map((day, idx) => (
        <li
          key={idx}
          onClick={onClick(idx)}
          className={cn(day.isActive && styles.dayBtnActive)}
        >
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

const DeliveryTimeForm = ({
                            isCourier,
                            initialValues,
                            emptyValues,
                            onSubmit
                          }) => {
  const [days, setDays] = useState(getDays())

  const handleDayClick = (dayIdx) => () => {
    const update = days.map((day, idx) =>
      idx === dayIdx ? {
        ...day,
        isActive: true
      } : {
        ...day,
        isActive: false
      })

    setDays(update)
  }

  const handleSubmit = (values) => {
    alert(JSON.stringify(values))
    // onSubmit(values)
  }

  const activeDay = days.filter(day => day.isActive === true)[0]

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

                  <DaysButtons days={days} onClick={handleDayClick}/>



                  <div className={styles.timesButtons}>
                    {activeDay.times.map((time, idx) => (
                      <ExpandBlock
                        key={idx}
                        title={time.title}
                        initVisible={time.isVisible}
                      >
                        {time.hours.map(([from, to, disabled]) => (
                          <Radio
                            key={from}
                            value={`${from}:00 - ${to}:00`}
                            disabled={disabled}
                          />
                        ))}
                      </ExpandBlock>
                    ))}



                    {/*<ExpandBlock*/}
                      {/*title={activeDay.times.two.title}*/}
                      {/*initVisible={activeDay.times.two.isVisible}*/}
                    {/*>*/}
                      {/*{activeDay.times.two.hours.map(([from, to, disabled]) => (*/}
                        {/*<Radio*/}
                          {/*key={from}*/}
                          {/*value={`${from}:00 - ${to}:00`}*/}
                          {/*disabled={disabled}*/}
                        {/*/>*/}
                      {/*))}*/}
                    {/*</ExpandBlock>*/}

                    {/*<ExpandBlock*/}
                      {/*title={activeDay.times.three.title}*/}
                      {/*initVisible={activeDay.times.three.isVisible}*/}
                    {/*>*/}
                      {/*{activeDay.times.three.hours.map(([from, to, disabled]) => (*/}
                        {/*<Radio*/}
                          {/*key={from}*/}
                          {/*value={`${from}:00 - ${to}:00`}*/}
                          {/*disabled={disabled}*/}
                        {/*/>*/}
                      {/*))}*/}
                    {/*</ExpandBlock>*/}
                  </div>


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