import React from 'react';
import Icon from './Icon';

export default function AvatarIcon(props) {
  return (
    <div style={props.style}>
      <Icon name="person" className="touchable" />
    </div>
  )
}
