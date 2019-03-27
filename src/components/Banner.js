import React from 'react';
import AsyncImage from './AsyncImage';
import Icon from './Icon';
import ShouldRender from './ShouldRender';

export default function Banner(props) {
  const origin = 'http://18.223.1.218';
  const src = !props.src ? 'assets/img/user.png' : origin + '/' + props.src;

  return (
    <div className="banner">
      <div>
        <div className="img-border">
          <AsyncImage src={src} alt="profile" />
        </div>
      </div>
      <span>{props.fullName}</span>
      
      <ShouldRender if={props.userIsSuperUser}>
        <button onClick={() => props.goTo('./pages/EditProfile')}>
          <Icon name="edit" />
          <span>Edit Profile</span>
        </button>
      </ShouldRender>
    </div>
  )
}
