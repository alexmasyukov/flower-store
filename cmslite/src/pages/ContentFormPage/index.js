import React from 'react'
import loadable from "@loadable/component"
import CmsLayout from "layouts/Cms"
import { compose } from "utils"
import withRouterParams from "components/hoc/withRouterParams"
import withApiService from "components/hoc/withApiService"
import withData from "components/hoc/withData"
import contentModel from "models/content"
import FormName from "components/FormName"

const fallback = () => (
  <div>Загрузка модуля...</div>
)

const ContentForm = loadable(() => import('components/ContentForm'), {
    fallback: fallback()
})

const mapMethodsToProps = (apiService, props) => ({
    getContent: apiService.getContent(props.id),
    save: apiService.updateContent
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
    save: apiService.saveContent
})

const ContentFormContainer_NewItem = compose(
  withRouterParams,
  withApiService(mapMethodsToProps_NewItem)
)(ContentForm)

const CmsContentFormPage = ({ isNew }) => (
  <CmsLayout>
      <FormName isNew={isNew}/>
      {isNew ? (
        <ContentFormContainer_NewItem content={contentModel}/>
      ) : (
        <ContentFormContainer/>
      )}
  </CmsLayout>
)

export default CmsContentFormPage