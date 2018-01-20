import { put, takeEvery, select } from 'redux-saga/effects';

import { NEXT_PAGE, PREVIOUS_PAGE, MOVE_TO } from '../constants/Pagination';
import { switchPage } from '../actions/Pagination';

export function* nextPage(action){
  const paginationState = yield select((store)=> store.paginationState);
  const newPage = paginationState.currentPage + 1;
  if(newPage <= action.maxPage){
    yield put(switchPage(newPage))
  }
}

export function* previousPage(){
  const paginationState = yield select((store)=> store.paginationState);
  if(paginationState.currentPage != 1){
    yield put(switchPage(paginationState.currentPage - 1))
  }
}

export function* moveTo(action){
  yield put(switchPage(action.position))
}

export function* paginationSaga(){
  yield takeEvery(NEXT_PAGE, nextPage)
  yield takeEvery(PREVIOUS_PAGE, previousPage)
  yield takeEvery(MOVE_TO, moveTo)
}
