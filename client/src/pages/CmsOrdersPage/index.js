import React from "react"
import loadable from "@loadable/component"
import CmsLayout from "layouts/Cms"
import { compose } from "utils"
import withApiService from "components/hoc/withApiService"
import withData from "components/hoc/withData"

const fallback = () => (
  <div>Загрузка модуля...</div>
)
const OrdersList = loadable(() => import('components/CmsLite/OrdersList'), {
    fallback: fallback()
})


const mapMethodsToProps = (apiService) => ({
    getAllBanners: apiService.getAllBanners,
    getImage: apiService.getImage
})


const OrdersListContainer = compose(
  withApiService(mapMethodsToProps),
  // withData({
  //     getDataMethod: 'getAllBanners',
  //     dataPropName: 'banners',
  //     loadingText: 'banners'
  // })
)(OrdersList)

const CmsOrdersPage = () => (
  <CmsLayout>
      <OrdersListContainer/>
  </CmsLayout>
)

export default CmsOrdersPage