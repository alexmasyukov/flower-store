import {
  CART_PRODUCT_ADD, CART_PRODUCT_DECREASE,
  CART_PRODUCT_INCREASE, CART_PRODUCT_OPTION_DELETE,
  CART_PRODUCT_REMOVE
} from "store/actionTypes"
import itemReducer from "store/reducers/cart/itemReducer"
import { uuid } from "utils"

const initialId = uuid()
const initialState = [
  {
    id: 'jt4q4t5ul3g',
    productId: 1,
    title: 'Сборный в коробке',
    image: '/api/static/sm_2e05ff78-6b6c-4858-8336-3b9872184949.jpg',
    diameter: 78,
    flowers: [
      'Гортензия',
      'Фиалка',
      'Странная зелель',
      'Кустовая роза'
    ],
    options: [
      {
        id: 5,
        cart_title: 'Коробка',
        button: 'Бархатная',
        price: 1500
      },
      {
        id: 6,
        cart_title: 'Зелень',
        button: 'Немного',
        price: 100
      }
    ],
    size: {
      title: 'Большой',
      price: 2150
    },
    unavailable: [],
    count: 1
  },
  {
    id: 'v5sf9ki2kp',
    productId: 93,
    title: 'Тестовый',
    image: '/api/static/sm_bdc50e1b-50ff-4ecf-a092-98ec8bc7bea2.jpg',
    diameter: 66,
    flowers: [
      'Странная зелель'
    ],
    options: [],
    size: {
      title: 'Премиум',
      price: 1900
    },
    unavailable: [],
    count: 1
  },
  {
    id: 'hltnh12c8ig',
    productId: 2,
    title: 'Гортензия',
    image: '/api/static/sm_e51d34d8-3574-4613-b094-4e644f595f40.jpg',
    diameter: 60,
    flowers: [
      'Гортензия',
      'Странная зелель',
      'Кустовая роза'
    ],
    options: [
      {
        id: 2,
        cart_title: 'Коробка',
        order: 1,
        button: 'Бархатная',
        price: 1500,
        image: 'image 1'
      }
    ],
    size: {
      title: 'Большой',
      price: 6000
    },
    unavailable: [],
    count: 1
  },
  {
    id: '4soqio4b80o',
    productId: 1,
    title: 'Сборный в коробке',
    image: '/api/static/sm_2e05ff78-6b6c-4858-8336-3b9872184949.jpg',
    diameter: 90,
    flowers: [
      'Гортензия',
      'Фиалка',
      'Странная зелель',
      'Кустовая роза'
    ],
    options: [
      {
        id: 1,
        cart_title: 'Зелень',
        order: 2,
        button: 'Побольше',
        price: 300,
        image: 'image 3'
      }
    ],
    size: {
      title: 'Стандартный',
      price: 3200
    },
    unavailable: [],
    count: 1
  }
]
// allIds: [[initialId]]
// }



// const byIdReducer = (state, action, newId) => {
//   switch (action.type) {
//     case CART_PRODUCT_INCREASE:
//     case CART_PRODUCT_DECREASE:
//       console.log(state)
//       return state.map(product => product.id === action.id ?
//         itemReducer(product, action) : product)
//     // const product = state[action.id]
//     // {
//     //   ...state,
//     //   [action.id]: itemReducer(product, action)
//     // }

//     case CART_PRODUCT_ADD:
//       console.log(action.product)
//       return {
//         ...state,
//         [newId]: {
//           ...action.product
//         }
//       }

//     case CART_PRODUCT_REMOVE:
//       return state.filter(product => product.id !== action.id)
//     // const { [action.id]: _, ...noKey } = state
//     // return { ...noKey }

//     case CART_PRODUCT_OPTION_DELETE:
//       return state.map(product => product.id === action.id ?
//         optionDelete(state, action) : product)
//     // return {
//     //   ...state,
//     //   [action.productId]: optionDelete(state, action) : product)
//     // }

//     default:
//       return state
//   }
// }

// const allIdsReducer = (state, action, newId) => {
//   switch (action.type) {
//     case CART_PRODUCT_REMOVE:
//       return state.filter(id => id !== action.id)

//     case CART_PRODUCT_ADD:
//       return [...state, newId]

//     default:
//       return state
//   }
// }

// const productsReducer = (state = initialState, action) => {
//   const newId = uuid()

//   return 
//     // byId: byIdReducer(state.byId, action, newId),
//     allIds: allIdsReducer(state.allIds, action, newId)
//   }
// }

function optionDelete(options, optionId) {
  console.log('optionDelete state', options, optionId)
  return options.filter(option => option.id !== optionId)
}

const productsReducer = (state = initialState, action) => {
  switch (action.type) {
    case CART_PRODUCT_INCREASE:
    case CART_PRODUCT_DECREASE:
      console.log(action)
      return state.map(product => product.id === action.id ?
        itemReducer(product, action) : product)


    case CART_PRODUCT_ADD:
      const { id: productId, ...base } = action.product

      const newProduct = {
        id: uuid(),
        productId,
        ...base
      }

      return [
        ...state,
        newProduct
      ]


    case CART_PRODUCT_REMOVE:
      console.log(action)
      return state.filter(product => product.id !== action.id)


    case CART_PRODUCT_OPTION_DELETE:
      console.log(action)
      return state.map(product => product.id === action.id ?
        {
          ...product,
          options: optionDelete(product.options, action.optionId)
        } : product)

    default:
      return state
  }
}

export default productsReducer