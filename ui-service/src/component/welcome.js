import React, { Fragment } from "react";
import { Button, Form } from "react-bootstrap";

export default function Welcome(props) {

    return (
        <>
            <div className="col-5">
                Hello <span className="h5">{props.name}</span>
            </div>
            <div className="col-5 p-5">
                <Form.Group>
                    <Button className="pl-5 pr-5" variant="primary" type="submit" onClick={props.onSubmit}>
                        Pre-Evaluation
                    </Button>
                </Form.Group>
                <Form.Group>
                    <Button  className="pl-5 pr-5" variant="primary" type="submit" onClick={props.onSubmit}>
                        Post-Evaluation
                    </Button>
                </Form.Group>
            </div>
            <div className="col-2">

            </div>
        </>
    );
}
