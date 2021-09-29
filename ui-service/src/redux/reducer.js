
const initialState = {
    name: "",
    isPreEvalClicked: false,
    isPostEvalClicked: false,
    isPreEvalCompleted: false,
    preEvalQuestion: [],
    postEvalQuestion: []
}

export const reducer = (state = initialState, action) => {
    console.log(action);
    switch (action.type) {
        case "NAME_ENTERED":
            return { ...state, name: action.payload };
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
        default:
            return state;
    }
}