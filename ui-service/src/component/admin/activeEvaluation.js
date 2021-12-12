import "react-bootstrap-typeahead/css/Typeahead.css"
import React from "react";
import { Button, Form } from "react-bootstrap";
import { Typeahead } from "react-bootstrap-typeahead";

export default function ActiveEvaluation(props) {

    return (
        <Form onSubmit={props.onSubmit}>
            <Form.Group>
                <Typeahead
                    clearButton
                    id="id"
                    labelKey="name"
                    onInputChange={(text, e) => { console.log(text, e); }}
                    options={props.options}
                    placeholder="Select evaluation..."
  />

            </Form.Group>
            <Form.Group className="align-self-center">
                <Button variant="primary" type="submit">
                    Set Active
                </Button>
            </Form.Group>
        </Form>
    );
}