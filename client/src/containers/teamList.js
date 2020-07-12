import React from "react"
import loadable from "@loadable/component"
import { compose } from "utils"
import withRouterParams from "components/hoc/withRouterParams"
import withApiService from "components/hoc/withApiService"
import withData from "components/hoc/withData"
import withCity from "components/hoc/withCity"

const fallback = () => (
  <div>Загрузка модуля...</div>
)
const TeamList = loadable(() => import('components/TeamList'), {
  fallback: fallback()
})

const mapMethodsToProps = (apiService, { city }) => {
  return {
    getTeam: apiService.getTeam(city.id),
    getImage: apiService.getImage
  }
}

const TeamListContainer = compose(
  withCity,
  withRouterParams,
  withApiService(mapMethodsToProps),
  withData({
    getDataMethod: 'getTeam',
    dataPropName: 'persons',
    loadingText: 'content'
  })
)(TeamList)

export default TeamListContainer