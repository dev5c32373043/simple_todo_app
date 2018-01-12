import React, { Component } from 'react';

import PaginationContainer from '../containers/Pagination.jsx';
import TodoItem from './TodoItem.jsx';
import Loader   from './Loader.jsx';

export default class TodoList extends Component{
  constructor(props){
    super(props)
    this.renderItems = this.renderItems.bind(this);
  }
  renderItems(data){
    let result = [];
    const { dataReceived, showModal, removeTodo } = this.props;
    if(dataReceived){
      for(let todo of data){
        result.push(
          <TodoItem
            key={todo._id}
            showModal={showModal}
            removeTodo={removeTodo}
            todo={todo} />
          )
      }
      return result;
    }else{
      return <Loader />
    }
  }
  render(){
    const { todos, filterParams, filtredTodos } = this.props;
    const data = (Object.keys(filterParams).length ? filtredTodos : todos);
    return(
      <div className='row'>
        <PaginationContainer limit={10} maxPage={data.length} data={data} renderItems={this.renderItems} />
      </div>
    )
  }
}
