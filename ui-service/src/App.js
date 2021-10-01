import React, { Component } from 'react';
import { connect } from 'react-redux';
import './App.css';
import { ConnectedHeader } from './component/header';
import { ConnectedLogin } from './component/login';
import { Switch, Route } from 'react-router';
import { ConnectedAdmin } from './component/admin';

class App extends Component {

  render() {
    return (
      <div className="container-fluid App">
        <div className="row mb-5">
          <ConnectedHeader />
        </div>
        <Switch>
          <Route exact path="/admin">
            <div className="row p-2">
              <ConnectedAdmin />
            </div>
          </Route>
          <Route path="/">
            <div className="row p-2">
              <ConnectedLogin />
            </div>
          </Route>
        </Switch>
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