import React, { useState } from 'react';
import SandwichMenu from './SandwichMenu';
import AsyncLoader from '../AsyncLoader';
import ShouldRender from './ShouldRender';
import Icon from './Icon';
import ActionMenu from './ActionMenu';
import UserMenu from './UserMenu';
import { injectScrollSetter } from './Utils';
import AsyncImage from './AsyncImage';

export default function NavBar(props) {
  const [showMenu, setMenu] = useState(false);
  const [showUserMenu, setUserMenu] = useState(false);
  const { dispatch, state, goTo } = props;

  const toggle = () => {
    setUserMenu(false);
    setMenu(!showMenu);
  }

  const toggleUserMenu = () => {
    setMenu(false);
    setUserMenu(!showUserMenu);
  }

  const toggleModal = (modal) => {
    dispatch({
      type: !state.showAppMenu ? 'SET MODAL VIEW' : 'NULL MODAL VIEW',
      payload: `./components/${modal}`
    });
  }

  const toggleAppMenu = () => toggleModal('MenuModal');

  const toggleNotificationMenu = () => {
    state.userIsLoggedIn ?
      toggleModal('NotificationModal')
      : goTo('./pages/Login');
  }

  const toggleSearch = () => {
    state.userIsLoggedIn ?
      toggleModal('SearchModal')
      : goTo('./pages/Login');
  }

  const showAllIcons = state.view === './pages/NewsFeed';
  const scrollSetter = fn => injectScrollSetter(dispatch, state.view, fn);

  return (
    <nav>
      <div>
        <SandwichMenu
          menuIsOpened={state.showAppMenu || state.showNotifications || props.menuIsOpened}
          onClick={
            props.goBack || toggleAppMenu
          }
        />
        <span>
          <AsyncImage src="assets/img/nav.png" alt="Dominerf" />
        </span>
      </div>

      <div>
        <AsyncLoader path="./components/Avatar"
          localState={true}
          toggle={toggle}
          toggleUserMenu={toggleUserMenu}
          dependencies={[showMenu, showUserMenu]}
        />

        <ShouldRender if={showAllIcons && state.userIsLoggedIn}>
          <div onClick={scrollSetter(toggleSearch)}>
            <Icon name="search" />
          </div>

          <ShouldRender if={false}>
            <div className="notifications-icon" onClick={scrollSetter(toggleNotificationMenu)}>
              <Icon name="notifications_none" />
              <span></span>
            </div>
          </ShouldRender>
        </ShouldRender>
      </div>

      <ShouldRender if={showMenu}>
        <ActionMenu goTo={goTo} state={state} />
      </ShouldRender>

      <ShouldRender if={showUserMenu}>
        <UserMenu
          dispatch={dispatch}
          state={state}
          goTo={goTo}
        />
      </ShouldRender>
    </nav>
  )
}