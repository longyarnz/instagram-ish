import React, { useEffect, useRef } from 'react'
import Icon from './Icon';

export default function ActionMenu(props) {
  const ul = useRef(null);

  useEffect(() => {
    ul.current.style.width = '130px';
    ul.current.style.height = '94px';

    return () => {
      ul.current.style.width = '0px';
      ul.current.style.height = '0px';
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