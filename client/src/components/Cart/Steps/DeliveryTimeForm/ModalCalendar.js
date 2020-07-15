import React, { useState, useEffect } from 'react'
import ReactModal from 'react-modal'
import ru from 'date-fns/locale/ru'
import DatePicker from 'react-datepicker'
import "react-datepicker/dist/react-datepicker.css"
import NextButton from "components/Cart/Common/NextButton"

const customStyle = {
  content : {
    top                   : '50%',
    left                  : '50%',
    right                 : 'auto',
    bottom                : 'auto',
    marginRight           : '-50%',
    transform             : 'translate(-50%, -50%)',
    border: 0
  },
  overlay: {
    backgroundColor: 'rgba(32, 40, 46, 0.5)'
  }
}

const ModalCalendar = ({
                         selectedDate = new Date(),
                         minEnabledDate = new Date(),
                         maxEnabledDate = new Date(),
                         isOpen = false,
                         inline = false,
                         onDateChange = () => {},
                         onCalendarClose = () => {},
                       }) => {
  const [open, setOpen] = useState(isOpen)
  const [date, setDate] = useState(selectedDate)

  useEffect(() => {
    setOpen(isOpen)
  }, [isOpen])

  ReactModal.setAppElement('body')

  return (
    <ReactModal
      isOpen={open}
      contentLabel="onRequestClose Example"
      onRequestClose={onCalendarClose}
      style={customStyle}
    >
      {/*<button onClick={onCalendarClose}>Close Modal</button>*/}
      <DatePicker
        locale={ru}
        selected={date}
        onChange={(date) => setDate(date)}
        minDate={minEnabledDate}
        maxDate={maxEnabledDate}
        inline
      />
      <NextButton
        title="Продолжить"
        onClick={() => {
          onDateChange(date)
          onCalendarClose()
        }}
      />

    </ReactModal>
  )
}

export default ModalCalendar