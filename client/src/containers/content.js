import React from "react"
import loadable from "@loadable/component"
import { compose } from "utils"
import withRouterParams from "components/hoc/withRouterParams"
import withApiService from "components/hoc/withApiService"
import withData from "components/hoc/withData"
import withCity from "components/hoc/withCity"
import { fetchContent } from "api"
import { Redirect } from "react-router-dom"


const fallback = () => (
  <div>Загрузка модуля...</div>
)
const Content = loadable(() => import('components/Content'), {
  fallback: fallback()
})

// const fetchContent = (cityId, contentId) => {
//   return () => {
//     return new Promise((resolve, reject) => reject('none')) //resolve('OK'))
//   }
// }

const mapMethodsToProps = (apiService, { city, contentId }) => {
  return {
    getImage: apiService.getImage,
    getContent: apiService.getContent(city.id, contentId)//fetchContent(city.id, contentId)
  }
}

const ContentContainer = compose(
  withCity,
  withApiService(mapMethodsToProps),
  withData({
    getDataMethod: 'getContent',
    dataPropName: 'data',
    loadingText: 'content',
    errorResponse: <Redirect to={'404'} />
  })
)(Content)

export default ContentContainer