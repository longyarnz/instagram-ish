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
  const { state, dispatch, goTo } = props;
  const upgradeAccount = () => {
    dispatch({ type: 'UPGRADE CUSTOMER ACCOUNT' });
    goTo('./pages/EditProfile');
  }

  return (
    <div className="profile-tab">
      <h3 className="profile-tab">{state.user.accountType} Account</h3>
      <ul className="profile-tab">
        <LI icon="face" text={state.user.username} />
        <LI icon="mail_outline" text={state.user.email} />
        <LI icon="contact_phone" text={state.user.phone || 'No Phone Number'} />

        <ShouldRender if={state.user.accountType === 'Fashion Designer'}>
          <LI icon="near_me" text={state.user.address || 'No Address'} />
          <LI icon="insert_emoticon" text={state.user.brand || 'No Brand'} />
        </ShouldRender>

        <ShouldRender if={state.user.accountType === 'Fashion Enthusiast'}>
          <li className="upgrade" onClick={upgradeAccount}>
            UPGRADE TO DESIGNER ACCOUNT
          </li>
        </ShouldRender>
      </ul>
    </div>
  )
}
