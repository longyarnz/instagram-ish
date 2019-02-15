import React from 'react';
import AsyncImage from './AsyncImage';

export default function Avatar(props) {
  return (
    <AsyncImage className="avatar" src="assets/img/users/2.jpg" alt="user" onClick={props.onClick} />
  )
}
