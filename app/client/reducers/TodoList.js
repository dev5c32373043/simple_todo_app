import { TODOS_RECEIVED, TODO_CREATED, TODO_UPDATED, TODO_REMOVED, SYNC_MODAL, APPLY_FILTER } from '../constants/TodoList';

const initState = {
  todos: [],
  todo: {},
  filterParams: {},
  filtredTodos: [],
  dataReceived: false
}

export default (state = initState, action)=>{
  switch (action.type) {
    case TODOS_RECEIVED:
      return Object.assign({}, state, {
        todos: action.todos,
        dataReceived: action.dataReceived
      })
    case TODO_CREATED:
      return Object.assign({}, state, {
        todos: action.todos,
        dataReceived: action.dataReceived
      })
    case TODO_UPDATED:
      return Object.assign({}, state, {
        todos: action.todos,
        dataReceived: action.dataReceived
      })
    case TODO_REMOVED:
      return Object.assign({}, state, {
        todos: action.todos
      })
    case SYNC_MODAL:
      return Object.assign({}, state, {
        todo: action.todo
      })
    case APPLY_FILTER:
      return Object.assign({}, state, {
        filtredTodos: action.filtredTodos,
        filterParams: Object.assign({}, state.filterParams, action.filterParams)
      })
    default:
      return state;
  }
}
