import React, { Component } from 'react';
import { connect } from 'react-redux';

import Pagination from '../components/Pagination.jsx';
import * as actions from '../actions/Pagination';

class PaginationContainer extends Component{
  constructor(props){
    super(props)
  }
  render(){
    return <Pagination {...this.props} />
  }
}

const mapStateToProps = (store)=>({
  currentPage: store.paginationState.currentPage
})

const mapDispatchToProps = (dispatch)=>({
  onNext(maxPage){
    dispatch(actions.nextPage(maxPage))
  },
  onPrevious(){
    dispatch(actions.previousPage())
  },
  onMoveTo(position){
    dispatch(actions.moveTo(position))
  }
})

export default connect(mapStateToProps, mapDispatchToProps)(PaginationContainer);
