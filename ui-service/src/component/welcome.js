import React from "react";
import { connect } from "react-redux";
import EvaluationButtons from "./evaluationButtons";
import { preEvalClicked, postEvalClicked, preEvalCompleted } from "../redux/actions";
import PreEvaluation from "./preEvaluation";
import PostEvaluation from "./postEvaluation";
import { postEvalQuestionActionCreator, preEvalQuestionActionCreator } from "../redux/actionCreators";

export default function Welcome(props) {

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
        console.log(event.target.elements)
        props.dispatch(preEvalCompleted(true));
    }

    const onPostEvaluationSubmitButtonClick = (event) => {
        event.preventDefault();
        
    }

    return (
        <div className="container-fluid workspace">
            {((!props.state.isPreEvalClicked && !props.state.isPostEvalClicked) || props.state.isPreEvalCompleted) &&
                <div className="row">
                    <div className="col-5" />
                    <div className="col-5">
                        <EvaluationButtons
                            onPreEvaluationButtonClick={onPreEvaluationButtonClick}
                            onPostEvaluationButtonClick={onPostEvaluationButtonClick}
                            isPreEvalCompleted={props.state.isPreEvalCompleted} />
                    </div>
                    <div className="col-2" />
                </div>
            }
            <div className="row">
                {
                    props.state.isPreEvalClicked && !props.state.isPreEvalCompleted &&  
                    <PreEvaluation preEvalQuestion={props.state.preEvalQuestion} onPreEvaluationSubmitButtonClick= {onPreEvaluationSubmitButtonClick}/>
                }
                {
                    props.state.isPostEvalClicked &&
                    <PostEvaluation postEvalQuestion={props.state.postEvalQuestion} onPostEvaluationSubmitButtonClick={onPostEvaluationSubmitButtonClick} />
                }
            </div>
        </div>
    );
}

const mapStateToProps = (state) => {
    return {
        state: state
    }
}

export const ConnectedWelcome = connect(mapStateToProps)(Welcome);