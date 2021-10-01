import React, { Component } from "react";
import { connect } from "react-redux";
import { fetchTitle, fetchUsers, sse } from "../async";
import { populateTitle, populateUsers } from "../redux/actions";

class Admin extends Component {


    componentDidMount() {
        const titleResponse = fetchTitle();
        const usersResponse = fetchUsers();
        usersResponse.then(response => this.props.dispatch(populateUsers(response)))
        titleResponse.then(response => this.props.dispatch(populateTitle(response))) 
        sse()       
    }

    render() {
        return (
            <div>
                <h1>Admin Page</h1>
            </div>
        );
    }
}

const mapStateToProps = (state) => {
    return {
        state: state
    }
}

export const ConnectedAdmin = connect(mapStateToProps)(Admin);
