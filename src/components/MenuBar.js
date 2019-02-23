import React from 'react'
import { ColorIcon } from './Icon';
import ShouldRender from './ShouldRender';

export default function MenuBar(props) {
  const [tab, setTab] = props.tabs;

  const hue = [
    tab === 0 ? "#f8ba0d" : "#aaa",
    tab === 1 ? "#9898d5" : "#aaa",
    tab === 2 ? "#f8ba0d" : "#aaa"
  ];

  return (
    <div className="menu-bar">
      <ColorIcon name="person_outline" color={hue[0]} onClick={() => setTab(0)} />
      <ShouldRender if={props.state.user.accountType === 'designer'}>
        <ColorIcon name="local_play" color={hue[1]} onClick={() => setTab(1)} />
      </ShouldRender>
      <ColorIcon name="favorite_outline" color={hue[2]} onClick={() => setTab(2)} />
    </div>
  )
}