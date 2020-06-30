import React, { useState } from 'react'
import styles from 'components/cmslite.module.sass'
import { getAvailableDate } from "utils"
import { Link } from "react-router-dom"

const OrdersList = ({ items = [], city }) => {
  const [search, setSearch] = useState('')

  return (
    <div className={'mt-3'}>
      <span className={styles.btitle}>Поиск по ID:</span>
      <input type="text" onChange={(e) => setSearch(e.target.value)}/>

      <table cellPadding="0" border="0" className={styles.table}>
        <thead>
        <tr>
          <th scope="col">ID</th>
          <th scope="col">Дата/время</th>
          <th scope="col">О заказе</th>
        </tr>
        </thead>
        <tbody>
        {items
          .map(({ created_at, ...base }) => ({
            ...base,
            created_at: new Date(created_at)
          }))
          .filter(({ id }) => search ? id == search : true)
          .map(({ id, created_at, data }) => (
            <tr key={id}>
              <td>
                <Link to={`/${city}/orders/${id}`}>
                  {id}
                </Link>
              </td>
              <td>
                <Link to={`/${city}/orders/${id}`}>
                  {getAvailableDate(created_at, true)}
                </Link>
              </td>
              <td/>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  )
}

export default OrdersList