import React, { Component } from 'react'
import cn from 'classnames'
import { Link } from "react-router-dom"
import { Row } from "components/Bootstrap"
import styles from 'components/CmsLite/cmslite.module.sass'

class BannersList extends Component {
    state = {
        banners: []
    }

    componentDidMount() {
        this.setState({
            banners: this.props.banners
        })
    }

    render() {
        const { banners } = this.state
        const { getImage } = this.props

        const bannersRender = banners.map(({ id, public: pub, title, images }) => (
          <div key={id} className="col-md-12">
              <Row className={cn(!pub && styles.unpublic)}>
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
          </div>
        ))

        return (
          <div className="row">
              <Link to="/cmslite/banners-add">Добавить баннер</Link>
              <br/><br/>
              {bannersRender}
          </div>
        )
    }
}

export default BannersList