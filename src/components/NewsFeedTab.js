import React from 'react';
import AsyncImage from './AsyncImage';
import Divider from './Divider';
import Icon from './Icon';

export default function NewsFeedTab({ src, ...props }) {
  src = src.search('///') ? src.replace('///', '/640/480/') : src;
  const likeIcon = props.userLikesPost ? 'favorite' : 'favorite_border';

  const color = props.isChangingLikeStatus ? '#ccc' : 'red';
  const changeLikeStatus = props.isChangingLikeStatus ? 
    null : props.changeLikeStatus;
  const animation = props.isChangingLikeStatus ?
    'pop .25s ease infinite alternate' :
    null;
  const style = { color, animation };

  return (
    <div className="newsfeed-tab">
      <header>
        <AsyncImage src={props.userSrc} alt="user" />
        <div>
          <span>{props.author}</span>
          <span>{props.profession}</span>
        </div>
        <span className="time">
          {props.time}
        </span>
      </header>
      <AsyncImage src={src} alt="user" />
      <span>
        {props.caption}
      </span>
      <footer>
        <span onClick={changeLikeStatus}>
          <Icon name={likeIcon} style={style} />
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
