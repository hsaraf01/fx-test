import { fetchPostEvalQuestion, fetchPreEvalQuestion } from "../service/async";
import { evalQuestions } from "./actions"

export const preEvalQuestionActionCreator = () => {
    return (dispatch) => {
        fetchPreEvalQuestion().then(response => {
            dispatch(evalQuestions(response));
        })
    }
}

export const postEvalQuestionActionCreator = () => {
    return (dispatch) => {
        fetchPostEvalQuestion().then(response => {
            dispatch(evalQuestions(response));
        })
    }

}