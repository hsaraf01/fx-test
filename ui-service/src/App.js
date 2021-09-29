import React, { Component } from 'react';
import { connect } from 'react-redux';
import './App.css';
import { Header } from './component/header';
import { ConnectedLogin } from './component/login';

class App extends Component {

  render() {
    return (
      <div className="container-fluid App">
        <div className="row mb-5">
          <Header />
        </div>
        <div className="row p-2">
        <ConnectedLogin />
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