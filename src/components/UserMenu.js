import React, { useEffect, useRef } from 'react';
import Icon from './Icon';
import { injectScrollSetter } from './Utils';

export default function UserMenu(props) {
  const ul = useRef(null);

  useEffect(() => {
    setTimeout(() => ul.current.style.transform = 'scale(1, 1)', 50);

    return () => ul.current.style.transform = 'scale(0, 0)';
  });

  const icon = props.state.view === './pages/Profile' ? 
    ['arrow_back', 'HOME', './pages/NewsFeed'] : ['face', 'Profile', './pages/Profile'];

  const openProfile = view => {
    return injectScrollSetter(props.dispatch, view, () => {
      props.goTo(icon[2]);
    });
  }

  return (
    <ul className="user-menu" ref={ul}>
      <li onClick={openProfile(props.state.view)}>
        <Icon name={icon[0]} />
        <span>
          {icon[1]}
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