import { all } from 'redux-saga/effects';

import todoSaga from './TodoList';
import paginationSaga from './Pagination';

export default function* rootSaga(){
  yield all([
    todoSaga(),
    paginationSaga()
  ])
}
