import React from "react"
import loadable from "@loadable/component"
import CmsLayout from "layouts/Cms"
import { compose } from "utils"
import withApiService from "components/hoc/withApiService"
import withData from "components/hoc/withData"

const fallback = () => (
  <div>Загрузка модуля...</div>
)
const EntitiesList = loadable(() => import('components/CmsLite/EntitiesList'), {
    fallback: fallback()
})


const mapMethodsToProps = (apiService) => ({
    getAllEntities: apiService.getAllEntities
})


const EntitiesListContainer = compose(
  withApiService(mapMethodsToProps),
  withData({
      getDataMethod: 'getAllEntities',
      dataPropName: 'entities',
      loadingText: 'entities'
  })
)(EntitiesList)

const CmsEntitiesPage = () => (
  <CmsLayout>
      <EntitiesListContainer/>
  </CmsLayout>
)

export default CmsEntitiesPage