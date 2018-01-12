import React, { Component } from 'react';
import { connect } from 'react-redux';
import * as actions from '../actions/TodoList';

import TodoList from '../components/TodoList.jsx';

class TodoListContainer extends Component{
  componentWillMount(){
    if(!this.props.dataReceived){
      this.props.getTodos()
    }
  }
  render(){
    return <TodoList {...this.props} />
  }
}

const mapStateToProps = (store)=>({
  todos: store.todoState.todos,
  filterParams: store.todoState.filterParams,
  filtredTodos: store.todoState.filtredTodos,
  dataReceived: store.todoState.dataReceived
})

const mapDispatchToProps = (dispatch)=>({
  getTodos(){
    dispatch(actions.get())
  },
  removeTodo(id){
    dispatch(actions.remove(id))
  },
  showModal(todo){
    dispatch(actions.showModal(todo))
  }
})

export default connect(mapStateToProps, mapDispatchToProps)(TodoListContainer)
