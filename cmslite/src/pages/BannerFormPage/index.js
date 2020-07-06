import React from 'react'
import loadable from "@loadable/component"
import CmsLayout from "layouts/Cms"
import { compose } from "utils"
import withRouterParams from "components/hoc/withRouterParams"
import withApiService from "components/hoc/withApiService"
import withData from "components/hoc/withData"
import bannerModel from "models/banner"
import FormName from "components/FormName"

const fallback = () => (
  <div>Загрузка модуля...</div>
)

const BannerForm = loadable(() => import('components/BannerForm'), {
  fallback: fallback()
})

const mapMethodsToProps = (apiService, props) => {
  return {
    getBanner: apiService.getBanner(props.id),
    uploadImages: apiService.uploadImages,
    getImage: apiService.getImage,
    save: apiService.updateBanner
  }
}

const BannerFormContainer = compose(
  withRouterParams,
  withApiService(mapMethodsToProps),
  withData({
    getDataMethod: 'getBanner',
    dataPropName: 'banner',
    loadingText: 'banner'
  })
)(BannerForm)


const mapMethodsToProps_NewItem = (apiService) => {
  return {
    save: apiService.saveBanner,
    uploadImages: apiService.uploadImages,
    getImage: apiService.getImage
  }
}

const BannerFormContainer_NewItem = compose(
  withRouterParams,
  withApiService(mapMethodsToProps_NewItem)
)(BannerForm)


const CmsBannerFormPage = ({ isNew }) => (
  <CmsLayout>
    <FormName isNew={isNew}/>
    {isNew ? (
      <BannerFormContainer_NewItem banner={bannerModel}/>
    ) : (
      <BannerFormContainer/>
    )}
  </CmsLayout>
)

export default CmsBannerFormPage