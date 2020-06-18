import React, { useState } from 'react'
import styles from 'components/cmslite.module.sass'

const CustomersList = ({ items = [] }) => {
  const [search, setSearch] = useState('')
  return (
    <div className={'mt-3'}>
      <span className={styles.btitle}>Поиск по телефону, имени:</span>
      <input type="text" onChange={(e) => setSearch(e.target.value)}/>

      <table cellPadding="0" border="0" className={styles.table}>
        <thead>
        <tr>
          <th scope="col">Телефон</th>
          <th scope="col">Имя</th>
          <th scope="col">Баллы</th>
          <th scope="col">ID</th>
        </tr>
        </thead>
        <tbody>
        {items
          .filter(({ phone, name }) => phone.includes(search) || name.includes(search))
          .map(({ id, name, phone, points }) => (
            <tr key={id}>
              <td>{phone}</td>
              <td>{name}</td>
              <td>{points}</td>
              <td>{id}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  )
}

export default CustomersList