import React from 'react'
import { Link } from "react-router-dom"

const CmsMenu = ({ className }) => {
    return (
      <div className={className}>
          <Link to="/products">Товары</Link>
          <Link to="/reviews">Отзывы</Link>
          <Link to="/entities">Справочник</Link>
          <Link to="/additives">Добавки</Link>
          <Link to="/banners">Баннеры</Link>
          <Link to="/team">Команда</Link>
          <Link to="/content">Контент</Link>
          <Link to="/customers">Клиенты</Link>
          <Link to="/orders">Заказы</Link>
          <Link to="/bot-viber">Бот Viber</Link>
          {/*<Link to="/settings">Настройки</Link>*/}
      </div>
    )
}

export default CmsMenu