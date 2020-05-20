import React, { Component } from 'react'
import cn from 'classnames'
import { Link } from "react-router-dom"
import { Row } from "components/Bootstrap"
import styles from 'components/CmsLite/cmslite.module.sass'

class BannersList extends Component {
    render() {
        const { banners, getImage } = this.props

        return banners.map(({ id, public: pub, title, images }) => (
          <Row key={id} className={cn(!pub && styles.unpublic)}>
              <div className="col-md-2">
                  <img style={{ width: '100%' }}
                       src={getImage(images[0])}
                       alt=""/>
              </div>
              <div className="col-md-10 pl-1">
                  <Link to={`/cmslite/banners/${id}`}>
                      {title}</Link>
                  <span className={styles.listLabel}><b>ID:</b> {id}</span>
              </div>
              <hr/>
          </Row>
        ))
    }
}

export default BannersList