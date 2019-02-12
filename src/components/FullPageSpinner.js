import React from 'react'

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
