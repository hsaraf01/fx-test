import { fetchPostEvalQuestion, fetchPreEvalQuestion } from "../async";
import { postEvalQuestions, preEvalQuestions } from "./actions"

export const preEvalQuestionActionCreator = () => {
    return (dispatch) => {
        fetchPreEvalQuestion().then(response => {
            dispatch(preEvalQuestions(response));
        })
    }
}

export const postEvalQuestionActionCreator = () => {
    return (dispatch) => {
        fetchPostEvalQuestion().then(response => {
            dispatch(postEvalQuestions(response));
        })
    }

}