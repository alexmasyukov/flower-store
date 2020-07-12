import React from 'react'
import withApiService from "components/hoc/withApiService"
import withData from "components/hoc/withData"
import { compose } from "utils"
import withCity from "components/hoc/withCity"

const Items = ({ children, data = [] }) => (
  <>
    {children(data)}
  </>
)

const mapMethodsToProps = (apiService, { city, count = 1 }) => {
  return {
    getLastReviews: apiService.getLastReviews(city.id, count)
  }
}

const LastReviews = compose(
  withCity,
  withApiService(mapMethodsToProps),
  withData({
    getDataMethod: 'getLastReviews',
    dataPropName: 'data',
    loadingText: 'reviews',
    errorResponse: <h3>Нет отзывов  </h3>
  })
)(Items)

export default LastReviews