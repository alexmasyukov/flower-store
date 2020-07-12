import React, { Component } from 'react'
import ModalSelectDeliveryDate from "components/Modals/ModalSelectDeliveryDate"
import { connect } from "react-redux"
// import { setDeliveryDate } from "store/actions/uiActions"
import { deliveryDateSelector, deliveryModalVisibleSelector } from "store/selectors/ui"
import { setDeliveryDateAndFetchProductsexport } from "store/actions/uiActions"

class ModalSelectDelivetyDateCom extends Component {
   render() {
      // console.log('ModalSelectDelivetyDate CONTAINER RENDER')
      return (
         <ModalSelectDeliveryDate {...this.props} />
      )
   }
}

const mapStateToProps = state => ({
   deliveryDate: deliveryDateSelector(state),
   isVisible: deliveryModalVisibleSelector(state)
})

const mapDispatchToProps = {
   setDeliveryDateAndFetchProductsexport
}

const ModalSelectDelivetyDateContainer = connect(
   mapStateToProps,
   mapDispatchToProps
)(ModalSelectDelivetyDateCom)

export default ModalSelectDelivetyDateContainer