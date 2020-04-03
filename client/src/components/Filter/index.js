import React from 'react'
import { filtersEntities } from 'constants/filtersEntities'
import ButtonsGroupCollapseContainer from "containers/buttonsGroupCollapse"
import styles from "components/Filter/Filter.module.sass"


const Filter = () => (
  <div className={styles.filter}>
    {
      // Более функциональный стиль, чем с Object.keys
      // Потому что, мы не будем из нутри обращаться к filtersEntities[key]
      Object.entries(filtersEntities).map(item => {
          const [filterKey, filter] = item
          return (
            <ButtonsGroupCollapseContainer
              key={filterKey}
              filterType={filter.type}
              filterKey={filterKey}
              title={filter.title}
              isOpened={filter.openedDefault}
            />
          )
        })
    }
  </div>
)

export default Filter