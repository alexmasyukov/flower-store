import React from "react"
import loadable from "@loadable/component"
import { compose } from "utils"
import withRouterParams from "components/hoc/withRouterParams"
import withApiService from "components/hoc/withApiService"
import withData from "components/hoc/withData"


const fallback = () => (
  <div>Загрузка модуля...</div>
)
const Content = loadable(() => import('components/Content'), {
    fallback: fallback()
})

const mapMethodsToProps = (apiService, { contentId = 0 }) => {
    return {
        getImage: apiService.getImage,
        getContent: apiService.getContent(contentId)
    }
}

const ContentContainer = compose(
  withRouterParams,
  withApiService(mapMethodsToProps),
  withData({
      getDataMethod: 'getContent',
      dataPropName: 'data',
      loadingText: 'content'
  })
)(Content)

export default ContentContainer