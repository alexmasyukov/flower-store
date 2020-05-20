import React, { Component } from 'react'
import cn from 'classnames'
import CmsMenu from "components/CmsLite/Menu"
import styles from './cmsLayout.module.sass'

class CmsLayout extends Component {
    render() {
        return (
          <div className={cn('container', styles.layout)}>
              <CmsMenu className={styles.menu}/>
              {this.props.children}
          </div>
        )
    }
}

export default CmsLayout