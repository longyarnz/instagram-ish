import React from 'react';
import AsyncImage from './AsyncImage';
import Icon from './Icon';

export default function Banner({ src, goTo, fullName }) {
  src = !src ? 'assets/img/user.png' : src;

  return (
    <div className="banner">
      <div>
        <div className="img-border">
          <AsyncImage src={src} alt="profile" />
        </div>
      </div>
      <span>{fullName}</span>
      <button onClick={() => goTo('./pages/EditProfile')}>
        <Icon name="edit" />
        <span>Edit Profile</span>
      </button>
    </div>
  )
}
