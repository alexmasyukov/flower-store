import React from 'react'
import loadable from "@loadable/component"
import CmsLayout from "layouts/Cms"
import { compose } from "utils"
import withRouterParams from "components/hoc/withRouterParams"
import withApiService from "components/hoc/withApiService"
import withData from "components/hoc/withData"
import { additiveModel } from "models/additive"
import FormName from "components/FormName"

const fallback = () => (
  <div>Загрузка модуля...</div>
)

const AdditiveForm = loadable(() => import('components/AdditiveForm'), {
    fallback: fallback()
})

const mapMethodsToProps = (apiService, props) => {
    return {
        getAdditive: apiService.getAdditive(props.id),
        uploadImages: apiService.uploadImages,
        getImage: apiService.getImage,
        save: apiService.updateAdditive
    }
}

const AdditiveFormContainer = compose(
  withRouterParams,
  withApiService(mapMethodsToProps),
  withData({
      getDataMethod: 'getAdditive',
      dataPropName: 'additive',
      loadingText: 'additive'
  })
)(AdditiveForm)


const mapMethodsToProps_NewItem = (apiService) => {
    return {
        save: apiService.saveAdditive,
        uploadImages: apiService.uploadImages,
        getImage: apiService.getImage
    }
}

const AdditiveFormContainer_NewItem = compose(
  withRouterParams,
  withApiService(mapMethodsToProps_NewItem)
)(AdditiveForm)


const CmsAdditiveFormPage = ({ isNew }) => (
  <CmsLayout>
      <FormName isNew={isNew}/>
      {isNew ? (
        <AdditiveFormContainer_NewItem additive={additiveModel}/>
      ) : (
        <AdditiveFormContainer/>
      )}
  </CmsLayout>
)

export default CmsAdditiveFormPage