import React, { Component } from 'react';
import { connect } from 'react-redux';
import './App.css';
import { ConnectedHeader } from './component/header';
import { ConnectedLogin } from './component/login';
import { Switch, Route } from 'react-router';
import { ConnectedAdmin } from './component/admin/admin';

class App extends Component {

  render() {
    return (
      <div className="container-fluid App">
        <div className="row mb-5">
          <ConnectedHeader />
        </div>
        <div className="row p-2">
          <Switch>
            <Route exact path="/admin" component={ConnectedAdmin} />
            <Route path="/" component={ConnectedLogin} />
          </Switch>
        </div>
      </div >

    )
  }
}

const mapStateToProps = (state) => {
  return {
    state: state
  }
}

export const ConnectedApp = connect(mapStateToProps)(App);