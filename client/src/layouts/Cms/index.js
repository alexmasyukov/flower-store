import React, { Component } from 'react'
import { Link } from "react-router-dom"
import styles from './pageLayout.module.sass'

class CmsLayout extends Component {
    render() {
        return (
          <div className="container">
              <div className={styles.menu}>
                  <Link to="/cmslite/products">Товары</Link>
                  <Link to="/cmslite/entities">Справочник</Link>
                  <Link to="/cmslite/banners">Баннеры</Link>
                  <Link to="/cmslite/team">Команда</Link>
                  <Link to="/cmslite/content">Контент</Link>
                  <Link to="/cmslite/orders">Заказы</Link>
              </div>
              <br/>
              {this.props.children}
          </div>
        )
    }
}

export default CmsLayout