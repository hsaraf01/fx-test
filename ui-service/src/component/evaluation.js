import React, { Fragment, useEffect, useState } from "react";
import { Button, Form } from "react-bootstrap";
import Timer from "./timer";

export default function Evaluation(props) {

    const MINS = "mins"
    const SECS = "secs"
    const saveToLocalStorage = (key, value) => localStorage.setItem(key, value);
    const loadFromLocalStorage = (key) => localStorage.getItem(key);
    const storedMins = loadFromLocalStorage(MINS);
    const storedSecs = loadFromLocalStorage(SECS);   
    const initialMinute = (storedMins === "undefined" || storedMins === "null" || !storedMins )  ? 10 : storedMins;
    const initialSeconds = (storedSecs === "undefined" || storedSecs === "null"  || !storedSecs) ? 0 : storedSecs;
	const [disableButton, setDisableButton] = useState(false);
    const [minutes, setMinutes] = useState(initialMinute);
    const [seconds, setSeconds] = useState(initialSeconds);

    useEffect(() => {
        let myInterval = setInterval(() => {
            let changedMins = minutes;
            let changedSecs = seconds;
            if (seconds > 0) {
                changedSecs = seconds - 1
            }
            if (seconds === 0) {
                if (minutes === 0) {
                    clearInterval(myInterval)
                    props.setDisableButton(true);
                } else {
                    changedMins = minutes - 1
                    changedSecs = 59
                }
            }
            saveToLocalStorage(MINS, changedMins);
            saveToLocalStorage(SECS, changedSecs);
            setMinutes(changedMins);
            setSeconds(changedSecs);
        }, 1000)
        return () => {
            clearInterval(myInterval);
        };
    });

    return (
        <>
            <div className="col-10">
                <form onSubmit={props.onEvaluationSubmit}>
                    {props.evalQuestions.map((item, index) => {
                        return (<Form.Group className="mt-2 ml-5" key={item.id}>
                            <h3><span className="badge badge-info w-11" >{item.question}</span></h3>
                            {item.options.map((opt, index) => (
                                <div className="form-check" key={opt.id}>
                                    <input className="form-check-input" type="radio" name={item.id} value={opt.id} onChange={props.onEvalChange} />
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
                <Timer minutes={minutes} seconds={seconds} setDisableButton={setDisableButton} />
            </div>
        </>
    );

}