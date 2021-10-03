import React, { Component } from "react";
import { connect } from "react-redux";
import { fetchTitle, fetchUsers } from "../../service/async";
import { populateTitle, populateUsers, selectedAdminUser } from "../../redux/actions";
import { connectServerAsync } from "../../service/serverSentEvent";
import { ConnectedUserGrid } from "./grid";

class Admin extends Component {


    componentDidMount() {
        fetchUsers().then(response => this.props.dispatch(populateUsers(response)))
        fetchTitle().then(response => this.props.dispatch(populateTitle(response))) 
        this.props.dispatch(selectedAdminUser({
            "id": "0001",
            "name": "Admin"
        }))  
        connectServerAsync()            
    }

    render() {
        return (
            <div className="container-fluid">
                <ConnectedUserGrid />
            </div>
        );
    }
}

const mapStateToProps = (state) => {
    return {
        userState: state.reducer,
        adminState : state.adminReducer
    }
}

export const ConnectedAdmin = connect(mapStateToProps)(Admin);
