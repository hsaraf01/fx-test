import React, { Fragment } from "react";
import { Button, Form } from "react-bootstrap";

export default function EvaluationButtons(props) {

    return (
        <>
            <Form.Group>
                <Button className="pl-5 pr-5" variant="primary" type="submit" onClick={props.onPreEvaluationButtonClick} disabled={props.isPreEvalCompleted}>
                    Pre-Evaluation
                </Button>
            </Form.Group>
            <Form.Group>
                <Button className="pl-5 pr-5" variant="primary" type="submit" onClick={props.onPostEvaluationButtonClick}>
                    Post-Evaluation
                </Button>
            </Form.Group>
        </>
    );
}