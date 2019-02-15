import React from 'react';

export default function Divider(props) {
  return (
    <div style={{
      margin: 'auto',
      backgroundColor: props.color || '#000',
      width: props.width || '100%',
      height: props.height || '1px',
      ...props.extras
    }}></div>
  )
}
