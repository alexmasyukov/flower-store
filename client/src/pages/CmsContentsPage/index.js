import React from "react"
import loadable from "@loadable/component"
import CmsLayout from "layouts/Cms"
import { compose } from "utils"
import withApiService from "components/hoc/withApiService"
import withData from "components/hoc/withData"
import { Link } from "react-router-dom"
import styles from "layouts/Cms/cmsLayout.module.sass"

const fallback = () => (
  <div>Загрузка модуля...</div>
)
const ContentList = loadable(() => import('components/CmsLite/ContentList'), {
    fallback: fallback()
})


const mapMethodsToProps = (apiService) => ({
    getAllContent: apiService.getAllContent
})

const ContentListContainer = compose(
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
      <Link className={styles.addBtn} to="/cmslite/content-add">Добавить</Link>
      <ContentListContainer/>
  </CmsLayout>
)

export default CmsContentPage