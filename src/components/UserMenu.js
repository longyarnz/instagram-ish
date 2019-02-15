import React, { useEffect, useRef } from 'react'
import Icon from './Icon';

export default function UserMenu(props) {
  const ul = useRef(null);

  useEffect(() => {
    ul.current.style.width = '130px';
    ul.current.style.height = '140px';

    return () => {
      ul.current.style.width = '0px';
      ul.current.style.height = '0px';
    }
  });

  return (
    <ul className="user-menu" ref={ul}>
      <li onClick={() => props.goTo('./pages/Profile')}>
        <Icon name="face" />
        <span>
          Profile
        </span>
      </li>
      <li onClick={() => props.goTo('./pages/Register')}>
        <Icon name="settings" />
        <span>
          Settings
        </span>
      </li>
      <li onClick={() => props.goTo('./pages/Login')}>
        <Icon name="exit_to_app" />
        <span>
          Logout
        </span>
      </li>
    </ul>
  )
}