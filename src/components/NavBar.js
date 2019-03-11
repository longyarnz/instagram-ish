import React, { useState } from 'react';
import SandwichMenu from './SandwichMenu';
import AsyncLoader from '../AsyncLoader';
import ShouldRender from './ShouldRender';
import Icon from './Icon';
import ActionMenu from './ActionMenu';
import UserMenu from './UserMenu';

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

  const toggleModal = (modal) => {
    props.dispatch({
      type: !props.state.showAppMenu ? 'SET MODAL VIEW' : 'NULL MODAL VIEW',
      payload: `./components/${modal}`
    });
  }

  const toggleAppMenu = () => toggleModal('MenuModal');

  const toggleNotificationMenu = () => {
    props.state.userIsLoggedIn ?
      toggleModal('NotificationModal')
      : props.goTo('./pages/Login');
  }

  const toggleSearch = () => {
    props.state.userIsLoggedIn ?
      toggleModal('SearchModal')
      : props.goTo('./pages/Login');
  }

  const showAllIcons = props.state.view === './pages/NewsFeed';

  return (
    <nav>
      <div>
        <SandwichMenu
          menuIsOpened={props.state.showAppMenu || props.state.showNotifications || props.menuIsOpened}
          onClick={props.goBack || toggleAppMenu}
        />
        <span>DOMINERF</span>
      </div>

      <div>
        <AsyncLoader path="./components/Avatar"
          localState={true}
          toggle={toggle}
          toggleUserMenu={toggleUserMenu}
          dependencies={[showMenu, showUserMenu]}
        />
        <ShouldRender if={showAllIcons}>
          <div onClick={toggleSearch}>
            <Icon name="search" />
          </div>

          <div className="notifications-icon" onClick={toggleNotificationMenu}>
            <Icon name="notifications_none" />
            <span></span>
          </div>
        </ShouldRender>
      </div>

      <ShouldRender if={showMenu}>
        <ActionMenu goTo={props.goTo} state={props.state} />
      </ShouldRender>

      <ShouldRender if={showUserMenu}>
        <UserMenu
          dispatch={props.dispatch}
          state={props.state}
          goTo={props.goTo}
        />
      </ShouldRender>
    </nav>
  )
}