import React from 'react'

export default function Icon(props) {
  const style = { 
    width: props.width, 
    height: props.height, 
    display: 'flex', 
    justifyContent: 'center', 
    alignItems: 'center'
  };

  return (
    <div style={style}>
      <i className={`material-icons ${props.className || ''}`} style={props.style}>
        {props.name}
      </i>
    </div>
  )
}