import React, { Component } from "react";
import { connect } from "react-redux";
import { fetchActiveEvaluation, fetchTitle, fetchTitles, fetchUsers, submitActiveEvaluation, submitActiveTitle } from "../../service/async";
import { populateTitle, populateTitles, populateUsers, selectedAdminUser, setActiveEvaluation } from "../../redux/actions";
import { connectServerAsync } from "../../service/serverSentEvent";
import { ConnectedUserGrid } from "./grid";
import TitleForm from "./titleForm";
import ActiveEvaluation from "./activeEvaluation";
import { PostEvaluation, PreEvaluation } from "../../redux/constants";

class Admin extends Component {


    componentDidMount() {
        fetchUsers().then(response => this.props.dispatch(populateUsers(response)))
        fetchTitle().then(response => this.props.dispatch(populateTitle(response))) 
        fetchTitles().then(response => this.props.dispatch(populateTitles(response)))
        fetchActiveEvaluation().then(response => this.props.dispatch(setActiveEvaluation(response)))
        this.props.dispatch(selectedAdminUser({
            "id": "0001",
            "name": "Admin"
        }))  
        connectServerAsync()            
    }

    onSubmitActiveTopic = (event) => {
        event.preventDefault();
        let titleName = event.target[0].value;
        let title = this.props.userState.titles.find(t => t.title === titleName)
        submitActiveTitle(title).then(response => {
            this.props.dispatch(populateTitle(titleName))
        })
    }

    onSubmitActiveEvaluation = (event) => {
        event.preventDefault();
        let activeEvaluation = event.target[0].value;
        console.log(activeEvaluation)
        submitActiveEvaluation(activeEvaluation).then(response => {
            this.props.dispatch(setActiveEvaluation(activeEvaluation))
        })
    }

    render() {
        const evaluation = [
            {
                "name": PreEvaluation
            },
            {
                "name": PostEvaluation
            }
        ]
            
        return (
            <div className="container-fluid">
                <div className="row">
                    <div className="col-3 mt-2">
                        <TitleForm onSubmit={this.onSubmitActiveTopic} options={this.props.userState.titles} />
                    </div>
                    <div className="col-3 mt-2">
                        <ActiveEvaluation onSubmit={this.onSubmitActiveEvaluation} options={evaluation} />
                    </div>
                    <div className="col-3 mt-2">
                       Active Evaluation : <b>{this.props.userState.activeEvaluation}</b>                        
                    </div>
                </div>
                <div className="row">
                    <div className="col-12">
                        <ConnectedUserGrid />
                    </div>
                </div>

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
