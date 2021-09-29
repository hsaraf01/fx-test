import React from "react";
import { Button, Form } from "react-bootstrap";

export default function LoginForm(props) {

    return (
        <Form onSubmit={props.onSubmit}>
            <Form.Group>
                <Form.Control type="name" size="lg" name="name" placeholder="Enter Name" />
            </Form.Group>
            <Form.Group className="align-self-center">
                <Button variant="primary" type="submit">
                    Go
                </Button>
            </Form.Group>
        </Form>
    );
}