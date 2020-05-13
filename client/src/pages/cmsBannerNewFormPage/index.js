import React from 'react'
import loadable from "@loadable/component"
import CmsLayout from "layouts/Cms"
import { compose } from "utils"
import withRouterParams from "components/hoc/withRouterParams"
import withApiService from "components/hoc/withApiService"
import bannerModel from "models/banner"

const fallback = () => (
  <div>Загрузка модуля...</div>
)

const BannerForm = loadable(() => import('components/CmsLite/BannerForm'), {
    fallback: fallback()
})

const mapMethodsToProps = (apiService) => {
    return {
        saveBanner: apiService.saveBanner,
        uploadImages: apiService.uploadImages,
        getImage: apiService.getImage
    }
}


const BannerFormContainer = compose(
  withRouterParams,
  withApiService(mapMethodsToProps)
)(BannerForm)

const cmsBannerNewFormPage = () => (
  <CmsLayout>
      <BannerFormContainer banner={bannerModel}/>
  </CmsLayout>
)

export default cmsBannerNewFormPage