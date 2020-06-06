import React from "react"
import PageLayout from "layouts/Page"
import ProductDetailsContainer from "containers/productDetails"
import { Row } from "components/Bootstrap"
import { Link } from "react-router-dom"
import LastReviews from "components/LastReviews"
import Review from "components/Review"

const ProductPage = () => (
  <PageLayout>
      <div className="container">
          <ProductDetailsContainer/>

          <section>
              <h1 className="mb-4 mt-5">Отзывы</h1>
              <Row>
                  <LastReviews count={3}>
                      {(reviews =>
                        reviews.map(review => (
                          <Review key={review.id} className={'col-md-4'} {...review}/>
                        )))}
                  </LastReviews>
              </Row>
              <br/>
              <Link to='/reviews'>Все отзывы</Link>
          </section>
      </div>
  </PageLayout>
)

export default ProductPage