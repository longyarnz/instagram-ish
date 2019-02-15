import React, { useState } from 'react';
import SandwichMenu from './SandwichMenu';
import AsyncLoader from '../AsyncLoader';
import ShouldRender from './ShouldRender';

export default function NavBar() {
  const [showMenu, setMenu] = useState(false);
  const [showUserMenu, setUserMenu] = useState(false);
  const toggle = () => {
    setUserMenu(false);
    setMenu(!showMenu);
  }
  const toggleUserMenu = () => {
    setMenu(false);
    setUserMenu(!showUserMenu);
  }

  return (
    <nav>
      <SandwichMenu />

      <span>DOMINERF</span>

      <AsyncLoader path="./components/AvatarIcon" toggle={toggle} toggleUserMenu={toggleUserMenu} />

      <ShouldRender if={showMenu}>
        <AsyncLoader path="./components/ActionMenu" fallback=" " />
      </ShouldRender>

      <ShouldRender if={showUserMenu}>
        <AsyncLoader path="./components/UserMenu" fallback=" " />
      </ShouldRender>
    </nav>
  )
}