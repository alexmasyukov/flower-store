import React, { Component } from 'react'
import { connect } from "react-redux"
import Preloader from "components/Preloader"
import AdditionalProducts from "components/ProductDetails/AdditionalProducts"
import { additionalProductsSelector } from "store/selectors/additionalProducts"
import { fetchAdditionalProducts } from "store/actions/additionalProductsActions"

class AdditionalProductsContainer extends Component {
  // componentDidMount() {
  //   this.props.fetchData()
  // }

  handleClick = (id) => {
    this.props.onClick(id)
  }

  render() {
    const { products, activeIds } = this.props

    if (!products.length) return <Preloader/>

    return (
        <AdditionalProducts
          products={products}
          activeIds={activeIds}
          onSelect={this.handleClick}
        />
    )
  }
}

const mapStateToProps = state => ({
  products: additionalProductsSelector(state)
})

const mapDispatchToProps = dispatch => ({
  fetchData: dispatch(fetchAdditionalProducts())
})

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(AdditionalProductsContainer)