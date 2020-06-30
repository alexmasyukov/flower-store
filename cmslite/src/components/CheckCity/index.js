import React from 'react'
import withRouterParams from "components/hoc/withRouterParams"
import { CITIES } from 'constants/common'
import { Redirect } from 'react-router-dom'

const CheckCity = ({ city }) => {
    return (CITIES.CHITA.ENG !== city && CITIES.MOSCOW.ENG !== city) ?
        (
            <Redirect to="/" />
        ) : (
            <div>dfsf</div>
        )
}

export default withRouterParams(CheckCity)

