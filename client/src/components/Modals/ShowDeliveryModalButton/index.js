import React from 'react'
import { connect } from "react-redux"
import { deliveryDateSelector } from "store/selectors/ui"
import { showDeliveryModal } from "store/actions/uiActions"

const ShowDeliveryModalButton = ({
                                    city,
                                    deliveryDate,
                                    showDeliveryModal
                                 }) => {
   return (
      <a href="#" onClick={() => showDeliveryModal()}>
         Доставка Чита, {deliveryDate}
      </a>
   )
}


const mapStateToProps = state => ({
   deliveryDate: deliveryDateSelector(state)
})

const mapDispatchToProps = {
   showDeliveryModal
}

const ShowDeliveryModalButtonContainer = connect(
   mapStateToProps,
   mapDispatchToProps
)(ShowDeliveryModalButton)

export default ShowDeliveryModalButtonContainer