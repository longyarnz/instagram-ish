import React from 'react';
// import AsyncLoader from './AsyncLoader';

export default function Shop(props) {
  const clickButton = () => {
    props.dispatch({
      type: 'CHANGE VIEW',
      payload: './Authentication',
    })
  };

  return (
    <div>
      <button onClick={clickButton}>
        Shop
      </button>
    </div>
  )
}
