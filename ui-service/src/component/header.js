import React, { Fragment } from "react";
import { Badge } from "react-bootstrap";
import { connect } from "react-redux";

export function Header(props) {

    return (
        <>
            <div className="col-1 align-self-start" >
            </div>
            <div className="col-9 mt-4">
                <p className="h1 text-center"><Badge className="badge-secondary ">FX Linear - {props.userState.title}</Badge></p>
            </div>
            <div className="col-2 mt-4">
                {props.userState.selectedUser.name &&
                    <div>Hello <p className="h5">{props.userState.selectedUser.name}</p></div>
                }
            </div>
        </>
    );
}

const mapStateToProps = (state) => {
    return {
        userState: state.reducer,
    }
}

export const ConnectedHeader = connect(mapStateToProps)(Header);
