import React from "react"
import styles from "components/cmslite.module.sass"

const ListItemsControlButtons = ({ index, length, maxItems = 3, arrayHelpers, deleteTitle = 'Удалить' }) => (
  <>
      <span className={styles.mtitle}>Переместить </span>
      <button
        type="button"
        disabled={index === 0}
        onClick={() => arrayHelpers.swap(index, index - 1)}>
          Вверх
      </button>
      <button
        type="button"
        disabled={index === maxItems || index === length}
        onClick={() => arrayHelpers.swap(index, index + 1)}>
          Вниз
      </button>
      |
      <button
        type="button"
        className="ml-1"
        onClick={() => {
            const r = window.confirm(`${deleteTitle}?`)
            if (r === true) arrayHelpers.remove(index)
        }}>
          {deleteTitle}
      </button>
      <br/>
  </>
)

export default ListItemsControlButtons