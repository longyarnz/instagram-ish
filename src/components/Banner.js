import React from 'react';
import AsyncImage from './AsyncImage';
import Icon from './Icon';

export default function Banner() {
  return (
    <div className="banner">
      <div>
        <AsyncImage src="assets/img/users/14.jpg" alt="profile" />
        <Icon name="add_a_photo" />
      </div>
      <span>Jacob Fisher</span>
      <button>Edit Profile</button>
    </div>
  )
}
