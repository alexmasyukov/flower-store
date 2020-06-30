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
const ContentList = loadable(() => import('components/ContentList'), {
    fallback: fallback()
})


const mapMethodsToProps = (apiService) => ({
    getAllContent: apiService.getAllContent
})

const ContentListContainer = compose(
  withRouterParams,
  withApiService(mapMethodsToProps),
  withData({
      getDataMethod: 'getAllContent',
      dataPropName: 'content',
      loadingText: 'content'
  })
)(ContentList)

const CmsContentPage = () => (
  <CmsLayout>
      <h1>Контент</h1>
      <Link className={styles.addBtn} to="/content-add">Добавить</Link>
      <ContentListContainer/>
  </CmsLayout>
)

export default CmsContentPage