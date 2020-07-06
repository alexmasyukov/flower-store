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
const Team = loadable(() => import('components/Team'), {
    fallback: fallback()
})


const mapMethodsToProps = (apiService) => ({
    getImage: apiService.getImage,
    getTeam: apiService.getTeam,
    delete: apiService.deleteTeamPerson
})


const TeamContainer = compose(
  withRouterParams,
  withApiService(mapMethodsToProps),
  withData({
      getDataMethod: 'getTeam',
      dataPropName: 'team',
      loadingText: 'team'
  })
)(Team)

const CmsTeamPage = () => (
  <CmsLayout>
      <h1>Команда</h1>
      <Link className={styles.addBtn} to={`${window.location.pathname}/add`}>Добавить</Link>
      <TeamContainer/>
  </CmsLayout>
)

export default CmsTeamPage