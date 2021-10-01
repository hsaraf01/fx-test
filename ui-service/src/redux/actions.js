
export const preEvalClicked = (isClicked) => {
    return {
        type:"PRE_EVAL_CLICKED",
        payload: isClicked
    }
}

export const postEvalClicked = (isClicked) => {
    return {
        type:"POST_EVAL_CLICKED",
        payload: isClicked
    }
}

export const preEvalQuestions = (questions) => {
    return {
        type:"PRE_EVAL_QUESTIONS",
        payload: questions
    }
}

export const postEvalQuestions = (questions) => {
    return {
        type:"POST_EVAL_QUESTIONS",
        payload: questions
    }
}

export const preEvalCompleted = (isCompleted) => {
    return {
        type:"PRE_EVAL_COMPLETED",
        payload: isCompleted
    }
}

export const populateUsers = (users) => {
    return {
        type:"POPULATE_USERS",
        payload: users
    }
}

export const selectedUser = (userName) => {
    return {
        type:"SELECTED_USER",
        payload: userName
    }
}

export const populateTitle = (title) => {
    return {
        type:"POPULATE_TITLE",
        payload: title
    }
}