import React from 'react';
// import AsyncLoader from './AsyncLoader';

export default function NewsFeed(props) {
  const clickButton = () => {
    props.dispatch({
      type: 'CHANGE VIEW',
      payload: './Shop',
    })
  };

  return (
    <div>
      <button onClick={clickButton}>
        NewsFeed
      </button>
    </div>
  )
}
