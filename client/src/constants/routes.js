import { LINK } from "constants/common"

export const ROUTES = [
  {
    path: LINK.HOME,
    exact: true,
    componentName: 'CatalogPage',
    name: 'Главная',
    menuPosition: 0
  },
  {
    path: LINK.CATALOG,
    exact: true,
    componentName: 'CatalogPage',
    name: 'Каталог',
    menuPosition: 1
  },
  {
    path: LINK.REVIEWS,
    exact: true,
    componentName: 'ReviewsPage',
    name: 'Отзывы',
    menuPosition: 2
  },
  {
    path: LINK.CATALOG_PRODUCT,
    exact: true,
    componentName: 'ProductPage',
    name: ''
  },
  {
    path: LINK.CART,
    exact: true,
    componentName: 'CartPage',
    name: 'Корзина',
    menuPosition: 8
  },
  {
    path: LINK.ABOUT,
    exact: true,
    componentName: 'AboutPage',
    name: 'О нас',
    menuPosition: 4
  },
  {
    path: LINK.CONTACTS,
    exact: true,
    componentName: 'ContactsPage',
    name: 'Контакты',
    menuPosition: 7
  },
  {
    path: LINK.DELIVERY,
    exact: true,
    componentName: 'DeliveryPage',
    name: 'Доставка',
    menuPosition: 3
  },
  {
    path: LINK.QUERSTIONS,
    exact: true,
    componentName: 'QuestionsPage',
    name: 'Вопросы и ответы',
    menuPosition: 5
  },
  {
    path: LINK.FLOWERS_MANUAL,
    exact: true,
    componentName: 'RecomendationsPage',
    name: 'Рекомендации по уходу',
    menuPosition: 6
  }
]
