import React, {Fragment} from "react";
import { Badge } from "react-bootstrap";

export function Header () {

    return (
        <>
        <div className="col-1 align-self-start" >
          
        </div>
        <div className="col-10 align-self-center mt-4">
            <p className="h1 text-center"><Badge className="bg-light ">FX Test</Badge></p>
        </div>
        </>
    );
}