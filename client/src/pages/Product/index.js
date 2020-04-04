import React from "react"
import PageLayout from "layouts/Page"
import ProductDetailsContainer from "containers/productDetails"

const ProductPage = () => (
  <PageLayout>
    <div className="container">
      <ProductDetailsContainer/>
    </div>
  </PageLayout>
)

export default ProductPage