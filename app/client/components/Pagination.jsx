import React, { Component, Fragment } from 'react';

export default class Pagination extends Component{
  constructor(props){
    super(props)
    this.currentPage = 0;
    this.maxPage = 0;
  }
  componentWillReceiveProps(nextProps){
    const { currentPage, maxPage, limit } = nextProps;
    this.maxPage = Math.ceil(maxPage / limit);
    this.currentPage = (currentPage > this.maxPage ? this.maxPage : currentPage);
  }
  renderPages(){
    const { onMoveTo } = this.props;
    let pages = [];
    for(let i = 1; i < this.maxPage + 1; i++){
      pages.push(
        <li key={i} className={i == this.currentPage ? "active" : "waves-effect"}>
          <a href="javascript:void(false)" onClick={(e)=> onMoveTo(Number(e.target.textContent))}>{i}</a>
        </li>
      )
    }
    return pages;
  }
  paginate(){
    const { data, renderItems, limit } = this.props;
    const diff = (this.currentPage - 1) * limit;
    const paginatedData = data.slice(diff, diff + limit);
    return renderItems(paginatedData);
  }
  isPaginationNeeded(){
    if(this.maxPage > 1){
      const { onNext, onPrevious } = this.props;
      return(
        <ul className="pagination">
          <li className={this.currentPage == 1 ? "disabled" : "waves-effect"}>
            <a href="javascript:void(false)" onClick={onPrevious}><i className="material-icons">chevron_left</i></a>
          </li>
            {this.renderPages()}
          <li className={this.currentPage == this.maxPage ? "disabled" : "waves-effect"}>
            <a href="javascript:void(false)" onClick={()=> onNext(this.maxPage)}><i className="material-icons">chevron_right</i></a>
          </li>
        </ul>
      )
    }
  }
  render(){
    return(
      <Fragment>
        {this.paginate()}
        {this.isPaginationNeeded()}
      </Fragment>
    )
  }
}
