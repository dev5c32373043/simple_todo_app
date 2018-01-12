import React, { Component, Fragment } from 'react';

import TodoListContainer from '../containers/TodoList.jsx';
import Header from '../components/Header.jsx';
import SideNav from '../components/SideNav.jsx';
import Modal from '../components/Modal.jsx';
import { showModal } from '../actions/TodoList';
import store from '../store';

import 'materialize-css/dist/js/materialize.min.js';

export default class Main extends Component{
  constructor(props){
    super(props)
    this.onClickCreate = this.onClickCreate.bind(this);
  }
  onClickCreate(){
    store.dispatch(showModal({ action: 'create' }))
  }
  render(){
    return(
      <Fragment>
        <Header />
        <SideNav />
        <TodoListContainer />
        <a onClick={this.onClickCreate} className="btn-floating btn-large grey darken-4 pulse create-btn">
          <i className="material-icons">create</i>
        </a>
        <Modal />
      </Fragment>
    )
  }
}
