import React, { Component } from 'react';
import { BrowserRouter, Switch, Route } from 'react-router-dom';

import Main from './pages/Main.jsx';
import NotFound from './pages/error/NotFound.jsx';

export default class Router extends Component{
  constructor(props){
    super(props)
  }
  render(){
    return(
      <BrowserRouter>
        <Switch>
          <Route exact path='/' component={Main} />
          <Route component={NotFound} />
        </Switch>
      </BrowserRouter>
    )
  }
}
