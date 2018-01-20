import { fork, call, put, takeEvery, select } from 'redux-saga/effects';
import { NEXT_PAGE, PREVIOUS_PAGE, MOVE_TO, SWITCH_PAGE } from '../../app/client/constants/Pagination';
import { switchPage } from '../../app/client/actions/Pagination';
import { paginationSaga, nextPage, previousPage, moveTo } from '../../app/client/sagas/Pagination';

describe('Pagination', ()=>{
  it('must dispatch switch action on nextPage', ()=>{
    const action = { type: NEXT_PAGE, maxPage: 2 },
    nextAction   = { type: SWITCH_PAGE, currentPage: 2 },
    nextPageSaga = nextPage(action);
    expect(JSON.stringify(nextPageSaga.next().value)).toBe(JSON.stringify(select((store)=> store.paginationState)));
    expect(nextPageSaga.next({ currentPage: 1 }).value).toEqual(put(nextAction));
    expect(nextPageSaga.next().done).toBeTruthy();
  })

  it('must dispatch switch action on previousPage', ()=>{
    const action = { type: PREVIOUS_PAGE },
    nextAction   = { type: SWITCH_PAGE, currentPage: 1 },
    previousPageSaga = previousPage(action);
    expect(previousPageSaga.next().value.toString()).toBe(select((store)=> store.paginationState).toString());
    expect(previousPageSaga.next({ currentPage: 2 }).value).toEqual(put(nextAction));
    expect(previousPageSaga.next().done).toBeTruthy();
  })

  it('must dispatch switch action on moveTo', ()=>{
    const action = { type: MOVE_TO, position: 2 },
    nextAction   = { type: SWITCH_PAGE, currentPage: 2 },
    moveToSaga   = moveTo(action);
    expect(moveToSaga.next().value).toEqual(put(nextAction));
    expect(moveToSaga.next().done).toBeTruthy();
  })
})
