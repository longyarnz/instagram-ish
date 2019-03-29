import React, { useState, useRef, useEffect } from 'react';
import AsyncImage from './AsyncImage';
import Divider from './Divider';
import Icon from './Icon';
import ShouldRender from './ShouldRender';
import Spinner from './Spinner';
import { DELETE_POST } from '../Actions';

export default function NewsFeedTab({ src, ...props }) {
  const _this = useRef(null);
  const [isDeleting, setIsDeleting] = useState(false);
  const [error, setError] = useState(false);
  const [deleteStatus, setDeleteStatus] = useState(false);

  useEffect(() => {
    _this.current = 'MOUNTED';
    return () => {
      _this.current = 'UNMOUNTED';
    }
  }, []);

  const likeIcon = props.userLikesPost ||
    props.isChangingLikeStatus ? 'favorite' : 'favorite_border';

  const color = props.isChangingLikeStatus ? '#ccc' : '#f8ba0d';

  const changeLikeStatus = props.isChangingLikeStatus ?
    null : props.changeLikeStatus;

  const animation = likeIcon !== 'favorite_border' ?
    'pop .25s ease infinite alternate' :
    null;

  const style = { color, animation };

  const deletePost = () => {
    if (isDeleting) return;

    setIsDeleting(true);
    const callback = () => {
      if (_this.current === 'UNMOUNTED') return;

      setDeleteStatus(true);
    }

    const onError = () => {
      if (_this.current === 'UNMOUNTED') return;
      setIsDeleting(false);
      setError(true);

      setTimeout(() => {
        if (_this.current === 'UNMOUNTED') return;
        setError(false);
      }, 5000);
    }

    DELETE_POST(props.dispatch, props.token, props.id, callback, onError);
  }

  const showUserProfile = () => {
    if (props.viewerId === props.authorId) {
      props.goTo('./pages/Profile');

      // props.dispatch({
      //   type: 'NULL MODAL VIEW',
      // });
    }

    else {
      props.dispatch({
        type: 'VIEW A DIFFERENT USER PROFILE',
        payload: null
      });

      props.goTo('./pages/ViewProfile');
    }

    // const html = document.documentElement;
    // const section = document.querySelector('section#fallback');
    // html.style.overflow = 'hidden';
    // section.style.zIndex = 999999999;
  }

  const deleteText = error ? 'Unable To Delete Post' : 'Delete Post';

  return !deleteStatus ? (
    <div className="newsfeed-tab">
      <header onClick={showUserProfile}>
        {/* <AsyncImage src={props.userSrc} alt="user" /> */}

        <div>
          <span>{props.brand}</span>
          <span>{props.author}</span>
        </div>

        <span className="time">
          {props.time}
        </span>
      </header>

      <div className="img-container">
        <AsyncImage src="assets/img/users/4.jpg" alt="user" />
      </div>

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

      <ShouldRender if={props.isViewingFromOwnProfile}>
        <footer>
          <span className="delete" onClick={deletePost}>
            <ShouldRender if={isDeleting}>
              <Spinner style={{ animationDuration: '.35s', color: '#d9534f' }} />
            </ShouldRender>
            <ShouldRender if={!isDeleting}>
              <span>{deleteText}</span>
            </ShouldRender>
          </span>
        </footer>
      </ShouldRender>
      <Divider
        color="#f4f4f4"
        width="calc(100% - 30px)"
      />
    </div>
  ) : null;
}