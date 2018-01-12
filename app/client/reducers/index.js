import { combineReducers } from 'redux';
import { reducer as formReducer } from 'redux-form';
import TodoListReducer from './TodoList';
import PaginationReducer from './Pagination';

export default combineReducers({
  todoState: TodoListReducer,
  paginationState: PaginationReducer,
  form: formReducer
})
