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
  const { state, dispatch } = props;
  const years = Number(state.user.experience) > 1 ? 'yrs' : 'yr';
  const experience = Number(state.user.experience) < 1 ? 'No Experience' : `
    ${state.user.experience} ${years} of Experience
  `;
  console.log(experience);

  return (
    <div className="profile-tab">
      <h3 className="profile-tab">{state.user.accountType} Account</h3>
      <ul className="profile-tab">
        <LI icon="face" text={state.user.username} />
        <LI icon="mail_outline" text={state.user.email} />
        <LI icon="contact_phone" text={state.user.phone} />

        <ShouldRender if={state.user.accountType === 'designer'}>
          <LI icon="event" text={experience} />
        </ShouldRender>

        <LI icon="store_mall_directory" text={state.user.about} />

        <ShouldRender if={state.user.accountType === 'customer'}>
          <li className="upgrade" onClick={() => dispatch({ type: 'UPGRADE CUSTOMER ACCOUNT' })}>
            UPGRADE TO DESIGNER ACCOUNT
          </li>
        </ShouldRender>
      </ul>
    </div>
  )
}