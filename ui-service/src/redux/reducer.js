import { EVAL_QUESTIONS, POPULATE_TITLE, POPULATE_USERS, POST_EVAL_CLICKED, POST_EVAL_COMPLETED, PRE_EVAL_CLICKED, PRE_EVAL_COMPLETED, SELECTED_USER } from "./constants";

const initialState = {
    isPreEvalClicked: false,
    isPostEvalClicked: false,
    isPreEvalCompleted: false,
    isPostEvalCompleted: false,
    evalQuestions: [],
    users: [],
    selectedUser: {},
    title: ""
}

export const reducer = (state = initialState, action) => {

    switch (action.type) {
        case PRE_EVAL_CLICKED:
            return { ...state, isPreEvalClicked: action.payload, isPostEvalClicked: false };
        case POST_EVAL_CLICKED:
            return { ...state, isPostEvalClicked: action.payload, isPreEvalClicked: false };
        case PRE_EVAL_COMPLETED:
            return { ...state, isPreEvalCompleted: action.payload, isPostEvalClicked: false, isPreEvalClicked: false };
        case POST_EVAL_COMPLETED:
            return { ...state, isPostEvalCompleted: action.payload, isPreEvalCompleted: true, isPreEvalClicked: false, isPostEvalClicked: false };
        case EVAL_QUESTIONS:
            return { ...state, evalQuestions: action.payload };
        case POPULATE_USERS:
            return { ...state, users: action.payload }
        case POPULATE_TITLE:
            return { ...state, title: action.payload }
        case SELECTED_USER:
            const selectedUser = state.users.find(user => user.name === action.payload);
            return { ...state, selectedUser: selectedUser }
        default:
            return state;
    }
}