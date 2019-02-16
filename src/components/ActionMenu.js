import React, { useEffect, useRef } from 'react'
import Icon from './Icon';

export default function ActionMenu(props) {
  const ul = useRef(null);

  useEffect(() => {
    ul.current.style.transform = 'scale(1, 1)';

    return () => {
      ul.current.style.transform = 'scale(0, 0)';
    }
  });

  return (
    <ul className="action-menu" ref={ul}>
      <li onClick={() => props.goTo('./pages/Register')}>
        <Icon name="how_to_reg" />
        <span>
          Register
        </span>
      </li>
      <li onClick={() => props.goTo('./pages/Login')}>
        <Icon name="account_circle" />
        <span>
          Login
        </span>
      </li>
    </ul>
  )
}