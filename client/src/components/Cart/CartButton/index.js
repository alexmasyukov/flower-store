import React from 'react'
import { connect } from "react-redux"
import RoubleSymbol from "components/UI/RoubleSymbol"
import { cartProductsSelector, totalPriceSelector } from "store/selectors/cart"
import { push } from 'connected-react-router'

const CartButton = ({ products = [], total = 0, push }) => {
  return (
    <div onClick={() => push('/cart/')}>
      {products.length} товара на {total.toLocaleString('RU-ru')} <RoubleSymbol/>
    </div>
  )
}

const mapStateToProps = (state) => ({
  products: cartProductsSelector(state),
  total: totalPriceSelector(state)
})

const mapDispatchToProps = dispatch => ({
  push: (link) => dispatch(push(link))
})

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(CartButton)