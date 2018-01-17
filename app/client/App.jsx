import React, { Component } from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';

import Router from './Router.jsx';
import store from './store';

class App extends Component{
  render(){
    return <Main />
  }
}

ReactDOM.render(
  <Provider store={store}>
    <Router />
  </Provider>,
  document.getElementById('root')
)
