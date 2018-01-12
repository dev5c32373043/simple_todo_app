import { SWITCH_PAGE } from '../constants/Pagination';

const initState = {
  currentPage: 1
}

export default (state = initState, action)=>{
  switch (action.type) {
    case SWITCH_PAGE:
      return Object.assign({}, state, {
        currentPage: action.currentPage
      })
    default:
      return state;
  }
}
