import React from 'react';
import Icon from './Icon';
import ShouldRender from './ShouldRender';

function LI(props) {
  return (
    <li>
      <Icon name={props.icon} />
      <span>{props.text}</span>
    </li>
  )
}

export default function ProfileTab(props) {
  const { state: {user}, dispatch, goTo } = props;

  const upgradeAccount = () => {
    dispatch({ type: 'UPGRADE CUSTOMER ACCOUNT' });
    goTo('./pages/EditProfile');
  }

  return (
    <div className="profile-tab">
      <h3 className="profile-tab">{user.accountType}</h3>
      <ul className="profile-tab">
        <LI icon="face" text={user.username} />
        <LI icon="mail_outline" text={user.email} />
        <LI icon="contact_phone" text={user.phone || 'Nil'} />

        <ShouldRender if={user.accountType === 'Fashion Designer'}>
          <LI icon="near_me" text={user.address || 'Nil'} />
          <LI icon="insert_emoticon" text={user.brand || 'Nil'} />
        </ShouldRender>

        <LI icon="store_mall_directory" text={user.description || 'Nil'} />

        <ShouldRender if={props.userIsSuperUser && user.accountType === 'Fashion Enthusiast'}>
          <li className="upgrade" onClick={upgradeAccount}>
            UPGRADE TO DESIGNER ACCOUNT
          </li>
        </ShouldRender>
      </ul>
    </div>
  )
}
