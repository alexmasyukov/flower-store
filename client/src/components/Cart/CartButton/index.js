import React from 'react'
import { connect } from "react-redux"
import RoubleSymbol from "components/UI/RoubleSymbol"
import { allItemsCountsSelector, totalSelector } from "store/selectors/cart"
import { push } from 'connected-react-router'

const CartButton = ({ itemsCount, total, push }) => {
  return (
    <div onClick={() => push('/cart/')}>
      {itemsCount} товара на {total.toLocaleString('RU-ru')} <RoubleSymbol/>
    </div>
  )
}

const mapStateToProps = (state) => ({
  itemsCount: allItemsCountsSelector(state),
  total: totalSelector(state)
})

const mapDispatchToProps = dispatch => ({
  push: (link) => dispatch(push(link))
})

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(CartButton)