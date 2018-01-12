import { put, takeEvery } from 'redux-saga/effects';

import { NEXT_PAGE, PREVIOUS_PAGE, MOVE_TO } from '../constants/Pagination';
import { switchPage } from '../actions/Pagination';
import store from '../store';

function* nextPage(action){
  const { paginationState } = store.getState();
  const newPage = paginationState.currentPage + 1;
  if(newPage <= action.maxPage){
    yield put(switchPage(newPage))
  }
}

function* previousPage(){
  const { paginationState } = store.getState();
  if(paginationState.currentPage != 1){
    yield put(switchPage(paginationState.currentPage - 1))
  }
}

function* moveTo(action){
  yield put(switchPage(action.position))
}

export default function* paginationSaga(){
  yield takeEvery(NEXT_PAGE, nextPage)
  yield takeEvery(PREVIOUS_PAGE, previousPage)
  yield takeEvery(MOVE_TO, moveTo)
}
