import 'bootstrap/dist/css/bootstrap.min.css';
import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';
import { ConnectedApp } from './App';
import { store } from './redux/store'


ReactDOM.render(
  <Provider store={store}>
      <ConnectedApp />
  </Provider>,    
  document.getElementById('root')
);


