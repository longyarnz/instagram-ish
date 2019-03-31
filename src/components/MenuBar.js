import React from 'react'
import { ColorIcon } from './Icon';
import ShouldRender from './ShouldRender';

export default function MenuBar({ tabs, accountType }) {
  const [tab, setTab] = tabs;

  const hue = [
    tab === 0 ? "#f8ba0d" : "#1c3451",
    tab === 1 ? "#f8ba0d" : "#1c3451"
  ];

  return (
    <div className="menu-bar">
      <ColorIcon name="person_outline" color={hue[0]} onClick={() => setTab(0)} />

      <ShouldRender if={accountType === 'Fashion Designer'}>
        <ColorIcon name="apps" color={hue[1]} onClick={() => setTab(1)} />
      </ShouldRender>
    </div>
  )
}