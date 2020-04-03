import React from 'react'
import styles from './ResetAllButton.module.sass'


const ResetAllButton = ({ isShow, resetAllFilters }) => (
  <>
    {isShow && (
      <div
        onClick={() => resetAllFilters()}
        className={styles.resetAllBtn}
      >
        Сбросить все фильтры
      </div>
    )}
  </>
)

export default ResetAllButton