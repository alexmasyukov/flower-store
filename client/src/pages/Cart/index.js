import React from "react"
import PageLayout from "layouts/Page"
import { connect } from 'react-redux'
import CartStepsContainer from "containers/cartStepsContainer"
import CartProductListContainer from "containers/cartProductListContainer"
import { Row } from "components/Bootstrap"
import { orderSelector } from "store/selectors/cart"

const Page = ({ order }) => {
  // console.warn('order CartPage', order)

  return (
    <PageLayout>
      <div className="container">
        {(order.done && order.id) ? (
          <Row>
            <div className="col-md-12">
              <h1>Ваш заказ №{order.id} получен, мы вам перезвоним</h1>
            </div>
          </Row>
        ) : (
          <Row>
            <div className="col-4">
              <CartStepsContainer/>
            </div>
            <div className="col-8">
              <CartProductListContainer/>
            </div>
          </Row>
        )}
      </div>
    </PageLayout>
  )
}

const mapStateToProps = state => ({
  order: orderSelector(state)
})

const CartPage = connect(
  mapStateToProps
)(Page)

export default CartPage