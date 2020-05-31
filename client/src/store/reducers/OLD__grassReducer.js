const initialState = {
  byId: {
    id0: {
      id: 'id0',
      title: 'Нет',
      price: 0
    },
    id1: {
      id: 'id1',
      title: 'Немного',
      price: 100
    },
    id2: {
      id: 'id2',
      title: 'Побольше',
      price: 300
    }
  },
  allIds: ['id0', 'id1', 'id2']
}

const OLD__grassReducer = (state = initialState, action) => {
  switch (action.type) {
    default:
      return state
  }
}

export default OLD__grassReducer