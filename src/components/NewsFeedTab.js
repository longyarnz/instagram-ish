import React from 'react';
// import AsyncImage from './AsyncImage';
import Divider from './Divider';
import Icon from './Icon';
import ShouldRender from './ShouldRender';

export default function NewsFeedTab({ src, ...props }) {
  const likeIcon = props.userLikesPost ||
    props.isChangingLikeStatus ? 'favorite' : 'favorite_border';

  const color = props.isChangingLikeStatus ? '#ccc' : '#f8ba0d';

  const changeLikeStatus = props.isChangingLikeStatus ?
    null : props.changeLikeStatus;

  const animation = likeIcon !== 'favorite_border' ?
    'pop .25s ease infinite alternate' :
    null;

  const style = { color, animation };

  return (
    <div className="newsfeed-tab">
      <header>
        {/* <AsyncImage src={props.userSrc} alt="user" /> */}

        <div>
          <span>{props.author}</span>
          <span>{props.profession}</span>
        </div>

        <span className="time">
          {props.time}
        </span>
      </header>

      {/* <AsyncImage src={src} alt="user" /> */}

      <span>
        {props.caption}
      </span>

      <ShouldRender if={props.isViewingFromNewsFeed}>
        <footer>
          <span onClick={changeLikeStatus}>
            <Icon name={likeIcon} style={style} />
            <span>{props.likes}</span>
          </span>

          <span onClick={props.loadComments}>
            <Icon name="chat_bubble_outline" />
            <span>{props.comments}</span>
          </span>
        </footer>
      </ShouldRender>
      <Divider
        color="#f4f4f4"
        width="calc(100% - 30px)"
      />
    </div>
  );
}