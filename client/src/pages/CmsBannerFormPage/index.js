import React from 'react'
import loadable from "@loadable/component"
import CmsLayout from "layouts/Cms"
import { compose } from "utils"
import withRouterParams from "components/hoc/withRouterParams"
import withApiService from "components/hoc/withApiService"
import withData from "components/hoc/withData"
import bannerModel from "models/banner"

const fallback = () => (
  <div>Загрузка модуля...</div>
)

const BannerForm = loadable(() => import('components/CmsLite/BannerForm'), {
    fallback: fallback()
})

const mapMethodsToProps = (apiService, props) => {
    return {
        getBanner: apiService.getBanner(props.id),
        saveBanner: apiService.saveBanner,
        uploadImages: apiService.uploadImages,
        getImage: apiService.getImage
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
        saveBanner: apiService.saveBanner,
        uploadImages: apiService.uploadImages,
        getImage: apiService.getImage
    }
}

const BannerFormContainer_NewItem = compose(
  withApiService(mapMethodsToProps_NewItem)
)(BannerForm)


const CmsBannerFormPage = ({isNew}) => (
  <CmsLayout>
      {isNew ? (
        <BannerFormContainer_NewItem banner={bannerModel}/>
      ): (
        <BannerFormContainer/>
      )}
  </CmsLayout>
)

export default CmsBannerFormPage