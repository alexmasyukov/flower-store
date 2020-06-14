import React, { Component } from 'react'
import cn from 'classnames'
import { Link } from "react-router-dom"
import { Row } from "components/Bootstrap"
import styles from 'components/CmsLite/cmslite.module.sass'

class ContentList extends Component {
    render() {
        const { content } = this.props

        return (
          <table cellPadding="0" border="0" className={styles.table}>
              {content.map(({ id, public: pub, title }) => (
                <tr key={id}>
                    <td><b>ID:</b> {id}</td>
                    <td className={cn(!pub && styles.unpublic)}>
                        <Link to={`/cmslite/content/${id}`}>{title}</Link>
                    </td>
                </tr>
              ))}
          </table>
        )
    }
}

export default ContentList