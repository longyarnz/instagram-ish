import React from 'react';
import Icon from './Icon';
import Divider from './Divider';
import AsyncImage from './AsyncImage';
import ShouldRender from './ShouldRender';
import { FlatList } from './Utils';

export function SearchTab(props) {
  return (
    <ul className={props.icon}>
      <h3 onClick={props.onClick}>
        <span>
          <small>{props.totalResult}</small>
          {props.title}
        </span>

        <ShouldRender if={props.totalResult > 0}>
          <Icon name={props.icon} />
        </ShouldRender>
      </h3>
      <FlatList list={props.list} listView={props.view} />
    </ul>
  );
}

export function UserSearchTab(props) {
  const origin = 'http://18.223.1.218';

  return (
    <li className="search-user" key={`user-${props.i}`}>
      <div>
        <AsyncImage src={`${origin}/${props.user.photoPath}`} alt="user" />
        <div>
          <span>{props.user.fullName}</span>
          <span>{props.user.username}</span>
          <span>{props.user.email}</span>
          <span>{props.user.phone}</span>
        </div>
      </div>
      <Divider className="line" color="#f4f4f4" width="100%" />
    </li>
  );
}

export function PostSearchTab({ post }) {
  const origin = 'http://18.223.1.218';

  return (
    <li className="search-post">
      <span>
        {post.caption}
      </span>
      <AsyncImage src={`${origin}/${post.image_path}`} alt="post" />
      <Divider className="line" color="#f4f4f4" width="100%" />
    </li>
  );
}