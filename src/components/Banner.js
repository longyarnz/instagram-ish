import React from 'react';
import AsyncImage from './AsyncImage';
import Icon from './Icon';

export default function Banner({src, goTo}) {
  src = !src ? 'assets/img/user.png' : src;
  
  return (
    <div className="banner">
      <div>
        <AsyncImage src={src} alt="profile" />
      </div>
      <span>Jacob Fisher</span>
      <button onClick={() => goTo('./pages/EditProfile')}>
        <Icon name="edit" />
        <span>Edit Profile</span>
      </button>
    </div>
  )
}
