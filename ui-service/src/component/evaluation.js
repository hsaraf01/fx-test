import React, { Fragment, useState } from "react";
import { Button, Form } from "react-bootstrap";
import Timer from "./timer";

export default function Evaluation(props) {

    const [disableButton, setDisableButton] = useState(false);

    return (
        <>
        <div className="col-10">
            <form onSubmit={props.onEvaluationSubmit}>
                {props.evalQuestions.map((item, index) => {
                    return (<Form.Group className="mt-2 ml-5" key={item.id}>
                        <h3><span className="badge badge-info w-11" >{item.question}</span></h3>                        
                        {item.options.map((opt, index) => (
                                <div className="form-check" key={opt.id}>
                                    <input className="form-check-input" type="radio" name= {item.id} value={opt.id} onChange={props.onEvalChange}/>
                                    <label className="form-check-label font-weight-bold">
                                        {opt.option}
                                    </label>
                                </div>
                            )
                        )}
                    </Form.Group >)
                })}
                <Form.Group className="mt-2 ml-5">
                    <Button variant="dark" type="submit" disabled={disableButton}>
                        Submit
                    </Button>
                </Form.Group>
            </form>
            </div>
            <div className="col-2">
                  <Timer initialMinute="1" setDisableButton={setDisableButton}/>  
            </div>
        </>
    );

}