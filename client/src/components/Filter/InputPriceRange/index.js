import React, { useState, useEffect } from 'react'
import InputRange from 'react-input-range'
import 'react-input-range/lib/css/index.css'

const InputPriceRange = ({
                           initial,
                           current,
                           onChangeComplete
                         }) => {
  const [range, setRange] = useState({ ...initial })

  useEffect(() => {
    setRange({ ...current })
  }, [initial, current])

  // console.log('range', range)
  // console.log('initial', initial)
  // console.log('current', current)

  return (
    <InputRange
      step={100}
      minValue={initial.min}
      maxValue={initial.max}
      value={range}
      onChange={range => setRange(range)}
      onChangeComplete={range => onChangeComplete(range)}
    />
  )
}

export default InputPriceRange