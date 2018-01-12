import React, { Component } from 'react';

export default class NavBar extends Component{
  render(){
    return(
      <div className="navbar-fixed hide-on-large-only">
        <nav>
          <div className="nav-wrapper grey darken-4">
            <a href="javascript:void(false)" data-target="slide-out" className="sidenav-trigger">
              <i className="material-icons">menu</i>
            </a>
            <a href="/" className="brand-logo center" />
          </div>
        </nav>
      </div>
    )
  }
}
