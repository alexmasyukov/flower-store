import React  from 'react'
import cn from 'classnames'
import { Link } from "react-router-dom"
import styles from 'components/cmslite.module.sass'

const ContentList = ({ content }) => (
  <table cellPadding="0" border="0" className={styles.table}>
    <tbody>
    {content.map(({ id, public: pub, title }) => (
      <tr key={id}>
        <td><b>ID:</b> {id}</td>
        <td className={cn(!pub && styles.unpublic)}>
          <Link to={`/content/${id}`}>{title}</Link>
        </td>
      </tr>
    ))}
    </tbody>
  </table>
)

export default ContentList