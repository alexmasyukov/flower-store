import React from "react"
import loadable from "@loadable/component"
import CmsLayout from "layouts/Cms"
import { compose } from "utils"
import withApiService from "components/hoc/withApiService"
import withData from "components/hoc/withData"
import withRouterParams from 'components/hoc/withRouterParams'
import { Link } from "react-router-dom"
import styles from "layouts/Cms/cmsLayout.module.sass"

const fallback = () => (
  <div>Загрузка модуля...</div>
)
const BannersList = loadable(() => import('components/BannersList'), {
  fallback: fallback()

})


const mapMethodsToProps = (apiService) => ({
  getAllBanners: apiService.getAllBanners,
  getImage: apiService.getImage
})


const BannersListContainer = compose(
  withRouterParams,
  withApiService(mapMethodsToProps),
  withData({
    getDataMethod: 'getAllBanners',
    dataPropName: 'banners',
    loadingText: 'banners'
  })
)(BannersList)

const CmsBannersPage = () => (
  <CmsLayout>
    <h1>Баннеры</h1>
    <Link className={styles.addBtn} to={`${window.location.pathname}/add`}>Добавить</Link>
    <BannersListContainer/>
  </CmsLayout>
)

export default CmsBannersPage