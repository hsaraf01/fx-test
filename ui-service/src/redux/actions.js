import { EVAL_QUESTIONS, POPULATE_TITLE, POPULATE_USERS, POST_EVAL_CLICKED, POST_EVAL_COMPLETED, POST_EVAL_SCORE, PRE_EVAL_CLICKED, PRE_EVAL_COMPLETED, PRE_EVAL_SCORE, SELECTED_ADMIN_USER, SELECTED_USER, USER_LOGGED_IN } from "./constants"

export const preEvalClicked = (payload) => ({
    type: PRE_EVAL_CLICKED,
    payload
})

export const postEvalClicked = (payload) => ({
    type: POST_EVAL_CLICKED,
    payload
})

export const evalQuestions = (payload) => ({
    type: EVAL_QUESTIONS,
    payload
})


export const preEvalCompleted = (payload) => ({
    type: PRE_EVAL_COMPLETED,
    payload
})

export const postEvalCompleted = (payload) => ({
    type: POST_EVAL_COMPLETED,
    payload
})

export const populateUsers = (payload) => ({
    type: POPULATE_USERS,
    payload
})

export const selectedUser = (payload) => ({
    type: SELECTED_USER,
    payload
})

export const populateTitle = (payload) => ({
    type: POPULATE_TITLE,
    payload
})

export const userLoggedIn = (payload) => ({
    type: USER_LOGGED_IN,
    payload
})

export const preEvalScore = (payload) => ({
    type: PRE_EVAL_SCORE,
    payload
})

export const postEvalScore = (payload) => ({
    type: POST_EVAL_SCORE,
    payload
})

export const selectedAdminUser = (payload) => ({
    type: SELECTED_ADMIN_USER,
    payload
})

