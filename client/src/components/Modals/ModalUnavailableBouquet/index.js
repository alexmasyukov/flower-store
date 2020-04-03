import React from 'react'
import cn from "classnames"
import styles from "components/Modals/common.module.sass"
import Backdrop from "components/Modals/Backdrop"
import { connect } from "react-redux"
import { deliveryDateSelector, deliveryModalCartQuestionSelector } from "store/selectors/ui"
import { hideCartQuestionModal, setDeliveryDate } from "store/actions/uiActions"
import { date_25 } from "containers/TIME_date"

const ModalUnavailableBouquet = ({
                                    setDeliveryDate, deliveryDate,
                                    isVisible, onOkClick, onCancelClick,
                                    hideCartQuestionModal
                                 }) => {
   if (!isVisible) return <div/>

   return (
      <>
         <div className={cn(styles.modal, isVisible && styles.isVisible)}>
            <div className={cn(styles.modalDialog, styles.ModalUnavailableBouquet)}>
               <div className={styles.content}>
                  <div onClick={() => hideCartQuestionModal()}>X</div>

                  <h3>Некоторые букеты не доступны на {deliveryDate}</h3>

                  <div className="row align-items-start">
                     <div className="col pr-1">
                        <button className={styles.but} onClick={onOkClick}>Выбрать букеты на {deliveryDate}</button>
                     </div>
                     <div className="col pl-1">
                        <button className={styles.but} onClick={() => {
                           setDeliveryDate(date_25)
                           hideCartQuestionModal()
                        }}>Не менять дату</button>
                     </div>
                  </div>

               </div>
            </div>
         </div>
         <Backdrop isVisible={isVisible}/>
      </>
   )
}

const mapStateToProps = state => ({
   isVisible: deliveryModalCartQuestionSelector(state),
   deliveryDate: deliveryDateSelector(state)
})

const mapDispatchToProps = {
   setDeliveryDate,
   hideCartQuestionModal
}

const ModalCartQuestionUnavailableBouquetContainer = connect(
   mapStateToProps,
   mapDispatchToProps
)(ModalUnavailableBouquet)

export default ModalCartQuestionUnavailableBouquetContainer