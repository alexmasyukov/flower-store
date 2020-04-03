import {
  CART_PRODUCT_ADD, CART_PRODUCT_DECREASE,
  CART_PRODUCT_INCREASE, CART_PRODUCT_OPTION_DELETE,
  CART_PRODUCT_REMOVE
} from "store/actionTypes"
import itemReducer from "store/reducers/cart/itemReducer"
import { date_26, date_29 } from "containers/TIME_date"

const initialState = {
  byId: {
    id9: {
      id: 'id9',
      unavailable: [date_29],
      title: 'Монобукет кустовой розы',
      image: '/static/media/5.d5ce967b.jpeg',
      options: {
        grass: {
          title: 'Немного',
          price: 150
        },
        box: {
          title: 'Бархатная',
          price: 1500
        }
      },
      size: 'Большой',
      price: 3900,
      count: 1
    },
    id200: {
      id: 'id200',
      unavailable: [date_26, date_29],
      title: 'Сборный в коробке',
      image: '/static/media/9.3482e43d.jpg',
      size: 'Премиум',
      options: {
        grass: {
          title: 'Побольше',
          price: 300
        }
      },
      price: 3400,
      count: 5
    }
  },
  allIds: ['id9', 'id200']
}


// {
//   type: 'CART_ADD_PRODUCT',
//   product: {
//       id: 'id3',
//       title: '33333 (Большой)',
//       image: 'http://localhost:3000/static/media/5.d5ce967b.jpeg',
//       price: 3333,
//       additionalProductsIds: ['id0n']
//   },
//   additionalProducts: ['id0n']
// }


function optionDelete(state, action) {
  const product = state[action.id]
  const { [action.optionKey]: _, ...noKey } = product.options

  return {
    ...product,
    options: {
      ...noKey
    }
  }
}


const byIdReducer = (state, action) => {
  switch (action.type) {
    case CART_PRODUCT_INCREASE:
    case CART_PRODUCT_DECREASE:
      const product = state[action.id]
      return {
        ...state,
        [action.id]: itemReducer(product, action)
      }

    case CART_PRODUCT_ADD:
      console.log(action.product)
      return {
        ...state,
        [action.product.id]: {
          ...action.product,
          count: 1
        }
      }

    case CART_PRODUCT_REMOVE:
      const { [action.id]: _, ...noKey } = state
      return { ...noKey }

    case CART_PRODUCT_OPTION_DELETE:
      return {
        ...state,
        [action.id]: optionDelete(state, action)
      }

    default:
      return state
  }
}

const allIdsReducer = (state, action) => {
  switch (action.type) {
    case CART_PRODUCT_REMOVE:
      return state.filter(id => id !== action.id)

    case CART_PRODUCT_ADD:
      return [...state, action.product.id]

    default:
      return state
  }
}

const productsReducer = (state = initialState, action) => ({
  byId: byIdReducer(state.byId, action),
  allIds: allIdsReducer(state.allIds, action)
})

export default productsReducer