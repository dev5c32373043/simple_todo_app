import { GET_TODOS, TODOS_RECEIVED, CREATE_TODO,
         TODO_CREATED, UPDATE_TODO, TODO_UPDATED,
         REMOVE_TODO, TODO_REMOVED, SYNC_MODAL,
         SHOW_MODAL, FILTER, APPLY_FILTER } from '../constants/TodoList';

export const get = ()=>({
  type: GET_TODOS
})

export const todosReceived = (payload)=>({
  type: TODOS_RECEIVED,
  todos: payload.todos,
  dataReceived: payload.dataReceived
})

export const create = (payload)=>({
  type: CREATE_TODO,
  todo: payload.todo
})

export const todoCreated = (payload)=>({
  type: TODO_CREATED,
  todos: payload.todos,
  dataReceived: payload.dataReceived
})

export const update = (payload)=>({
  type: UPDATE_TODO,
  todo: payload.todo
})

export const todoUpdated = (payload)=>({
  type: TODO_UPDATED,
  todos: payload.todos,
  dataReceived: payload.dataReceived
})

export const remove = (id)=>({
  type: REMOVE_TODO,
  id: id
})

export const todoRemoved = (payload)=>({
  type: TODO_REMOVED,
  todos: payload.todos
})

export const showModal = (todo)=>({
  type: SHOW_MODAL,
  todo: todo
})

export const syncModal = (todo)=>({
  type: SYNC_MODAL,
  todo: todo
})

export const filter = (params)=>({
  type: FILTER,
  filterParams: params
})

export const applyFilter = (payload)=>({
  type: APPLY_FILTER,
  filtredTodos: payload.filtredTodos,
  filterParams: payload.filterParams
})
