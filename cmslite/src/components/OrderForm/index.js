import React from 'react'
import { getAvailableDate } from "utils"

const OrderForm = ({ data: { id, created_at, data, customer }, city, cityId }) => {
  const date = new Date(created_at)
  return (
    <div>
      <b>ID: {id}, City ID: {cityId}</b>
      <p><b>Покупатель:</b> {customer.phone}, {customer.name}</p>
      <p><b>Дата:</b> {date.getHours()}:{date.getMinutes()}, {getAvailableDate(date, true)} </p>
      {JSON.stringify(data, null, 2)}
    </div>
  )
}

export default OrderForm