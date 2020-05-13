import React from 'react'
import loadable from "@loadable/component"
import CmsLayout from "layouts/Cms"
import { compose } from "utils"
import withRouterParams from "components/hoc/withRouterParams"
import withApiService from "components/hoc/withApiService"
import teamPersonModel from "models/teamPerson"

const fallback = () => (
  <div>Загрузка модуля...</div>
)

const TeamPersonForm = loadable(() => import('components/CmsLite/TeamPersonForm'), {
    fallback: fallback()
})

const mapMethodsToProps = (apiService, props) => {
    return {
        saveTeamPerson: apiService.saveTeamPerson,
        uploadImages: apiService.uploadImages,
        getImage: apiService.getImage
    }
}


const TeamPersonFormContainer = compose(
  withRouterParams,
  withApiService(mapMethodsToProps)
)(TeamPersonForm)

const cmsTeamNewPersonFormPage = () => (
  <CmsLayout>
      <TeamPersonFormContainer person={teamPersonModel}/>
  </CmsLayout>
)

export default cmsTeamNewPersonFormPage