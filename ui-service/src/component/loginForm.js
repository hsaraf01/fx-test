import "react-bootstrap-typeahead/css/Typeahead.css"
import React from "react";
import { Button, Form } from "react-bootstrap";
import { Typeahead } from "react-bootstrap-typeahead";

export default function LoginForm(props) {

    return (
        <Form onSubmit={props.onSubmit}>
            <Form.Group>
                {/* <Form.Control type="name" size="lg" name="name" placeholder="Enter Name" /> */}
                <Typeahead
                    clearButton            
                    id="user"
                    labelKey="name"
                    onInputChange={(text, e) => { console.log(text, e); }}
                    options={props.options}
                    placeholder="Select your name..."
  />
            </Form.Group>
            <Form.Group className="align-self-center">
                <Button variant="primary" type="submit">
                    Go
                </Button>
            </Form.Group>
        </Form>
    );
}