import React from 'react';
import AsyncImage from './AsyncImage';
import Icon from './Icon';

export default function Banner(props) {
  return (
    <div className="banner">
      <div>
        <AsyncImage src="assets/img/users/14.jpg" alt="profile" />
      </div>
      <span>Jacob Fisher</span>
      <button onClick={() => props.goTo('./pages/EditProfile')}>
        <Icon name="edit" />
        <span>Edit Profile</span>
      </button>
    </div>
  )
}
