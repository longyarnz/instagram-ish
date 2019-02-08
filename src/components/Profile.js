import React from 'react'

export default function Timeline(props) {
  const clickButton = () => {
    props.dispatch({
      type: 'CHANGE VIEW',
      payload: './NewsFeed',
    })
  };

  return (
    <div>
      <button onClick={clickButton}>
        Profile
      </button>
    </div>
  )
}
