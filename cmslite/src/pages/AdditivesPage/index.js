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
const AdditivesList = loadable(() => import('components/AdditivesList'), {
    fallback: fallback()
})


const mapMethodsToProps = (apiService, { cityId }) => ({
    getAll: apiService.getAllAdditives(cityId),
    delete: apiService.deleteAdditive
})


const AdditivesListContainer = compose(
  withRouterParams,
  withApiService(mapMethodsToProps),
  withData({
      getDataMethod: 'getAll',
      dataPropName: 'additives',
      loadingText: 'additives'
  })
)(AdditivesList)

const CmsAdditivesPage = () => (
  <CmsLayout>
      <h1>Добавки к букетам</h1>
      <Link className={styles.addBtn} to={`${window.location.pathname}/add`}>Добавить</Link>
      <AdditivesListContainer/>
  </CmsLayout>
)

export default CmsAdditivesPage