import React from 'react'

export default function Timeline(props) {
  const clickButton = () => {
    props.dispatch({
      type: 'CHANGE VIEW',
      payload: './Profile',
    })
  };

  return (
    <div>
      <button onClick={clickButton}>
        Timeline
      </button>
    </div>
  )
}
