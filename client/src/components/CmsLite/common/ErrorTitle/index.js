import React from 'react'
import styles from "components/CmsLite/cmslite.module.sass"

const ErrorTitle = ({ children }) => (
  <div className={styles.err}>
      {children}
  </div>
)

export default ErrorTitle