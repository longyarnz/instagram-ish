import React from 'react';
import Icon from './Icon';
import ShouldRender from './ShouldRender';
import AsyncLoader from '../AsyncLoader';

export default function AvatarIcon(props) {
  return (
    <>
      <ShouldRender if={!props.state.userIsLoggedIn}>
        <div style={props.style} onClick={props.toggle}>
          <Icon name="person" className="touchable" />
        </div>
      </ShouldRender>

      <ShouldRender if={props.state.userIsLoggedIn}>
        <AsyncLoader path="./components/Avatar" onClick={props.toggleUserMenu} />
      </ShouldRender>
    </>
  )
}
