
const initialState = {
    name: ""
}

export const reducer = (state = initialState, action) => {
    switch (action.type) {
        case "NAME_ENTERED":
            return { ...state, name: action.payload };
        default:
            return state;
    }
}