import React from 'react'
import loadable from "@loadable/component"
import CmsLayout from "layouts/Cms"
import { compose } from "utils"
import withRouterParams from "components/hoc/withRouterParams"
import withApiService from "components/hoc/withApiService"
import withData from "components/hoc/withData"
import teamPersonModel from "models/teamPerson"
import FormName from "components/FormName"

const fallback = () => (
  <div>Загрузка модуля...</div>
)

const TeamPersonForm = loadable(() => import('components/TeamPersonForm'), {
  fallback: fallback()
})


const mapMethodsToProps = (apiService, props) => {
  return {
    getTeamPerson: apiService.getTeamPerson(props.id),
    uploadImages: apiService.uploadImages,
    getImage: apiService.getImage,
    save: apiService.updateTeamPerson
  }
}

const TeamPersonFormContainer = compose(
  withRouterParams,
  withApiService(mapMethodsToProps),
  withData({
    getDataMethod: 'getTeamPerson',
    dataPropName: 'person',
    loadingText: 'person'
  })
)(TeamPersonForm)


const mapMethodsToProps_NewItem = (apiService) => {
  return {
    uploadImages: apiService.uploadImages,
    getImage: apiService.getImage,
    save: apiService.saveTeamPerson
  }
}

const TeamPersonFormContainer_NewItem = compose(
  withRouterParams,
  withApiService(mapMethodsToProps_NewItem)
)(TeamPersonForm)


const CmsTeamPersonFormPage = ({ isNew }) => (
  <CmsLayout>
    <FormName isNew={isNew}/>
    {isNew ? (
      <TeamPersonFormContainer_NewItem person={teamPersonModel}/>
    ) : (
      <TeamPersonFormContainer/>
    )}
  </CmsLayout>
)

export default CmsTeamPersonFormPage