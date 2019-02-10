import React from 'react';
import Icon from './Icon';

export default function Spinner(props) {
  return (
    <Icon name="donut_small" className="fa-spin" style={props.style} />
  )
}