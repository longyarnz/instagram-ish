import React from 'react';
import Icon from './Icon';
import AsyncImage from './AsyncImage';
import ShouldRender from './ShouldRender';

export default function Avatar(props) {
  const { state, toggle, toggleUserMenu, style } = props;
  const origin = 'http://18.223.1.218';
  const src = state.user.photo ? `${origin}/${state.user.photo}` : 'assets/img/user.png';

  return (
    <>
      <ShouldRender if={!state.userIsLoggedIn}>
        <div style={style} onClick={toggle}>
          <Icon name="person_outline" className="touchable" />
        </div>
      </ShouldRender>

      <ShouldRender if={state.userIsLoggedIn}>
        <AsyncImage 
          className="avatar" 
          src={src} 
          alt="user"
          onClick={toggleUserMenu} 
        />
      </ShouldRender>
    </>
  )
}
