import React from "react"
import { compose } from "utils"
import withApiService from "components/hoc/withApiService"
import withData from "components/hoc/withData"
import styles from "layouts/Page/pageLayout.module.sass"
import PageLayout from "layouts/Page"
import Review from "components/Review"
import { Row } from "components/Bootstrap"
import withCity from "components/hoc/withCity"
import { Redirect } from "react-router-dom"


const ReviewsList = ({ reviews = [] }) =>
  reviews.map(review => (
    <Review key={review.id} className={'col-md-4'} {...review}/>
  ))

const mapMethodsToProps = (apiService, { city }) => ({
  getLastReviews: apiService.getLastReviews(city.id, 50)
})

const Reviews = compose(
  withCity,
  withApiService(mapMethodsToProps),
  withData({
    getDataMethod: 'getLastReviews',
    dataPropName: 'reviews',
    loadingText: 'reviews',
    errorResponse: <Redirect to={'404'} />
  })
)(ReviewsList)

const ReviewsPage = () => (
  <PageLayout>
    <div className="container">
      <h1 className={styles.pageTitle}>Отзывы</h1>
      <Row>
        <Reviews/>
      </Row>
    </div>
  </PageLayout>
)

export default ReviewsPage