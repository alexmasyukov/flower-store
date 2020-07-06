import React from 'react'
import { getCityIdByEngName, getDisplayName } from "utils"
import { useParams, useHistory } from "react-router-dom"
import { CITIES } from "constants/common"


const withRouterParams = WrappedComponent => {
  const Hoc = (props) => {
    // todo fix it id не используется в большинстве случаев,
    //  и в итоге затирает переданные
    // todo history уже создана в роутере, может ее использовать?
    let { id, city } = useParams()
    let history = useHistory()
    const foundCity = getCityIdByEngName(city, CITIES)
    const cityId = city && foundCity ? foundCity.ID : 1

    return <WrappedComponent {...props} id={id} city={city} cityId={cityId} history={history}/>
  }

  Hoc.displayName = `withRouterParams(${getDisplayName(WrappedComponent)})`
  return Hoc
}


export default withRouterParams