import React from 'react'
import loadable from "@loadable/component"
import CmsLayout from "layouts/Cms"
import { compose } from "utils"
import withRouterParams from "components/hoc/withRouterParams"
import withApiService from "components/hoc/withApiService"
import withData from "components/hoc/withData"
import contentModel from "models/content"

const fallback = () => (
  <div>Загрузка модуля...</div>
)

const ContentForm = loadable(() => import('components/CmsLite/ContentForm'), {
    fallback: fallback()
})

const mapMethodsToProps = (apiService, props) => ({
    getContent: apiService.getContent(props.id),
    saveContent: apiService.saveContent
})

const ContentFormContainer = compose(
  withRouterParams,
  withApiService(mapMethodsToProps),
  withData({
      getDataMethod: 'getContent',
      dataPropName: 'content',
      loadingText: 'content'
  })
)(ContentForm)


const mapMethodsToProps_NewItem = (apiService) => ({
    saveContent: apiService.saveContent
})

const ContentFormContainer_NewItem = compose(
  withApiService(mapMethodsToProps_NewItem)
)(ContentForm)

const CmsContentFormPage = ({ isNew }) => (
  <CmsLayout>
      {isNew ? (
        <ContentFormContainer_NewItem entitie={contentModel}/>
      ) : (
        <ContentFormContainer/>
      )}
  </CmsLayout>
)

export default CmsContentFormPage