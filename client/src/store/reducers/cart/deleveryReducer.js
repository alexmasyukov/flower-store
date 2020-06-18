const initialState = {
    cost: 100,
    date: new Date()
}

export default (state = initialState, { type, payload }) => {
    switch (type) {

    case 'a':
        return { ...state, ...payload }

    default:
        return state
    }
}
