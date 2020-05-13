import React from "react"
import loadable from "@loadable/component"
import CmsLayout from "layouts/Cms"
import { compose } from "utils"
import withApiService from "components/hoc/withApiService"
import withData from "components/hoc/withData"

const fallback = () => (
  <div>Загрузка модуля...</div>
)
const PersonList = loadable(() => import('components/CmsLite/Team'), {
    fallback: fallback()
})


const mapMethodsToProps = (apiService) => ({
    getImage: apiService.getImage,
    getTeam: apiService.getTeam
})


const PersonListContainer = compose(
  withApiService(mapMethodsToProps),
  withData({
      getDataMethod: 'getTeam',
      dataPropName: 'team',
      loadingText: 'team'
  })
)(PersonList)

const cmsTeamPage = () => (
  <CmsLayout>
      <PersonListContainer/>
  </CmsLayout>
)

export default cmsTeamPage