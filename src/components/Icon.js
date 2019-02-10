import React from 'react'

export default function Icon(props) {
  const style = { 
    width: '100%', 
    height: '100%', 
    display: 'flex', 
    justifyContent: 'center', 
    alignItems: 'center' 
  };

  return (
    <div style={style}>
      <i className={`material-icons ${props.className}`} style={props.style}>
        {props.name}
      </i>
    </div>
  )
}