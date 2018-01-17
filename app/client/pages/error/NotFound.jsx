import React, { Component } from 'react';
import { Link } from 'react-router-dom';

export default class NotFound extends Component{
  render(){
    return(
      <div className='not_found_container'>
        <div className='c'>
          <div className='_error_code'>404</div>
          <hr />
          <div className='_1'>THE PAGE</div>
          <div className='_2'>WAS NOT FOUND</div>
          <Link className='back-button' to='/'>COME BACK HOME</Link>
        </div>
      </div>
    )
  }
}
