const initialState = {
    name: '',
    phone: '',
    points: 200
}

export default (state = initialState, { type, payload }) => {
    switch (type) {

    case 'a':
        return { ...state, ...payload }

    default:
        return state
    }
}
