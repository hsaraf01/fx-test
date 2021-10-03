import 'ag-grid-community/dist/styles/ag-grid.css';
import 'ag-grid-community/dist/styles/ag-theme-alpine.css';
import React, { Component } from 'react'
import { AgGridReact } from 'ag-grid-react';
import { connect } from 'react-redux';

class UserGrid extends Component {
    constructor(props) {
        super(props);
        this.state = {
            columnDefs: [
                { headerName: "User", field: "name", sortable: true, filter: true },
                { headerName: "Pre Evaluation", field: "preEvalStatus", sortable: true, filter: true },
                { headerName: "Pre Evaluation Score", field: "preEvalScore", sortable: true, filter: true },
                { headerName: "Post Evaluation", field: "postEvalStatus", sortable: true, filter: true },
                { headerName: "Post Evaluation Score", field: "postEvalScore", sortable: true, filter: true }
            ]            
        }
    }

    render() {
        return (
            <>
                <div className="row">
                    <div className="col-md-9">
                        <div className="card">
                            <div className="card-body position-relative">
                                <div className="ag-theme-alpine" style={{ height: "550px" }}>
                                    <AgGridReact
                                        columnDefs={this.state.columnDefs}
                                        rowData={this.props.adminState.userRecords}
                                    >
                                    </AgGridReact>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </>

        );
    }
}

const mapStateToProps = (state) => {
    return {
        adminState: state.adminReducer,
    }
}

export const ConnectedUserGrid = connect(mapStateToProps)(UserGrid);