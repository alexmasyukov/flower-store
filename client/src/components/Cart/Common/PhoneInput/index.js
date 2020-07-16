import React from 'react'
import NumberFormat from "react-number-format"
import { PHONE_FORMAT } from "constants/common"

const PhoneInput = ({
    placeholder,
    onChange,
    onBlur,
    onFocus,
    name,
    value,
    disabled,
    mask = '_',
    format = PHONE_FORMAT.FORMAT_FOR_INPUT
  }) => {
    return (
      <NumberFormat
        disabled={disabled}
        type="tel"
        id={name}
        mask={mask}
        format={format}
        placeholder={placeholder}
        onBlur={onBlur}
        onFocus={onFocus}
        value={value}
        onChange={value => onChange(value)}
        onValueChange={({ formattedValue }) =>
          onChange(formattedValue)
        }
      />
    )
  }

  export default PhoneInput
  