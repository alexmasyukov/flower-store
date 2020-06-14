import React from 'react'
import { Link } from "react-router-dom"

const CmsMenu = ({ className }) => {
    return (
      <div className={className}>
          <Link to="/cmslite/products">Товары</Link>
          <Link to="/cmslite/reviews">Отзывы</Link>
          <Link to="/cmslite/entities">Справочник</Link>
          <Link to="/cmslite/additives">Добавки</Link>
          <Link to="/cmslite/banners">Баннеры</Link>
          <Link to="/cmslite/team">Команда</Link>
          <Link to="/cmslite/content">Контент</Link>
          <Link to="/cmslite/customers">Клиенты</Link>
          <Link to="/cmslite/orders">Заказы</Link>
          <Link to="/cmslite/bot-viber">Бот Viber</Link>
          {/*<Link to="/cmslite/settings">Настройки</Link>*/}
      </div>
    )
}

export default CmsMenu