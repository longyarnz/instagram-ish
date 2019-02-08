import React from 'react';
// import AsyncLoader from './AsyncLoader';

export default function Message(props) {
  const clickButton = () => {
    props.dispatch({
      type: 'CHANGE VIEW',
      payload: 'Timeline',
      view: 'Timeline'
    })
  };

  return (
    <div>
      <button onClick={clickButton}>
        Message
      </button>
    </div>
  )
}
