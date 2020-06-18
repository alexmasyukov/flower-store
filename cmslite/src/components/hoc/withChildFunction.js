import React, { Component } from "react"
import { getDisplayName } from "helpers"

const withChildFunction = fn => WrappedComponent => {
  class withChildFunction extends Component {
    render() {
      return (
        <WrappedComponent {...this.props}>
          {fn}
        </WrappedComponent>
      )
    }
  }

  withChildFunction.displayName = `withChildFunction(${getDisplayName(WrappedComponent)})`
  return withChildFunction
}

export default withChildFunction