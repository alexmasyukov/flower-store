import React from 'react'
import loadable from "@loadable/component"
import CmsLayout from "layouts/Cms"
import { compose } from "utils"
import withRouterParams from "components/hoc/withRouterParams"
import withApiService from "components/hoc/withApiService"
import withData from "components/hoc/withData"
import FormName from "components/FormName"

const fallback = () => (
  <div>Загрузка модуля...</div>
)

const BotViberForm = loadable(() => import('components/BotViberForm'), {
    fallback: fallback()
})

const mapMethodsToProps = (apiService, props) => {
    return {
        getBotViber: apiService.getBotViber(1),
        save: apiService.updateBotViber,
        testBot: apiService.testBotViber
    }
}

const BotViberFormContainer = compose(
  withRouterParams,
  withApiService(mapMethodsToProps),
  withData({
      getDataMethod: 'getBotViber',
      dataPropName: 'bot',
      loadingText: 'bot'
  })
)(BotViberForm)


const CmsBotViberFormPage = () => (
  <CmsLayout>
      <FormName/>
      <BotViberFormContainer/>
  </CmsLayout>
)

export default CmsBotViberFormPage