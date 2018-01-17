import React, { Component } from 'react';
import { filter } from '../actions/TodoList';

import store from '../store';

export default class SideNav extends Component{
  componentDidMount(){
    const datepicker = document.querySelector('.datepicker');
    let onChange = (value = datepicker.value)=>{
      this.onChange({
        name: 'createdAt',
        value: value
      })
    }
    onChange = onChange.bind(this);
    M.Datepicker.init(datepicker, {
      container: 'body',
      onSelect: onChange,
      onClose: onChange
    });
    const element = document.querySelector('.sidenav'),
    sidenav = M.Sidenav.init(element);
  }
  onChange(e){
    let target;
    const element = document.querySelector('.sidenav'),
    sidenav = M.Sidenav.getInstance(element);
    if(e.name == 'createdAt'){
      if(e.value.length) e.value = e.value.toString();
      target = e;
    }else{
      target = e.target;
      if(!sidenav.isOpen){
        const toastElement = document.querySelector('.toast');
        if(toastElement){
          toastElement.textContent = target.value;
        }else{
          M.toast({html: target.value, displayLength: Infinity})
        }
      }
    }
    store.dispatch(filter({
      [target.name]: target.value
    }))
  }
  removeToast(){
    const toastElement = document.querySelector('.toast');
    if(toastElement){
      M.Toast.getInstance(toastElement).dismiss();
    }
  }
  render(){
    return(
      <ul id="slide-out" className="sidenav sidenav-fixed">
        <li>
          <div className="user-view">
            <div className="background">
              <img src="images/sidenav-img.jpg" />
            </div>
          </div>
        </li>
        <li><a className="subheader flow-text">Filter by:</a></li>
        <li>
          <div className="input-field col s12">
            <i className="material-icons prefix">text_fields</i>
            <input name='title' type="text" id="title" onBlur={this.removeToast} onChange={this.onChange} />
              <label htmlFor="title">Title</label>
          </div>
        </li>
        <li>
          <div className='input-field col m6 s12'>
            <i className="material-icons prefix">date_range</i>
            <input name='createdAt' type="text" id='createdAt' className="datepicker" readOnly />
            <label htmlFor='createdAt'>Date</label>
          </div>
        </li>
      </ul>
    )
  }
}
