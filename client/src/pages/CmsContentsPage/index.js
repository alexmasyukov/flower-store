import React from "react"
import loadable from "@loadable/component"
import CmsLayout from "layouts/Cms"
import { compose } from "utils"
import withApiService from "components/hoc/withApiService"
import withData from "components/hoc/withData"

const fallback = () => (
  <div>Загрузка модуля...</div>
)
const ContentList = loadable(() => import('components/CmsLite/ContentList'), {
    fallback: fallback()
})


const mapMethodsToProps = (apiService) => ({
    getAllContent: apiService.getAllContent
})

const ContentListContainer = compose(
  withApiService(mapMethodsToProps),
  withData({
      getDataMethod: 'getAllContent',
      dataPropName: 'content',
      loadingText: 'content'
  })
)(ContentList)

const CmsContentPage = () => (
  <CmsLayout>
      <ContentListContainer/>
  </CmsLayout>
)

export default CmsContentPage