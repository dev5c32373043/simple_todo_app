import React, { Component } from 'react';
import Moment from 'moment';

export default class TodoItem extends Component{
  constructor(props){
    super(props)
    this.onClickEdit = this.onClickEdit.bind(this);
    this.onClickDelete = this.onClickDelete.bind(this);
  }
  onClickEdit(){
    const todo = Object.assign({}, this.props.todo, {
      action: 'update'
    })
    this.props.showModal(todo)
  }
  onClickDelete(e){
    const id = e.target.parentElement.dataset.id;
    this.props.removeTodo(id)
  }
  render(){
    const { todo } = this.props;
    return(
        <div className="col s12 m3">
          <div className="card blue-grey darken-1">
            <div data-id={todo._id} className="card-content white-text">
              <i onClick={this.onClickEdit} className='material-icons edit'>edit</i>
              <i onClick={this.onClickDelete} className='material-icons delete'>clear</i>
              <span className="card-title">{todo.title}</span>
              <p>{todo.description}</p>
            </div>
            <div className="card-action">
              {Moment(todo.createdAt).fromNow()}
            </div>
          </div>
        </div>
    )
  }
}
