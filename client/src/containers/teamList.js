import React from "react"
import loadable from "@loadable/component"
import { compose } from "utils"
import withRouterParams from "components/hoc/withRouterParams"
import withApiService from "components/hoc/withApiService"
import withData from "components/hoc/withData"

const fallback = () => (
  <div>Загрузка модуля...</div>
)
const TeamList = loadable(() => import('components/TeamList'), {
    fallback: fallback()
})

const mapMethodsToProps = (apiService) => {
    return {
        getTeam: apiService.getTeam,
        getImage: apiService.getImage
    }
}

const TeamListContainer = compose(
  withRouterParams,
  withApiService(mapMethodsToProps),
  withData({
      getDataMethod: 'getTeam',
      dataPropName: 'persons',
      loadingText: 'content'
  })
)(TeamList)

export default TeamListContainer