import React from "react"
import loadable from "@loadable/component"
import CmsLayout from "layouts/Cms"
import { compose } from "utils"
import withApiService from "components/hoc/withApiService"
import withData from "components/hoc/withData"

const fallback = () => (
  <div>Загрузка модуля...</div>
)
const Team = loadable(() => import('components/CmsLite/Team'), {
    fallback: fallback()
})


const mapMethodsToProps = (apiService) => ({
    getImage: apiService.getImage,
    getTeam: apiService.getTeam
})


const TeamContainer = compose(
  withApiService(mapMethodsToProps),
  withData({
      getDataMethod: 'getTeam',
      dataPropName: 'team',
      loadingText: 'team'
  })
)(Team)

const cmsTeamPage = () => (
  <CmsLayout>
      <TeamContainer/>
  </CmsLayout>
)

export default cmsTeamPage