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

const BotViberForm = loadable(() => import('components/CmsLite/BotViberForm'), {
    fallback: fallback()
})

const mapMethodsToProps = (apiService, props) => {
    console.log(props)
    return {
        getBotViber: apiService.getBotViber(1), //props.botId
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