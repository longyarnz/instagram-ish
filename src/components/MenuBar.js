import React from 'react'
import { ColorIcon } from './Icon';
import ShouldRender from './ShouldRender';

export default function MenuBar({ tabs }) {
  const [tab, setTab] = tabs;

  const hue = [
    tab === 0 ? "#f8ba0d" : "#1c3451",
    tab === 1 ? "#9898d5" : "#1c3451",
    tab === 2 ? "#f8ba0d" : "#1c3451"
  ];

  return (
    <div className="menu-bar">
      <ColorIcon name="person_outline" color={hue[0]} onClick={() => setTab(0)} />
      
      <ShouldRender if={false}>
        <ColorIcon name="local_play" color={hue[1]} onClick={() => setTab(1)} />
      </ShouldRender>
      
      <ColorIcon name="apps" color={hue[2]} onClick={() => setTab(2)} />
    </div>
  )
}