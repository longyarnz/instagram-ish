import React from 'react';
import Icon from './Icon';
import AsyncImage from './AsyncImage';
import ShouldRender from './ShouldRender';

export default function Avatar(props) {
  return (
    <>
      <ShouldRender if={!props.state.userIsLoggedIn}>
        <div style={props.style} onClick={props.toggle}>
          <Icon name="person_outline" className="touchable" />
        </div>
      </ShouldRender>

      <ShouldRender if={props.state.userIsLoggedIn}>
        <AsyncImage className="avatar" src="assets/img/users/2.jpg" alt="user"onClick={props.toggleUserMenu} />
      </ShouldRender>
    </>
  )
}
