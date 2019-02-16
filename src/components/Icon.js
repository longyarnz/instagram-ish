import React from 'react';

export default function Icon(props) {
  const style = { 
    width: props.width, 
    height: props.height, 
    display: 'flex', 
    justifyContent: 'center', 
    alignItems: 'center',
    ...props.container
  };

  return (
    <div style={style} onClick={props.onClick}>
      <i className={`material-icons ${props.className || ''}`} style={props.style}>
        {props.name}
      </i>
    </div>
  )
}

export function ColorIcon(props) {
  return <Icon style={{color: props.color}} {...props} />
}