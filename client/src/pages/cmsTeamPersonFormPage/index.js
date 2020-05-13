import React from 'react'
import loadable from "@loadable/component"
import CmsLayout from "layouts/Cms"
import { compose } from "utils"
import withRouterParams from "components/hoc/withRouterParams"
import withApiService from "components/hoc/withApiService"
import withData from "components/hoc/withData"

const fallback = () => (
  <div>Загрузка модуля...</div>
)
const TeamPersonForm = loadable(() => import('components/CmsLite/TeamPersonForm'), {
    fallback: fallback()
})


const mapMethodsToProps = (apiService, props) => {
    return {
        getTeamPerson: apiService.getTeamPerson(props.id),
        getAllCities: apiService.getAllCities,
        saveTeamPerson: apiService.saveTeamPerson,
        uploadImages: apiService.uploadImages,
        getImage: apiService.getImage
    }
}


const TeamPersonFormContainer = compose(
  withRouterParams,
  withApiService(mapMethodsToProps),
  withData({
      getDataMethod: 'getTeamPerson',
      dataPropName: 'person',
      loadingText: 'person'
  }),
  withData({
      getDataMethod: 'getAllCities',
      dataPropName: 'cities',
      loadingText: 'cities'
  })
)(TeamPersonForm)

const cmsTeamPersonFormPage = () => (
  <CmsLayout>
      <TeamPersonFormContainer/>
  </CmsLayout>
)

export default cmsTeamPersonFormPage