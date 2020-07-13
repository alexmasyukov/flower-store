export const DELIVERY_IS = {
  COURIER: 'COURIER',
  YOURSELF: 'YOURSELF'
}

export const PAY_TYPES = {
  CARD: 'CARD',
  CASH: 'CASH',
  CARD_ONLINE: 'CARD_ONLINE',
  TO_CORPORATE_CARD: 'TO_CORPORATE_CARD',
  ACCOUNT_FOR_A_LEGAL_ENTITY: 'ACCOUNT_FOR_A_LEGAL_ENTITY'
}

export const AVAILABLE_TYPES = {
  BASE: 'BASE',
  FAST: 'FAST'
}

export const CONFIM_STATUS = {
  BEFORE_SEND: 'BEFORE_SEND',

  DONE: 'DONE',
  INCORRECT_CODE: 'INCORRECT_CODE',
  SEND_SMS_DONE: 'SEND_SMS_DONE',
  SEND_SMS_ERROR: 'SEND_SMS_ERROR'
}

export const PHONE_FORMAT = {
  FORMAT_FOR_VALUE: '7##########',
  FORMAT_FOR_INPUT: '+7(###)###-####',
  FORMAT_FOR_TEXT: '+7 (###) ###-####',
}

export const CITIES = {
  CHITA: {
    id: 1,
    eng: 'chita',
    rus: 'Чита'
  },
  MOSCOW: {
    id: 2,
    eng: 'moscow',
    rus: 'Москва'
  }
}

export const LINK = {
  HOME: '/',
  CATALOG: '/catalog',
  CATALOG_PRODUCT: '/catalog/:id',
  CART: '/cart',
  ABOUT: '/about',
  CONTACTS: '/contacts',
  DELIVERY: '/delivery',
  QUERSTIONS: '/voprosy-i-otvety',
  FLOWERS_MANUAL: '/instrukciya-svezhesti',
  REVIEWS: '/reviews'
}