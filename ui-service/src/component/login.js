import React, { Component, Fragment } from "react";
import { connect } from "react-redux";
import { nameEntered } from "../redux/actions";
import LoginForm from "./loginForm";
import Welcome from "./welcome";

class Login extends Component {

    onSubmit = (event) => {
        event.preventDefault();
        this.props.dispatch(nameEntered(event.target.name.value))
    }

    render() {
        return (
            <>
                <div className="container-fluid workspace">
                    <div className="row">
                        <div className="col-3">
                        </div>
                        <div className="col-5">
                            {!this.props.state.name &&
                                <LoginForm onSubmit={this.onSubmit} />
                            }
                        </div>
                        <div className="col-4"></div>
                    </div>
                    <div className="row">
                        {this.props.state.name &&
                            <Welcome name={this.props.state.name} />
                        }
                    </div>
                </div>

            </>
        );
    }

}
const mapStateToProps = (state) => {
    return {
        state: state
    }
}

export const ConnectedLogin = connect(mapStateToProps)(Login);
