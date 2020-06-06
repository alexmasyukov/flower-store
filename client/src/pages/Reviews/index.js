import React from "react"
import { compose } from "utils"
import withApiService from "components/hoc/withApiService"
import withData from "components/hoc/withData"
import styles from "layouts/Page/pageLayout.module.sass"
import PageLayout from "layouts/Page"
import Review from "components/Review"
import { Row } from "components/Bootstrap"


const ReviewsList = ({ reviews = [] }) =>
  reviews.map(review => (
    <Review key={review.id} className={'col-md-4'} {...review}/>
  ))

const mapMethodsToProps = (apiService) => ({
    getLastReviews: apiService.getLastReviews(50)
})

const Reviews = compose(
  withApiService(mapMethodsToProps),
  withData({
      getDataMethod: 'getLastReviews',
      dataPropName: 'reviews',
      loadingText: 'reviews'
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