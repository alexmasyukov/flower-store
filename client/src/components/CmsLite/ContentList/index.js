import React, { Component } from 'react'
import cn from 'classnames'
import { Link } from "react-router-dom"
import { Row } from "components/Bootstrap"
import styles from 'components/CmsLite/cmslite.module.sass'

class ContentList extends Component {
    render() {
        const { content } = this.props

        const contentRender = content.map(({ id, public: pub, title }) => (
          <div key={id} className={cn(!pub && styles.unpublic, 'col-md-12')}>
              <Link to={`/cmslite/content/${id}`}>
                  {title}</Link>
              <span className={styles.listLabel}><b>ID:</b> {id}</span>
              <hr/>
          </div>
        ))

        return (
          <>
              <Link to="/cmslite/content-add">Добавить</Link>
              <br/><br/>
              <Row>
                  {contentRender}
              </Row>
          </>
        )
    }
}

export default ContentList