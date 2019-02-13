import React from 'react';
import AsyncImage from './AsyncImage';
import Icon from './Icon';

export function NewsFeedTab(props) {
  return (
    <div className="newsfeed-tab">
      <header>
        <AsyncImage src={props.userSrc} alt="user" />
        <div>
          <span>{props.name}</span>
          <span>{props.profession}</span>
        </div>
        <Icon name="more_vert" />
      </header>
      <AsyncImage src={props.src} alt="user" />
      <footer>
        <Icon name="favorite_border" />
      </footer>
    </div>
  );
}
