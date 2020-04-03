import React, { Component } from 'react'
import addDays from 'date-fns/addDays'
import DatePicker from "react-datepicker"
import cn from 'classnames'
import Backdrop from "components/Modals/Backdrop"
import NextButton from "components/Cart/Common/NextButton"

import styles from 'components/Modals/common.module.sass'
import "react-datepicker/dist/react-datepicker.css"
import { formatDateDMY } from "utils"

const CALENDAR = 'CALENDAR'

class ModalSelectDeliveryDate extends Component {
   state = {
      currentCity: 0,
      currentDate: this.props.deliveryDate,
      calendarIsVisible: false,
      calendarDate: new Date()
   }

   // todo: дата будет приходить с сервера, это переписать!
   dateItems = [{
      title: 'Сегодня',
      date: formatDateDMY(new Date())
   }, {
      title: 'Завтра',
      date: formatDateDMY(addDays(new Date(), 1))
   }, {
      title: 'Послезавтра',
      date: formatDateDMY(addDays(new Date(), 2))
   }, {
      title: 'Календарь',
      date: CALENDAR
   }]

   componentDidMount() {
      // todo: доработать постановку дату по умолчанию,
      //  если она не стандартная
      // const {deliveryDate} = this.props
      // this.dateItems.forEach(item => {
      //
      // })
      //
      // this.setState({
      //    currentDate: CALENDAR,
      //    calendarIsVisible: true
      // })
   }

   handleChangeDate = (date) => {
      console.log('handleChangeDate', date)

      this.setState({
         calendarIsVisible: (date === CALENDAR),
         currentDate: date
      })
   }

   handleChangeCalendar = (calendarDate) => {
      this.setState({ calendarDate })
   }

   handleChangeCity = (e) => {
      this.setState({
         currentCity: e.target.value
      })
   }

   handleNextButton = () => {
      const { calendarIsVisible, currentDate, calendarDate } = this.state

      this.props.setDeliveryDateAndFetchProductsexport(
         calendarIsVisible ? formatDateDMY(calendarDate) : currentDate
      )
   }

   render() {
      const {
         currentCity, currentDate,
         calendarDate, calendarIsVisible
      } = this.state
      const { cities, isVisible } = this.props
      const { dateItems } = this

      if (!isVisible) return <div/>

      return (
         <>
            <div className={cn(styles.modal, isVisible && styles.isVisible)}>
               <div className={styles.modalDialog}>
                  <div className={styles.content}>

                     <h3>Выберите город и дату доставки</h3>

                        {cities.map(({ id, name }) => (
                           <button onClick={() => alert(name)}>{name}</button>
                        ))}


                     <select value={currentDate} onChange={(e) => this.handleChangeDate(e.target.value)}>
                        {dateItems.map(({ title, date }, i) => (
                           <option key={i} value={date}>{title}</option>
                        ))}
                     </select>

                     {calendarIsVisible && (
                        <DatePicker
                           // selected={calendarDate}
                           onChange={this.handleChangeCalendar}
                           minDate={new Date()}
                           maxDate={addDays(new Date(), 14)}
                           inline
                        />
                     )}

                     <NextButton onClick={this.handleNextButton}/>

                  </div>
               </div>
            </div>
            <Backdrop isVisible={isVisible}/>
         </>
      )
   }
}

ModalSelectDeliveryDate.defaultProps = {
   cities: [{
      id: 0,
      name: 'Чита'
   }, {
      id: 1,
      name: 'Москва'
   }],
   city: 0,
   date: new Date()
}

export default ModalSelectDeliveryDate