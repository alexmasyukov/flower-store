import React, { Component } from 'react'
import { ApiServiceConsumer } from 'components/api-service-context'
import { getDisplayName } from "utils"


const withApiService = mapMethodsToProps => WrappedComponent => {
  class withApiService extends Component {
    render() {
      return (
        <ApiServiceConsumer>
          {
            (apiService) => {
              const serviceProps = mapMethodsToProps(apiService)
              return <WrappedComponent {...this.props} {...serviceProps}/>
            }
          }
        </ApiServiceConsumer>
      )
    }
  }

  withApiService.displayName = `withAspiService(${getDisplayName(WrappedComponent)})`
  return withApiService
}


export default withApiService

