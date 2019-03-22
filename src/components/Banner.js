import React from 'react';
import AsyncImage from './AsyncImage';
import Icon from './Icon';

export default function Banner({ src, goTo, fullName }) {
  const origin = window.location.origin === 'http://localhost:3000' ?
    'http://18.223.1.218' : '';
  src = !src ? 'assets/img/user.png' : origin + '/' + src;

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
