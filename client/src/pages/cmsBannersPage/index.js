import React from "react"
import loadable from "@loadable/component"
import CmsLayout from "layouts/Cms"
import { compose } from "utils"
import withApiService from "components/hoc/withApiService"
import withData from "components/hoc/withData"

const fallback = () => (
  <div>Загрузка модуля...</div>
)
const BannersList = loadable(() => import('components/CmsLite/BannersList'), {
    fallback: fallback()
})


const mapMethodsToProps = (apiService) => ({
    getAllBanners: apiService.getAllBanners,
    getImage: apiService.getImage
})


const BannersListContainer = compose(
  withApiService(mapMethodsToProps),
  withData({
      getDataMethod: 'getAllBanners',
      dataPropName: 'banners',
      loadingText: 'banners'
  })
)(BannersList)

const cmsBannersPage = () => (
  <CmsLayout>
      <BannersListContainer/>
  </CmsLayout>
)

export default cmsBannersPage