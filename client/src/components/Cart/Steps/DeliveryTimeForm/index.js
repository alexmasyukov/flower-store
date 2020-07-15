import React, { useState, useEffect } from 'react'
import { Form, Field } from 'react-final-form'
import { connect } from 'react-redux'
import cn from 'classnames'
import { addDays, getDay } from 'date-fns'
import Input from "components/Cart/Common/Input"
import NextButton from "components/Cart/Common/NextButton"
import {
  compose, getDayName,
  getMonthName, when
} from "utils"
import { deliveryDateSelector, deliveryTodaySelector } from "store/selectors/ui"
import { setDeliveryDate } from "store/actions/uiActions"
import ModalCalendar from "components/Cart/Steps/DeliveryTimeForm/ModalCalendar"
import { CITIES } from "constants/common"
import withCity from "components/hoc/withCity"
import styles from 'components/Cart/cart.module.sass'


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
  <Field name="time" type="radio" value={value}>
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
          onClick={onClick(idx, day.date)}
          className={cn(day.isActive && styles.dayBtnActive)}
        >
          <span>
            {day.name()}
            <br />{day.month()} {day.day()}
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
  return Array.from({ length: max - min }).fill({})
    .map((_, idx) => {
      let from = min + idx
      let to = min + idx + 1

      if (to === 24) {
        to = 0
      }

      return {
        text: `${from <= 9 ? `0` : ``}${from}:00 -
         ${to <= 9 ? `0` : ``}${to}:00`,
        from,
        to,
        enabled: true,
        price: 0
      }
    })
}


function getDays(fromDate) {
  return Array.from({ length: 3 }).fill(fromDate)
    .map((day, idx) => {
      const date = addDays(day, idx)

      return {
        date,
        day() {
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
  hours.map((item) =>
    item.to <= min && item.to !== 0 ?
      {
        ...item,
        enabled: false
      } : item)

const withDisabledTimes = (min) => (times) => {
  return times.map(({ hours, ...base }) => ({
    ...base,
    hours: getDisabledHours(hours, min)
  }))
}


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
    title: '21:00 - 00:00',
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
      toHour: 24,
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
      toHour: 0,
      price: 800
    }
  ]
}


const withVisibilityNeedTimes = (max) => (times) => {
  return times.map(time => {
    const { from } = time.hours[0]
    const { to } = time.hours[time.hours.length - 1]

    return (from <= max && max <= to) ||
      (to === 0 && from <= max && max <= 24) ? {
        ...time,
        isVisible: true
      } : {
        ...time,
        isVisible: false
      }
  })
}

const withVisibilityOnlyIntitialTime = (intitialTimeText) => (times) => {
  return times.map(time => {
    return time.hours.some(({ text }) => text === intitialTimeText) ? {
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
    const hours = time.hours.map(({ from, to, ...base }) => {

      let foundPrice
      prices.forEach(({ fromHour, toHour, price }) => {
        if (from >= fromHour && to <= toHour) {
          foundPrice = price
        }
      })

      return {
        ...base,
        from,
        to,
        price: foundPrice
      }
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
  let hourWithPreparing = deliveryDate.getHours() + 1


  useEffect(() => {
    setDays(getDays(deliveryDate))
  }, [deliveryDate])

  const handleSubmit = (values) => {
    console.log(values.date);

    setDeliveryDate(values.date)
    onSubmit({
      ...values,
      isValid: true
    })
  }

  const handleDayClick = (dayIdx, dayDate) => {
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

  const handleDateChange = (date) => setDeliveryDate(date)

  const activeDay = days.filter(day => day.isActive === true)[0]
  const isToday = todayDate.getDate() === activeDay.date.getDate()

  console.log(initialValues.time);

  const selectDayTimes = compose(
    when(initialValues.time !== '', withVisibilityOnlyIntitialTime(initialValues.time)),
    withPrices(timesPrices[city.eng]),
    when(isToday === true, withVisibilityNeedTimes(hourWithPreparing)),
    when(isToday === true, withDisabledTimes(hourWithPreparing)),
  )(times)

  // console.log(selectDayTimes);



  return (
    <div className={styles.form}>
      <Form
        onSubmit={handleSubmit}
        initialValues={{
          ...initialValues,
          date: deliveryDate
        }}
        validate={(values) => {
          const errors = {}

          if (values.askRecipient === false && !values.time)
            errors.time = 'Выберете время доставки'

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
                  <Field name="date">
                    {({ input }) =>
                      <DaysButtons
                        days={days}
                        onClick={(idx, date) => () => {
                          input.onChange({
                            target: {
                              value: date
                            }
                          })
                          handleDayClick(idx, date)
                        }}
                        calendarBtnOnClick={() => setCalendarIsOpen(true)}
                      />
                    }
                  </Field>

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
                        {time.hours.map(({ text, enabled, price }) => (
                          <div key={text} className={cn(!enabled && styles.disabled)}>
                            <Radio
                              value={text}
                              disabled={!enabled}
                            />
                            <span>{price} ₽</span>
                          </div>
                        ))}
                      </ExpandBlock>
                    ))}
                  </div>

                  <Field name="time">
                    {({ meta }) =>
                      <Input
                        type="meta"
                        meta={meta}
                      />}
                  </Field>
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