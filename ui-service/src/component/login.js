import React, { Component, Fragment } from "react";
import { connect } from "react-redux";
import { fetchTitle, fetchUsers } from "../async";
import { selectedUser, populateUsers, populateTitle } from "../redux/actions";
import LoginForm from "./loginForm";
import {ConnectedWelcome} from "./welcome";

class Login extends Component {

    onSubmit = (event) => {
        event.preventDefault();
        this.props.dispatch(selectedUser(event.target[0].value))
    }

    componentDidMount() {
        const titleResponse = fetchTitle();
        const usersResponse = fetchUsers();
        usersResponse.then(response => this.props.dispatch(populateUsers(response)))
        titleResponse.then(response => this.props.dispatch(populateTitle(response)))
    }

    render() {
        const userName = this.props.state.selectedUser.name;
        return (
            <>
                <div className="container-fluid workspace">
                    <div className="row">
                        <div className="col-3">
                        </div>
                        <div className="col-5">
                            {!userName &&
                                <LoginForm onSubmit={this.onSubmit} options={this.props.state.users} />
                            }
                        </div>
                        <div className="col-4"></div>
                    </div>
                    <div className="row">
                        {userName &&
                            <ConnectedWelcome />
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
