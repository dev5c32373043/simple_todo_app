import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Field, reduxForm } from 'redux-form';
import { create as createTodo, update as updateTodo } from '../../actions/TodoList';
import store from '../../store';

class TodoForm extends Component{
  constructor(props){
    super(props)
    this.createTodo = createTodo;
    this.updateTodo = updateTodo;
    this.onSubmit = this.onSubmit.bind(this);
  }
  onSubmit(values){
    store.dispatch(
      this[`${values.action}Todo`]({ todo: values })
    )
  }
  renderField({ input, label, meta: { touched, error } }){
    if(touched && error){
      input.className = input.className + ' invalid';
    }
    return(
      <div className="input-field col s12">
        <input {...input} placeholder={label} type="text" />
        {touched && ((error && <span className='helper-text' data-error={error} />))}
      </div>
    )
  }
  render(){
    const { handleSubmit, submitting, pristine } = this.props;
    return(
      <form onSubmit={handleSubmit(this.onSubmit)}>
        <Field id="title" name='title' label='Title' className='validate' component={this.renderField} />
        <Field id="description" name='description' label='Description' component={this.renderField} />
        <div className="modal-footer">
          <button type='button' onClick={handleSubmit(this.onSubmit)} 
            className="modal-action center waves-effect waves-grey btn-flat" disabled={submitting || pristine}>Submit</button>
        </div>
      </form>
    )
  }
}

const validate = (values)=>{
  let errors = {};
  const regex = /^[A-za-z0-9].{2,}/,
  keys = ['title', 'description'];
  for(let key of keys){
    if(!values[key]){
      errors[key] = `${key} required!`;
    }
    if(!regex.test(values[key])){
      errors[key] = `${key} must begin from letter and greater than or equal three symbols!`
    }
  }
  return errors
}

const todoForm = reduxForm({
  form: 'todo',
  validate,
  enableReinitialize: true
})(TodoForm)

export default connect(store => ({
  initialValues: store.todoState.todo
}))(todoForm);
