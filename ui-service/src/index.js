import 'bootstrap/dist/css/bootstrap.min.css';
import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';
import { BrowserRouter } from 'react-router-dom';
import { ConnectedApp } from './App';
import { store } from './redux/store'


ReactDOM.render(
  <Provider store={store}>
    <BrowserRouter>
      <ConnectedApp />
    </BrowserRouter>
  </Provider>,
  document.getElementById('root')
);


