import React, { Component } from 'react'
import CartButton from "components/Cart/CartButton"
import ModalSelectDelivetyDateContainer from "containers/modalSelectDelivetyDateContainer"
import ShowDeliveryModalButtonContainer from "components/Modals/ShowDeliveryModalButton"
import ModalCartQuestionUnavailableBouquetContainer from "components/Modals/ModalUnavailableBouquet"
import BannerContainer from "containers/banner"
import Menu from "components/Menu"
import styles from './pageLayout.module.sass'

class PageLayout extends Component {
  render() {
    return (
      <>
        <div className="container">
          <div className="row">
            <div className="col-md-9">
              <Menu/>
            </div>
            <div className="col-md-3">
              <CartButton/>
              {/*<ShowDeliveryModalButtonContainer/>*/}
            </div>
          </div>
        </div>
        <div className={styles.gray}>
          {/*<BannerContainer id={1} className={styles.bannerTop}/>*/}

          {this.props.children}
          {/*<ModalSelectDelivetyDateContainer/>*/}
          {/*<ModalCartQuestionUnavailableBouquetContainer/>*/}

          {/*<BannerContainer id={9} className={styles.bannerBotton}/>*/}
        </div>
      </>
    )
  }
}

export default PageLayout