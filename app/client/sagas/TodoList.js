import { GET_TODOS, CREATE_TODO, UPDATE_TODO, REMOVE_TODO, SHOW_MODAL, FILTER } from '../constants/TodoList';

import { put, call, takeEvery, select } from 'redux-saga/effects';
import { reset } from 'redux-form';

import * as actions from '../actions/TodoList';
import * as api from '../api/TodoList';

const closeModal = ()=>{
  const modal = document.getElementById('todo_modal');
  M.Modal.getInstance(modal).close()
}

export function* updateFilterData(){
  const todoState = yield select((store)=> store.todoState);
  if(Object.keys(todoState.filterParams).length){
    yield put(actions.filter({}))
  }
}

const createTodo = async (action, storeTodos)=>{
  const json = await api.create(action.todo);
  closeModal()
  let todos = [...storeTodos]
  todos.unshift(json.todo);
  return todos;
}

const changeTodo = async (action, storeTodos)=>{
  const json = await api.update(action.todo);
  closeModal()
  let todos = [...storeTodos], index;
  let filtredTodos = todos.filter((todo, i)=> {
    if(todo._id != action.todo._id){
      return true;
    }else{
      index = i;
    }
  })
  filtredTodos.splice(index, 0, json.todo);
  return filtredTodos;
}

const removeTodo = async (action, storeTodos)=>{
  const resp = await api.remove(action.id);
  if(resp.status == 200){
    return storeTodos.filter((todo)=> todo._id != action.id);
  }
}

export function* getTodos(){
  if(navigator.cookieEnabled){
    const todos = yield call(api.get);
    yield put(actions.todosReceived({
      todos: todos,
      dataReceived: true
    }))
  }else{
     M.toast({html: 'I need yours cookies', displayLength: 10000})
  }
}

export function* addTodo(action){
  if(navigator.cookieEnabled){
    const storeTodos = yield select((store)=> store.todoState.todos);
    const todos = yield call(createTodo, action, storeTodos)
    yield put(reset('todo'))
    yield put(actions.todoCreated({
      todos: todos,
      dataReceived: true
    }))
    yield updateFilterData()
  }else{
     M.toast({html: 'I need yours cookies', displayLength: 10000})
  }
}

export function* updateTodo(action){
  const storeTodos = yield select((store)=> store.todoState.todos);
  const todos = yield call(changeTodo, action, storeTodos)
  yield put(actions.todoUpdated({
    todos: todos,
    dataReceived: true
  }))
  yield updateFilterData()
}

export function* deleteTodo(action){
  const storeTodos = yield select((store)=> store.todoState.todos);
  const todos = yield call(removeTodo, action, storeTodos)
  yield put(actions.todoRemoved({
    todos: todos
  }))
  yield updateFilterData()
}

export function* showModal(action){
  yield put(actions.syncModal(action.todo))
  const modal = document.getElementById('todo_modal');
  M.Modal.getInstance(modal).open();
}

export function* filter(action){
  const todoState = yield select((store)=> store.todoState),
  paramsKeys = Object.keys(Object.assign({}, action.filterParams, todoState.filterParams));
  let filtredTodos = [...todoState.todos];
  paramsKeys.map((key)=>{
    if(key == 'title'){
      let isIncludeParams = Object.keys(action.filterParams).includes('title');
      let value = (isIncludeParams ? action.filterParams[key] : todoState.filterParams[key]);
      filtredTodos = filtredTodos.filter((todo)=>{
        return todo.title.includes(value)
      })
    }else if(key == 'createdAt'){
      let isIncludeParams = Object.keys(action.filterParams).includes('createdAt');
      let value = (isIncludeParams ? action.filterParams[key] : todoState.filterParams[key]);
      filtredTodos = filtredTodos.filter((todo)=>{
        return (new Date(todo.createdAt) >= (value.length ? new Date(value) : value))
      })
    }
  })
  yield put(actions.applyFilter({
    filtredTodos: filtredTodos,
    filterParams: action.filterParams
  }))
}

export default function* todoSaga(){
  yield takeEvery(GET_TODOS, getTodos)
  yield takeEvery(CREATE_TODO, addTodo)
  yield takeEvery(UPDATE_TODO, updateTodo)
  yield takeEvery(REMOVE_TODO, deleteTodo)
  yield takeEvery(SHOW_MODAL, showModal)
  yield takeEvery(FILTER, filter)
}
