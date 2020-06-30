import React from "react"
import loadable from "@loadable/component"
import CmsLayout from "layouts/Cms"
import { compose } from "utils"
import withApiService from "components/hoc/withApiService"
import withRouterParams from 'components/hoc/withRouterParams'
import withData from "components/hoc/withData"
import { Link } from "react-router-dom"
import styles from "layouts/Cms/cmsLayout.module.sass"

const fallback = () => (
  <div>Загрузка модуля...</div>
)
const EntitiesList = loadable(() => import('components/EntitiesList'), {
    fallback: fallback()
})


const mapMethodsToProps = (apiService) => ({
    getAllEntities: apiService.getAllEntities
})


const EntitiesListContainer = compose(
  withRouterParams,
  withApiService(mapMethodsToProps),
  withData({
      getDataMethod: 'getAllEntities',
      dataPropName: 'entities',
      loadingText: 'entities'
  })
)(EntitiesList)

const CmsEntitiesPage = () => (
  <CmsLayout>
      <h1>Справочник</h1>
      <Link className={styles.addBtn} to="/entities-add">Добавить</Link>
      <EntitiesListContainer/>
  </CmsLayout>
)

export default CmsEntitiesPage