import React from 'react'
import { ColorIcon } from './Icon';

export default function MenuBar(props) {
  const [ state, setState ] = props.state;

  const hue = [
    state === 0 ? "#f8ba0d" : "#aaa",
    state === 1 ? "#9898d5" : "#aaa",
    state === 2 ? "#ff6a6a" : "#aaa"
  ];
  
   return (
    <div className="menu-bar">
      <ColorIcon name="person" color={hue[0]} onClick={() => setState(0)} />
      <ColorIcon name="local_play" color={hue[1]} onClick={() => setState(1)} />
      <ColorIcon name="favorite" color={hue[2]} onClick={() => setState(2)} />
    </div>
  )
}