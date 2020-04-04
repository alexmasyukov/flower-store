import React, { useState } from 'react'
import DatePicker from 'react-datepicker'

import "react-datepicker/dist/react-datepicker.css"

const DatePickerWrap = ({ startDate, minDate, onChange, inline = false }) => {
   return (
      <div>
         <DatePicker
            selected={startDate}
            onChange={date => onChange(date)}
            minDate={minDate}
            inline={inline}
         />
      </div>
   )
}

export default DatePickerWrap