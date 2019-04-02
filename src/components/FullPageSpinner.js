import React from 'react';
import Spinner from './Spinner';

export default function FullPageSpinner(props) {
  return (
    <div style={{
      width: props.width || '100vw',
      height: props.height || '100vh',
      display: 'flex',
      justifyContent: 'center',
      alignItems: 'center'
    }}>
      <img src="/assets/img/favicon.png" alt="Dominerf Logo" style={{
        height: '20vh',
        animation: 'pop .5s ease forwards infinite alternate'
      }} />
    </div>
  )
}

export function FullPageLoader(props) {
  return (
    <div
      className={props.className}
      style={{
        width: props.width || '100vw',
        height: props.height || '100vh',
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        position: 'fixed',
        background: '#fff',
        zIndex: '999',
        top: '60px'
      }}>
      <Spinner style={{ fontSize: '400%', color: '#ccc', animationDuration: '.35s' }} />
    </div>
  )
}
