import React, { Component } from 'react'
import CartButton from "components/Cart/CartButton"
import { Link } from "react-router-dom"
import styles from './pageLayout.module.sass'
import ModalSelectDelivetyDateContainer from "containers/modalSelectDelivetyDateContainer"
import ShowDeliveryModalButtonContainer from "components/Modals/ShowDeliveryModalButton"
import ModalCartQuestionUnavailableBouquetContainer from "components/Modals/ModalUnavailableBouquet"


class PageLayout extends Component {
   render() {
      return (
         <div className={styles.gray}>
            <div className={styles.menu}>
               <Link to="/catalog/">Каталог</Link>
               <Link to="/cart/">Корзина</Link>
               <CartButton/>
               <ShowDeliveryModalButtonContainer/>
            </div>

            {this.props.children}
            <ModalSelectDelivetyDateContainer/>
            <ModalCartQuestionUnavailableBouquetContainer/>
         </div>
      )
   }
}

export default PageLayout