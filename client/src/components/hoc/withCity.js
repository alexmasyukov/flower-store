import React from 'react'
import { getDisplayName } from "utils"
import { CityContext} from 'App'

const withCity = WrappedComponent => {
  const Hoc = (props) => (
    <CityContext.Consumer>
      {city => {
        return <WrappedComponent {...props} city={city}/>}
      }
    </CityContext.Consumer>
  )

  Hoc.displayName = `withCity(${getDisplayName(WrappedComponent)})`
  return Hoc
}


export default withCity