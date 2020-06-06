import React, { Component } from 'react'
import CartButton from "components/Cart/CartButton"
import { Link } from "react-router-dom"
import styles from './pageLayout.module.sass'
import ModalSelectDelivetyDateContainer from "containers/modalSelectDelivetyDateContainer"
import ShowDeliveryModalButtonContainer from "components/Modals/ShowDeliveryModalButton"
import ModalCartQuestionUnavailableBouquetContainer from "components/Modals/ModalUnavailableBouquet"
import BannerContainer from "containers/banner"


class PageLayout extends Component {
    render() {
        return (
          <>
              <div className="container">
                  <div className="row">
                      <div className="col-md-9">
                          <div className={styles.menu}>
                              <Link to="/catalog/">Каталог</Link>
                              <Link to="/reviews/">Отзывы</Link>
                              <Link to="/delivery/">Доставка</Link>
                              <Link to="/about/">О нас</Link>
                              <Link to="/voprosy-i-otvety/">Вопросы и ответы</Link>
                              <Link to="/instrukciya-svezhesti/">Рекомендации по уходу</Link>
                              <Link to="/contacts/">Контакты</Link>
                              <Link to="/cart/">Корзина</Link>
                          </div>
                      </div>
                      <div className="col-md-3">
                          <CartButton/>
                          <ShowDeliveryModalButtonContainer/>
                      </div>
                  </div>
              </div>
              <div className={styles.gray}>
                  <BannerContainer id={1} className={styles.bannerTop}/>

                  {this.props.children}
                  <ModalSelectDelivetyDateContainer/>
                  <ModalCartQuestionUnavailableBouquetContainer/>

                  <BannerContainer id={9} className={styles.bannerBotton}/>
              </div>
          </>
        )
    }
}

export default PageLayout