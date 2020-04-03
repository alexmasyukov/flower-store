import React from "react"
import PageLayout from "layouts/Page"
import CartContainer from "containers/cartContainer"

const CartPage = () => (
  <PageLayout>
    <div className="container">
      <CartContainer/>
    </div>
  </PageLayout>
)

export default CartPage