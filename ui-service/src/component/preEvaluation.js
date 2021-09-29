import React, { Fragment } from "react";
import { Button, Form } from "react-bootstrap";

export default function PreEvaluation(props) {
    return (
        <>
            <form onSubmit={props.onPreEvaluationSubmitButtonClick}>
                {props.preEvalQuestion.map((item, index) => {
                    const radioId= "question"+index;
                    return (<Form.Group className="mt-2 ml-5">
                        <h1><span className="badge badge-info w-11" >{item.question}</span></h1>                        
                        {item.options.map((opt, index) => (
                                <div className="form-check">
                                    <input className="form-check-input" type="radio" name= {radioId} value={opt} />
                                    <label className="form-check-label font-weight-bold">
                                        {opt}
                                    </label>
                                </div>
                            )
                        )}
                    </Form.Group >)
                })}
                <Form.Group className="mt-2 ml-5">
                    <Button variant="primary" type="submit">
                        Go
                    </Button>
                </Form.Group>
            </form>
        </>
    );

}