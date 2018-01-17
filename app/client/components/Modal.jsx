import React, { Component } from 'react';

import TodoForm from './forms/Todo.jsx';

export default class Modal extends Component{
  componentDidMount(){
    M.Modal.init(document.querySelector('.modal'));
  }
  render(){
    return(
      <div id="todo_modal" className="modal todo">
        <div className="modal-content">
          <h4>Add new Todo item</h4>
          <TodoForm />
        </div>
      </div>
    )
  }
}
