import React from "react";


export default function Timer(props) {
    const {minutes, seconds} = props;

    return (
        <div>
        { minutes === 0 && seconds === 0
            ? <h1>{`0${minutes}`}:{`0${seconds}`}</h1>
            : <h1> {minutes < 10 ?  `0${minutes}` : minutes}:{seconds < 10 ?  `0${seconds}` : seconds}</h1> 
        }
        </div>
    )

}