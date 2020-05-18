import React from 'react'
import styles from 'components/Content/content.module.sass'

const Content = ({ data: { content = '', title = '' }, h1 = '' }) => {
    return (
      <>
          {h1 && <h1 className={styles.h1}>{h1}</h1>}
          <div className={styles.content} dangerouslySetInnerHTML={{ __html: content }}/>
      </>
    )
}

export default Content