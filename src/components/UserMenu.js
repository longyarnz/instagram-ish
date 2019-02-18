import React, { useEffect, useRef } from 'react'
import Icon from './Icon';

export default function UserMenu(props) {
  const ul = useRef(null);

  useEffect(() => {
    setTimeout(() => ul.current.style.transform = 'scale(1, 1)', 50);

    return () => ul.current.style.transform = 'scale(0, 0)';
  });

  const icon = props.state.view === './pages/Profile' ? 
    ['home', 'Home', './pages/NewsFeed'] : ['face', 'Profile', './pages/Profile'];

  return (
    <ul className="user-menu" ref={ul}>
      <li onClick={() => props.goTo(icon[2])}>
        <Icon name={icon[0]} />
        <span>
          {icon[1]}
        </span>
      </li>
      <li onClick={() => props.goTo('./pages/Register')}>
        <Icon name="settings" />
        <span>
          Settings
        </span>
      </li>
      <li onClick={() => {
        props.dispatch({type: 'LOG USER OUT'});
        props.goTo('./pages/NewsFeed');
      }}>
        <Icon name="exit_to_app" />
        <span>
          Logout
        </span>
      </li>
    </ul>
  )
}