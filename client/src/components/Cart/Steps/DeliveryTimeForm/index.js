import React, { useState, useEffect } from 'react'
import { Form, Field } from 'react-final-form'
import { connect } from 'react-redux'
import cn from 'classnames'
import { addDays, getDay, getDaysInMonth } from 'date-fns'
import Input from "components/Cart/Common/Input"
import NextButton from "components/Cart/Common/NextButton"
import { compose, getDayName, getMonthName, when } from "utils"
import { deliveryDateSelector, deliveryTodaySelector } from "store/selectors/ui"
import { setDeliveryDate } from "store/actions/uiActions"
import ModalCalendar from "components/Cart/Steps/DeliveryTimeForm/ModalCalendar"
import { CITIES } from "constants/common"
import withCity from "components/hoc/withCity"
import styles from 'components/Cart/cart.module.sass'
// import ExpandBlock from "components/ProductDetails/ExpandBlock"


const ExpandBlock = ({ title = '', initVisible = false, children }) => {
  const [visible, setVisible] = useState(initVisible)
  useEffect(() => {
    setVisible(initVisible)
  }, [initVisible])

  return (
    <>
      <h4
        className={cn(visible && styles.active)}
        onClick={() => setVisible(!visible)}
      >
        {title}
      </h4>
      {visible && <div className={styles.timesBtns}>{children}</div>}
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
            <br />{day.month()} {day.dayM()}
          </span>
        </li>
      ))}
      <li onClick={calendarBtnOnClick}>
        <div className={styles.cIcon} />
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
        to <= 9 ? `0${to}` : to,
        false, // disabled
        0 // price
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
  hours.map(([from, to, disabled, price]) =>
    +to <= min && to !== '00' ?
      [from, to, true, price] : [from, to, disabled, price])

const withDisabledTimes = (min) => (times) => {
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
    title: '00:00 - 9:00',
    hours: generateHours(0, 9),
    isVisible: true
  },
  {
    title: '09:00 - 15:00',
    hours: generateHours(9, 15),
    isVisible: false
  },
  {
    title: '15:00 - 21:00',
    hours: generateHours(15, 21),
    isVisible: false
  },
  {
    title: '21:00 - 24:00',
    hours: generateHours(21, 24),
    isVisible: false
  }
]

const timesPrices = {
  [CITIES.CHITA.eng]: [
    {
      fromHour: 0,
      toHour: 9,
      price: 400
    },
    {
      fromHour: 9,
      toHour: 21,
      price: 200
    },
    {
      fromHour: 21,
      toHour: 23,
      price: 400
    }
  ],
  [CITIES.MOSCOW.eng]: [
    {
      fromHour: 0,
      toHour: 9,
      price: 800
    },
    {
      fromHour: 9,
      toHour: 21,
      price: 600
    },
    {
      fromHour: 21,
      toHour: 23,
      price: 800
    }
  ]
}


const withVisibilityNeedTimes = (max) => (times) => {
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

const withPrices = (prices) => (times) => {
  return times.map(time => {
    const hours = time.hours.map(([from, to, disabled]) => {

      let foundPrice
      prices.forEach(({ fromHour, toHour, price }) => {
        if (+from >= fromHour && +to <= toHour) {
          foundPrice = price
        }
      })

      return [from, to, disabled, foundPrice]
    })

    return {
      ...time,
      hours
    }
  })
}

const DeliveryTimeForm = ({
  isCourier,
  initialValues,
  emptyValues,
  onSubmit,
  city,
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
    withPrices(timesPrices[city.eng]),
    when(isToday === true, withVisibilityNeedTimes(hourWithPreparing)),
    when(isToday === true, withDisabledTimes(hourWithPreparing))
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

              {city.eng === CITIES.CHITA.eng &&
                <p style={{ marginBottom: 20, marginTop: 15 }}>
                  Доставка, за пределами Центрального района,
                  рассчитывается индивидуально
              </p>
              }


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

                  <div className={styles.times}>
                    {selectDayTimes.map((time, idx) => (
                      <ExpandBlock
                        key={idx}
                        title={time.title}
                        initVisible={time.isVisible}
                      >
                        {time.hours.map(([from, to, disabled, price]) => (
                          <div key={from} className={cn(disabled && styles.disabled)}>
                            <Radio
                              value={`${from}:00 - ${to}:00`}
                              disabled={disabled}
                            />
                            <span>{price} ₽</span>
                          </div>
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

export default compose(
  withCity,
  connect(
    mapStateToProps,
    mapDispatchToProps
  )
)(DeliveryTimeForm)