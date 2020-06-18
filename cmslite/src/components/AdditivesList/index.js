import React, { Component } from 'react'
import cn from 'classnames'
import { Link } from "react-router-dom"
// import { Row } from "components/Bootstrap"
import styles from 'components/cmslite.module.sass'

const AdditivesList = ({ additives, delete: deleteAdditive }) => {
  return (
    <table className={styles.table}>
      <thead>
      <tr>
        <td>Значение</td>
        <td>ID</td>
      </tr>
      </thead>
      <tbody>
      {additives.map(({ id, public: pub, created_at, title }) => (
        <tr key={id} className={cn(!pub && styles.unpublic)}>
          <td>
            <Link to={`/additives/${id}`}>{title}</Link>
          </td>
          <td><b>ID:</b> {id}</td>
        </tr>
      ))}
      </tbody>
    </table>
  )
}

export default AdditivesList