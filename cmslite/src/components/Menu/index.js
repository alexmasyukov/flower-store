import React from 'react'
import { Link } from "react-router-dom"
import withRouterParams from 'components/hoc/withRouterParams'
import styles from 'layouts/Cms/cmsLayout.module.sass'
import { getCityIdByEngName } from "utils"
import { CITIES } from "constants/common"


const CmsMenu = ({city}) => {
  const foundCity = getCityIdByEngName(city, CITIES)

  return (
    <div className={styles.menu}>
      <h3 className={styles.city}>{foundCity.RUS}</h3>
      <Link to={`/${city}/products`}>Товары</Link>
      <Link to={`/${city}/reviews`}>Отзывы</Link>
      <Link to={`/${city}/entities`}>Справочник</Link>
      <Link to={`/${city}/additives`}>Добавки</Link>
      <Link to={`/${city}/banners`}>Баннеры</Link>
      <Link to={`/${city}/team`}>Команда</Link>
      <Link to={`/${city}/content`}>Контент</Link>
      <Link to={`/${city}/customers`}>Клиенты</Link>
      <Link to={`/${city}/orders`}>Заказы</Link>
      <Link to={`/${city}/bot-viber`}>Бот Viber</Link>
      <Link to={`/logout`} className="ml-4">Выход</Link>
    </div>
  )
}

export default withRouterParams(CmsMenu)