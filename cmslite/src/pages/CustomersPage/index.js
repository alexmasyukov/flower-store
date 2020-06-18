import React from "react"
import loadable from "@loadable/component"
import CmsLayout from "layouts/Cms"
import { compose } from "utils"
import withApiService from "components/hoc/withApiService"
import withData from "components/hoc/withData"
import withRouterParams from "components/hoc/withRouterParams"

const fallback = () => (
  <div>Загрузка модуля...</div>
)
const List = loadable(() => import('components/CustomersList'), {
    fallback: fallback()
})

const mapMethodsToProps = (apiService) => ({
    getAll: apiService.getAllCustomers
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

const CmsCustomersPage = () => (
  <CmsLayout>
      <h1>Клиенты</h1>
      <ListContainer/>
  </CmsLayout>
)

export default CmsCustomersPage