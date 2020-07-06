import React from 'react'
import loadable from "@loadable/component"
import CmsLayout from "layouts/Cms"
import { compose } from "utils"
import withRouterParams from "components/hoc/withRouterParams"
import withApiService from "components/hoc/withApiService"
import withData from "components/hoc/withData"
import reviewModel from "models/review"
import FormName from "components/FormName"

const fallback = () => (
  <div>Загрузка модуля...</div>
)

const ReviewForm = loadable(() => import('components/ReviewForm'), {
  fallback: fallback()
})

const mapMethodsToProps = (apiService, props) => {
  return {
    getReview: apiService.getReview(props.id),
    uploadImages: apiService.uploadImages,
    getImage: apiService.getImage,
    save: apiService.updateReview
  }
}

const ReviewFormContainer = compose(
  withRouterParams,
  withApiService(mapMethodsToProps),
  withData({
    getDataMethod: 'getReview',
    dataPropName: 'review',
    loadingText: 'review'
  })
)(ReviewForm)


const mapMethodsToProps_NewItem = (apiService) => {
  return {
    save: apiService.saveReview,
    uploadImages: apiService.uploadImages,
    getImage: apiService.getImage
  }
}

const ReviewFormContainer_NewItem = compose(
  withRouterParams,
  withApiService(mapMethodsToProps_NewItem)
)(ReviewForm)


const CmsReviewFormPage = ({ isNew }) => (
  <CmsLayout>
    <FormName isNew={isNew}/>
    {isNew ? (
      <ReviewFormContainer_NewItem review={reviewModel}/>
    ) : (
      <ReviewFormContainer/>
    )}
  </CmsLayout>
)

export default CmsReviewFormPage