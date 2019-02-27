import React from 'react';
import AsyncImage from './AsyncImage';
import Divider from './Divider';
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
        <span className="time">
          {new Date().toLocaleTimeString()}
        </span>
      </header>
      <AsyncImage src={props.src} alt="user" />
      <footer>
        <span>
          <Icon name="favorite_border" />
          <span>{props.likes}</span>
        </span>
        <span onClick={props.loadComments}>
          <Icon name="comment" />
          <span>{props.comments}</span>
        </span>
      </footer>
      <Divider color="#f4f4f4" width="80%" />
    </div>
  );
}
