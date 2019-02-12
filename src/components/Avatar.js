/* eslint-disable jsx-a11y/anchor-is-valid */

import React from 'react';
import Icon from './Icon';
import AsyncImage from './AsyncImage';

export default function Avatar(props) {
  return props.state.isUserLoggedIn ? (
    <li className="dropdown mega-avatar">
      <a href="#" className="dropdown-toggle" data-toggle="dropdown" aria-expanded="true">
        <span className="avatar w-32">
          <AsyncImage src="assets/img/users/2.jpg" className="img-resonsive img-circle" width="25" height="25" alt="..." />
        </span>
        <span className="hidden-xs">
          { props.state.user.username }
        </span>
      </a>
      <div className="dropdown-menu w dropdown-menu-scale pull-right">
        <a className="dropdown-item" href="#"><span>New Story</span></a>
        <a className="dropdown-item" href="#"><span>Become a Member</span></a>
        <div className="dropdown-divider"></div>
        <a className="dropdown-item" href="#"><span>Profile</span></a>
        <a className="dropdown-item" href="#"><span>Settings</span></a>
        <a className="dropdown-item" href="#">Need help?</a>
        <div className="dropdown-divider"></div>
        <a className="dropdown-item" href="#">Sign out</a>
      </div>
    </li>
  ) : (
      <li className="dropdown mega-avatar">
        <a href="#" className="dropdown-toggle" data-toggle="dropdown" aria-expanded="true">
          <Icon name="person" style={{ fontSize: '26px', padding: '0px' }} />
        </a>
        <div className="dropdown-menu w dropdown-menu-scale pull-right">
          <a className="dropdown-item" href="#" onClick={() => props.goTo('./pages/Register')}><span>Join Dominerf</span></a>
          <a className="dropdown-item" href="#" onClick={() => props.goTo('./pages/Login')}><span>Login</span></a>
        </div>
      </li>
    )
}