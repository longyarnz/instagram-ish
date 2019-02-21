import React, { useState, useRef, useEffect } from 'react';
import AddStoryButton from './AddStoryButton';

export default function AddPostButton(props) {
  const div = useRef(null);
  const [ isClicked, setIsClicked ] = useState(false);
  const onClick = () => {
    setIsClicked(!isClicked);
    props.dispatch({
      type: 'SHOW DIALOG BOX'
    })
  }

  useEffect(() => {
    const position = isClicked ? '325px' : '35px';
    setTimeout(() => div.current.style.bottom = position, 50);

    return () => div.current.style.bottom = '-50px';
  });

  return (
    <div className="add-post-container" ref={div} onClick={onClick}>
      <AddStoryButton hideText={true} />
    </div>
  )
}