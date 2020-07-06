import React, { Component } from 'react'
import cn from 'classnames'
import CmsMenu from "components/Menu"
import styles from './cmsLayout.module.sass'

class CmsLayout extends Component {
    render() {
        return (
          <div className={cn('container', styles.layout)}>
              <CmsMenu/>
              {this.props.children}
          </div>
        )
    }
}

export default CmsLayout