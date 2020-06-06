import React from 'react'
import withApiService from "components/hoc/withApiService"
import withData from "components/hoc/withData"
import { compose } from "utils"

const Items = ({ children, data = [] }) => (
  <>
      {children(data)}
  </>
)

const mapMethodsToProps = (apiService, { count = 1 }) => {
    return {
        getLastReviews: apiService.getLastReviews(count)
    }
}

const LastReviews = compose(
  withApiService(mapMethodsToProps),
  withData({
      getDataMethod: 'getLastReviews',
      dataPropName: 'data',
      loadingText: 'reviews'
  })
)(Items)

export default LastReviews