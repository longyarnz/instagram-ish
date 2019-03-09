import React from 'react';
import Spinner from './Spinner';

export default function FullPageSpinner() {
  return (
    <div style={{
      width: '100vw',
      height: '100vh',
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

export function FullPageLoader() {
  return (
    <div style={{
      width: '100vw',
      height: '100vh',
      display: 'flex',
      justifyContent: 'center',
      alignItems: 'center'
    }}>
      <Spinner style={{fontSize: '400%', color: '#ccc', animationDuration: '.65s'}} />
    </div>
  )
}
