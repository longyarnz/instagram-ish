import React, { useState } from 'react';
import SandwichMenu from './SandwichMenu';
import AsyncLoader from '../AsyncLoader';
import ShouldRender from './ShouldRender';
import Icon from './Icon';

export default function NavBar(props) {
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

  const toggleAppMenu = () => {
    props.dispatch({
      type: !props.showAppMenu ? 'SHOW APP MENU' : 'HIDE APP MENU'
    });
  }

  return (
    <nav>
      <div>
        <SandwichMenu menuIsOpened={props.showAppMenu} onClick={toggleAppMenu}  />
        <span>DOMINERF</span>
      </div>
      <div>
        <div>
          <Icon name="notifications_none" />
        </div>

        <div>
          <Icon name="search" />
        </div>

        <AsyncLoader path="./components/Avatar"
          localState={true}
          toggle={toggle}
          toggleUserMenu={toggleUserMenu}
          dependencies={[showMenu, showUserMenu]}
        />
      </div>

      <ShouldRender if={showMenu}>
        <AsyncLoader path="./components/ActionMenu" fallback=" " />
      </ShouldRender>

      <ShouldRender if={showUserMenu}>
        <AsyncLoader path="./components/UserMenu" fallback=" " />
      </ShouldRender>
    </nav>
  )
}