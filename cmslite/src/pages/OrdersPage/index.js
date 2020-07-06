import React from "react"
import loadable from "@loadable/component"
import CmsLayout from "layouts/Cms"
import { compose } from "utils"
import withApiService from "components/hoc/withApiService"
import withData from "components/hoc/withData"
import withRouterParams from "components/hoc/withRouterParams"
import { Link } from "react-router-dom"
import styles from "layouts/Cms/cmsLayout.module.sass"

const fallback = () => (
  <div>Загрузка модуля...</div>
)
const List = loadable(() => import('components/OrdersList'), {
  fallback: fallback()
})

const mapMethodsToProps = (apiService, { cityId }) => ({
  getAll: apiService.getAllOrders(cityId)
})


const ListContainer = compose(
  withRouterParams,
  withApiService(mapMethodsToProps),
  withData({
    getDataMethod: 'getAll',
    dataPropName: 'items',
    loadingText: 'items'
  })
)(List)

const CmsOrdersPage = () => (
  <CmsLayout>
    <h1>Заказы</h1>
    <ListContainer/>
  </CmsLayout>
)

export default CmsOrdersPage