import React, { useState, useEffect } from 'react'
import { Form, Field } from 'react-final-form'
import Input from "components/Cart/Common/Input"
import NextButton from "components/Cart/Common/NextButton"
import styles from 'components/Cart/cart.module.sass'
import { addDays, getDay, getDaysInMonth } from 'date-fns'
import { connect } from 'react-redux'
import { compose, getDayName, getMonthName, when } from "utils"
import cn from 'classnames'
import { deliveryDateSelector, deliveryTodaySelector } from "store/selectors/ui"
import { setDeliveryDate } from "store/actions/uiActions"
import ModalCalendar from "components/Cart/Steps/DeliveryTimeForm/ModalCalendar"
// import ExpandBlock from "components/ProductDetails/ExpandBlock"


const ExpandBlock = ({ title = '', initVisible = false, children }) => {
  const [visible, setVisible] = useState(initVisible)
  useEffect(() => {
    setVisible(initVisible)
  }, [initVisible])

  return (
    <>
      <h4 onClick={() => setVisible(!visible)}>{title}</h4>
      {visible && children}
    </>
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


const DaysButtons = ({ days, onClick, calendarBtnOnClick }) => {
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
      <li onClick={calendarBtnOnClick}>
        <div className={styles.cIcon}/>
      </li>
    </ul>
  )
}


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


function getDays(fromDate) {
  return Array.from({ length: 3 }).fill(fromDate)
    .map((day, idx) => {
      const date = addDays(day, idx)

      return {
        date,
        dayM() {
          return this.date.getDate()
        },
        month() {
          return getMonthName(this.date.getMonth()).substr(0, 3)
        },
        name() {
          return getDayName(getDay(this.date)).short.toUpperCase()
        },
        isActive: idx === 0
      }
    })
}


const getDisabledHours = (hours, min) =>
  hours.map(([from, to]) =>
    Number(to) <= min && to !== '00' ? [from, to, true] : [from, to])

const getDisabledTimes = (min) => (times) => {
  return times.map(({ hours, ...base }) => ({
    ...base,
    hours: getDisabledHours(hours, min)
  }))
}
//
// const from_0_to_9 = generateHours(0, 9)
// const from_9_to_15 = generateHours(9, 15)
// const from_15_to_21 = generateHours(15, 21)
// const from_21_to_24 = generateHours(21, 24)
const nowHour = (new Date()).getHours()
const hourWithPreparing = nowHour + 1
//
// console.log('nowHour', nowHour)
// console.log('hourWithPreparing', hourWithPreparing)
// console.log(from_0_to_9)
// console.log(from_9_to_15)
// console.log(from_15_to_21)
// console.log('from_21_to_24', from_21_to_24)


const times = [
  {
    title: 'c 00:00 до 9:00',
    hours: generateHours(0, 9),
    isVisible: true
  },
  {
    title: 'c 09:00 до 15:00',
    hours: generateHours(9, 15),
    isVisible: false
  },
  {
    title: 'c 15:00 до 21:00',
    hours: generateHours(15, 21),
    isVisible: false
  },
  {
    title: 'c 21:00 до 24:00',
    hours: generateHours(21, 24),
    isVisible: false
  }
]


const setVisibilityNeedTimes = (max) => (times) => {
  return times.map(time => {
    const [from, to] = time.hours[time.hours.length - 1]

    return +to > max || to === '00' ? {
      ...time,
      isVisible: true
    } : {
      ...time,
      isVisible: false
    }
  })
}

const DeliveryTimeForm = ({
                            isCourier,
                            initialValues,
                            emptyValues,
                            onSubmit,
                            deliveryDate,
                            todayDate,
                            setDeliveryDate
                          }) => {
  const [days, setDays] = useState(getDays(deliveryDate))
  const [calendarIsOpen, setCalendarIsOpen] = useState(false)

  useEffect(() => {
    setDays(getDays(deliveryDate))
  }, [deliveryDate])

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

  const handleDateChange = (date) => {
    console.log(date)
    setDeliveryDate(date)
  }

  const activeDay = days.filter(day => day.isActive === true)[0]
  const isToday = todayDate.getDate() === activeDay.date.getDate()

  const selectDayTimes = compose(
    when(isToday === true, setVisibilityNeedTimes(hourWithPreparing)),
    when(isToday === true, getDisabledTimes(hourWithPreparing))
  )(times)


  // console.log('activeDay', activeDay.isToday === true, activeDay)
  // console.log('todayDate', todayDate, activeDay.date, isToday)
  // console.log('selectDayTimes', selectDayTimes)

  return (
    <div className={styles.form}>
      <Form
        onSubmit={handleSubmit}
        initialValues={initialValues}
        validate={(values) => {
          const errors = {}

          if (values.askRecipient === false && !values.hours)
            errors.hours = 'Выберете время доставки'

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
                  <DaysButtons
                    days={days}
                    onClick={handleDayClick}
                    calendarBtnOnClick={() => setCalendarIsOpen(true)}
                  />

                  <ModalCalendar
                    selectedDate={deliveryDate}
                    minEnabledDate={todayDate}
                    maxEnabledDate={addDays(todayDate, 14)}
                    isOpen={calendarIsOpen} //
                    onDateChange={handleDateChange}
                    onCalendarClose={() => setCalendarIsOpen(false)}
                  />

                  <div className={styles.timesButtons}>
                    {selectDayTimes.map((time, idx) => (
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
                  </div>

                  <Field name="hours">
                    {({ meta }) =>
                      <Input
                        type="meta"
                        meta={meta}
                      />}
                  </Field>


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

const mapStateToProps = state => ({
  deliveryDate: deliveryDateSelector(state),
  todayDate: deliveryTodaySelector(state)
})

const mapDispatchToProps = {
  setDeliveryDate
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(DeliveryTimeForm)