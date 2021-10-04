import React from "react";
import { connect } from "react-redux";
import EvaluationButtons from "./evaluationButtons";
import { preEvalClicked, postEvalClicked, preEvalCompleted, postEvalCompleted } from "../redux/actions";
import Evaluation from "./evaluation";
import { postEvalQuestionActionCreator, preEvalQuestionActionCreator } from "../redux/actionCreators";
import { submitPostEval, submitPreEval } from "../service/async";
import { POST_TYPE, PRE_TYPE } from "../redux/constants";

export default function Welcome(props) {

    var evalQuestionAnswers = [];

    const onPreEvaluationButtonClick = (event) => {
        event.preventDefault();
        props.dispatch(preEvalClicked(true));
        props.dispatch(preEvalQuestionActionCreator());
    }

    const onPostEvaluationButtonClick = (event) => {
        event.preventDefault();
        props.dispatch(postEvalClicked(true));
        props.dispatch(postEvalQuestionActionCreator());
    }

    const onPreEvaluationSubmitButtonClick = (event) => {
        event.preventDefault();
        const submission = {
            "userId": props.userState.selectedUser.id,
            "questionAnswers": evalQuestionAnswers
        }
        submitPreEval(submission).then(response => props.dispatch(preEvalCompleted(true)))
    }

    const onEvalChange = (event) => {
        const questionAnswer = {
            "questionId": event.target.name,
            "answerId": event.target.value
        }
        evalQuestionAnswers = evalQuestionAnswers.filter(eqa => eqa.questionId !== questionAnswer.questionId);
        evalQuestionAnswers = [
            ...evalQuestionAnswers,
            questionAnswer
        ]
    }

    const onPostEvaluationSubmitButtonClick = (event) => {
        event.preventDefault();
        debugger;
        const submission = {
            "userId": props.userState.selectedUser.id,
            "questionAnswers": evalQuestionAnswers
        }
        submitPostEval(submission).then(response => {
            debugger;
            props.dispatch(postEvalCompleted(true))
        }
        )
    }

    return (
        <div className="container-fluid workspace">
            {((!props.userState.isPreEvalClicked && !props.userState.isPostEvalClicked) || (props.userState.isPreEvalCompleted && props.userState.isPostEvalCompleted)) &&
                <div className="row">
                    <div className="col-11 text-center">
                        <EvaluationButtons
                            onPreEvaluationButtonClick={onPreEvaluationButtonClick}
                            onPostEvaluationButtonClick={onPostEvaluationButtonClick}
                            isPreEvalCompleted={props.userState.isPreEvalCompleted}
                            isPostEvalCompleted={props.userState.isPostEvalCompleted}
                        />
                    </div>
                </div>
            }
            <div className="row">
                {
                    props.userState.isPreEvalClicked && !props.userState.isPreEvalCompleted &&
                    <Evaluation
                        evalQuestions={props.userState.evalQuestions}
                        onEvaluationSubmit={onPreEvaluationSubmitButtonClick}
                        onEvalChange={onEvalChange}
                        type={PRE_TYPE} />
                }
                {
                    props.userState.isPostEvalClicked && !props.userState.isPostEvalCompleted &&
                    <Evaluation
                        evalQuestions={props.userState.evalQuestions}
                        onEvaluationSubmit={onPostEvaluationSubmitButtonClick}
                        onEvalChange={onEvalChange}
                        type={POST_TYPE} />
                }
            </div>
        </div>
    );
}

const mapStateToProps = (state) => {
    return {
        userState: state.reducer,
    }
}

export const ConnectedWelcome = connect(mapStateToProps)(Welcome);