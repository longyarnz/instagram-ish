import React, { useState, useRef, useEffect } from 'react';
import AddStoryButton from './AddStoryButton';

export default function AddPostButton(props) {
  const div = useRef(null);
  const [ isClicked, setIsClicked ] = useState(false);
  const onClick = () => {
    setIsClicked(!isClicked);
    const { scrollTop } = document.scrollingElement;
    
    props.dispatch({
      type: 'SHOW DIALOG BOX'
    });
    
    props.dispatch({
      type: 'SET SCROLLTOP',
      payload: scrollTop
    })
  }

  useEffect(() => {
    const position = isClicked ? '325px' : '35px';
    setTimeout(() => div.current.style.bottom = position, 50);
  });

  return (
    <div className="add-post-container" ref={div} onClick={onClick}>
      <AddStoryButton name="bubble_chart" hideText={true} />
    </div>
  )
}