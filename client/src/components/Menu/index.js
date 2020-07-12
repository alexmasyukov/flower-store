import React from 'react'
import { ROUTES } from "constants/routes"
import { Link } from "react-router-dom"
import styles from "./menu.module.sass"
import withCity from "components/hoc/withCity"

const Menu = ({ city }) => {
  return (
    <div className={styles.menu}>
      {
        ROUTES
          .filter(route => 'menuPosition' in route)
          .sort((a, b) => a.menuPosition - b.menuPosition)
          .map(({ menuPosition, path, name }) => (
            <Link key={menuPosition} to={`/${city.eng}${path}`}>{name}</Link>
          ))
      }
    </div>
  )
}

export default withCity(Menu)