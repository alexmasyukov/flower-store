import React from 'react'
import loadable from "@loadable/component"
import CmsLayout from "layouts/Cms"
import { compose } from "utils"
import withRouterParams from "components/hoc/withRouterParams"
import withApiService from "components/hoc/withApiService"
import withData from "components/hoc/withData"
import entitieModel from "models/entitie"

const fallback = () => (
  <div>Загрузка модуля...</div>
)

const EntitieForm = loadable(() => import('components/CmsLite/EntitieForm'), {
    fallback: fallback()
})

const mapMethodsToProps = (apiService, props) => ({
    getAllEntities: apiService.getAllEntities,
    getEntitie: apiService.getEntitie(props.id),
    saveEntitie: apiService.saveEntitie
})

const EntitieFormContainer = compose(
  withRouterParams,
  withApiService(mapMethodsToProps),
  withData({
      getDataMethod: 'getAllEntities',
      dataPropName: 'entities',
      loadingText: 'entities'
  }),
  withData({
      getDataMethod: 'getEntitie',
      dataPropName: 'entitie',
      loadingText: 'entitie'
  })
)(EntitieForm)


const mapMethodsToProps_NewItem = (apiService) => ({
    getAllEntities: apiService.getAllEntities,
    saveEntitie: apiService.saveEntitie
})

const EntitieFormContainer_NewItem = compose(
  withApiService(mapMethodsToProps_NewItem),
  withData({
      getDataMethod: 'getAllEntities',
      dataPropName: 'entities',
      loadingText: 'entities'
  })
)(EntitieForm)

const CmsEntitieFormPage = ({ isNew }) => (
  <CmsLayout>
      {isNew ? (
        <EntitieFormContainer_NewItem entitie={entitieModel}/>
      ) : (
        <EntitieFormContainer/>
      )}
  </CmsLayout>
)

export default CmsEntitieFormPage