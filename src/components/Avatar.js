import React from 'react';
import Icon from './Icon';
import AsyncImage from './AsyncImage';
import ShouldRender from './ShouldRender';

export default function Avatar(props) {
  const origin = window.location.origin === 'http://localhost:3000' ?
    'http://18.223.1.218' : '';

  return (
    <>
      <ShouldRender if={!props.state.userIsLoggedIn}>
        <div style={props.style} onClick={props.toggle}>
          <Icon name="person_outline" className="touchable" />
        </div>
      </ShouldRender>

      <ShouldRender if={props.state.userIsLoggedIn}>
        <AsyncImage 
          className="avatar" 
          src={`${origin}/${props.state.user.photo}` || 'assets/img/user.png'} 
          alt="user"
          onClick={props.toggleUserMenu} 
        />
      </ShouldRender>
    </>
  )
}
