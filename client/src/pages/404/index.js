import React from 'react'
import { Link } from "react-router-dom"
import withCity from "components/hoc/withCity"
import { CITIES } from "constants/common"

const Page404 = ({ city = CITIES.CHITA }) => (
  <div>
    404
    <Link to={`/${city.eng}`}> На главную</Link>
  </div>
)

export default withCity(Page404)