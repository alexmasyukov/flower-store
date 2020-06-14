import React from 'react'
import loadable from "@loadable/component"
import CmsLayout from "layouts/Cms"
import { compose } from "utils"
import withRouterParams from "components/hoc/withRouterParams"
import withApiService from "components/hoc/withApiService"
import withData from "components/hoc/withData"
import FormName from "components/CmsLite/FormName"

const fallback = () => (
  <div>Загрузка модуля...</div>
)

const Form = loadable(() => import('components/CmsLite/OrderForm'), {
    fallback: fallback()
})

const mapMethodsToProps = (apiService, props) => {
    return {
        getOne: apiService.getOrder(props.id),
        getImage: apiService.getImage
    }
}

const FormContainer = compose(
  withRouterParams,
  withApiService(mapMethodsToProps),
  withData({
      getDataMethod: 'getOne',
      dataPropName: 'data',
      loadingText: 'order'
  })
)(Form)


const CmsOrderFormPage = () => (
  <CmsLayout>
      <FormName/>
      <FormContainer/>
  </CmsLayout>
)

export default CmsOrderFormPage