import React from "react"
import PageLayout from "layouts/Page"
import CartStepsContainer from "containers/cartStepsContainer"
import CartProductListContainer from "containers/cartProductListContainer"
import { Row } from "components/Bootstrap"

const CartPage = () => (
  <PageLayout>
    <div className="container">
      <Row>
        <div className="col-4">
          <CartStepsContainer />
        </div>
        <div className="col-8">
          <CartProductListContainer />
        </div>
      </Row>
    </div>
  </PageLayout>
)

export default CartPage