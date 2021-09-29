import React, { Fragment } from "react";
import { Badge } from "react-bootstrap";
import { connect } from "react-redux";

export function Header(props) {

    return (
        <>
            <div className="col-1 align-self-start" >

            </div>
            <div className="col-9 align-self-center mt-4">
                <p className="h1 text-center"><Badge className="bg-light ">FX Test</Badge></p>
            </div>
            <div className="col-2 mt-4">
                {props.state.name &&
                    <div>Hello <p className="h5">{props.state.name}</p></div>
                }
            </div>
        </>
    );
}

const mapStateToProps = (state) => {
    return {
        state: state
    }
}

export const ConnectedHeader = connect(mapStateToProps)(Header);
