
const initialState = {
    isPreEvalClicked: false,
    isPostEvalClicked: false,
    isPreEvalCompleted: false,
    preEvalQuestion: [],
    postEvalQuestion: [],
    users: [],
    selectedUser: {},
    title: ""
}

export const reducer = (state = initialState, action) => {
    console.log(action);
    switch (action.type) {
        case "PRE_EVAL_CLICKED":
            return { ...state, isPreEvalClicked: action.payload, isPostEvalClicked: false };
        case "POST_EVAL_CLICKED":
            return { ...state, isPostEvalClicked: action.payload, isPreEvalClicked: false };
        case "PRE_EVAL_COMPLETED":
            return { ...state, isPreEvalCompleted: action.payload, isPostEvalClicked: false, isPreEvalClicked: false };
        case "PRE_EVAL_QUESTIONS":
            return { ...state, preEvalQuestion: action.payload };
        case "POST_EVAL_QUESTIONS":
            return { ...state, postEvalQuestion: action.payload };
        case "POPULATE_USERS":
            return {...state, users: action.payload}    
        case "POPULATE_TITLE":
            return {...state, title: action.payload}    
        case "SELECTED_USER":
            const selectedUser = state.users.find(user => user.name === action.payload);
            return {...state, selectedUser: selectedUser}        
        default:
            return state;
    }
}