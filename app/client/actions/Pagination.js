import { NEXT_PAGE, PREVIOUS_PAGE, MOVE_TO, SWITCH_PAGE } from '../constants/Pagination';

export const nextPage = (maxPage)=>({
  type: NEXT_PAGE,
  maxPage: maxPage
})

export const previousPage = ()=>({
  type: PREVIOUS_PAGE
})

export const moveTo = (position)=>({
  type: MOVE_TO,
  position: position
})

export const switchPage = (currentPage)=>({
  type: SWITCH_PAGE,
  currentPage: currentPage
})
