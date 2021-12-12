import React, { Component, Fragment } from "react";
import { connect } from "react-redux";
import { fetchActiveEvaluation, fetchTitle, fetchUsers, userLoggedInRequest } from "../service/async";
import { selectedUser, populateUsers, populateTitle, setActiveEvaluation } from "../redux/actions";
import LoginForm from "./loginForm";
import { ConnectedWelcome } from "./welcome";

class Login extends Component {

    onSubmit = (event) => {
        event.preventDefault();
        this.props.dispatch(selectedUser(event.target[0].value))
        setTimeout(() => {
            userLoggedInRequest(this.props.userState.selectedUser);
        }, 5)

    }

    componentDidMount() {
        fetchUsers().then(response => this.props.dispatch(populateUsers(response)))
        fetchTitle().then(response => this.props.dispatch(populateTitle(response)))
        fetchActiveEvaluation().then(response => this.props.dispatch(setActiveEvaluation(response)))
    }

    render() {
        const userName = this.props.userState.selectedUser.name;
        return (
            <>
                <div className="container-fluid workspace">
                    <div className="row">
                        <div className="col-3">
                        </div>
                        <div className="col-5">
                            {!userName &&
                                <LoginForm onSubmit={this.onSubmit} options={this.props.userState.users} />
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
        userState: state.reducer,
    }
}

export const ConnectedLogin = connect(mapStateToProps)(Login);
