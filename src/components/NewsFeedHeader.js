/* eslint-disable jsx-a11y/anchor-is-valid */

import React from 'react';
import SandwichMenu from './SandwichMenu';
import AsyncLoader from '../AsyncLoader';

export default function NewsFeedHeader() {
  return (
    <header className="tr-header">
      <nav className="navbar navbar-default">
        <div className="container-fluid">
          <div className="navbar-header">
            <SandwichMenu />
            <span>DOMINERF</span>
            <AsyncLoader path="./components/AvatarIcon" />
          </div>
        </div>
      </nav>
    </header>
  )
}