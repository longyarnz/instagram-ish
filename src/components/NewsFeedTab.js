import React from 'react';
import AsyncImage from './AsyncImage';
import Icon from './Icon';

export default function NewsFeedTab(props) {
  return (
    <div className="newsfeed-tab">
      <header>
        <AsyncImage src={props.userSrc} alt="user" />
        <div>
          <span>{props.author}</span>
          <span>{props.profession}</span>
        </div>
        <Icon name="more_vert" />
      </header>
      <AsyncImage src={props.src} alt="user" />
      <footer>
        <span>
          <Icon name="favorite_border" />
          <span>{props.likes}</span>
        </span>
        <span>
          <Icon name="comment" />
          <span>{props.comments}</span>
        </span>
      </footer>
    </div>
  );
}
