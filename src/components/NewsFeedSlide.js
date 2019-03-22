import React, { useState, useEffect, useRef } from 'react';
import { FlatList, calcTime } from './Utils';
import NewsFeedTab from './NewsFeedTab';
import { FullPageLoader } from './FullPageSpinner';
import { LIKE_A_POST, UNLIKE_A_POST } from '../Actions';
import ShouldRender from './ShouldRender';
import { injectScrollSetter } from '../components/Utils';

export default function NewsFeedSlide(props) {
  const _this = useRef(null);
  const [counter, setCounter] = useState(0);
  const [isLoading, setIsLoading] = useState(true);
  const [localPosts, setLocalPosts] = useState(null);
  const [isLiking, setIsLiking] = useState([]);
  
  useEffect(() => {
    const x = setTimeout(() => {
      if(_this.current === 'MOUNTED') setCounter(counter + 1);
    }, 60000);
    
    return () => {
      clearTimeout(x);
    }
  }, [counter])

  useEffect(() => {
    _this.current = 'MOUNTED';
    return () => {
      _this.current = 'UNMOUNTED';
    }
  }, []);

  useEffect(() => {
    !localStorage.staleState && setIsLoading(false);
  }, []);

  useEffect(() => {
    props.hasPosts && setIsLoading(false);
  });

  const style = props.userIsLoggedIn ? {
    paddingTop: 0
  } : {};

  const loadComments = injectScrollSetter(
    props.dispatch, props.view, (postId) => {
      props.dispatch({
        type: 'SET MODAL VIEW',
        payload: './components/CommentModal'
      });

      props.dispatch({
        type: 'SHOW COMMENTS',
        payload: postId
      });
    }
  );

  const origin = 'http://18.223.1.218';
  const loadedPosts = localPosts || props.posts;
  const fetchStatusOf = postId => isLiking.some(id => id === postId);
  const emptyDivMessage = props.emptyDivMessage || 'MORE POSTS COMING SOON!';

  const profilePic = post => {
    if (post.userId === props.userId) {
      return props.profilePic || 'assets/img/user.png';
    }
    else {
      return post.profile_photo ?
        `${origin}/${post.profile_photo}` : 'assets/img/user.png';
    }
  }

  const changeLikeStatus = (postId, userLikesStatus) => {
    const likeAction = userLikesStatus ? UNLIKE_A_POST : LIKE_A_POST;

    setIsLiking([...isLiking, postId]);

    const callback = () => {
      if (_this.current === 'UNMOUNTED') return;

      if (userLikesStatus) {
        loadedPosts.forEach(post => {
          post.liked_by_me = post.post_id === postId ?
            false : post.liked_by_me;
        });
      }
      else {
        loadedPosts.forEach(post => {
          post.liked_by_me = post.post_id === postId ?
            true : post.liked_by_me;
        });
      }

      setLocalPosts(loadedPosts);
      setIsLiking(isLiking.filter(id => id !== postId));
    }
    likeAction(props.dispatch, props.token, props.userId, postId, callback);
  }

  return (
    <section className="newsfeed-slide" style={style}>
      <ShouldRender if={isLoading}>
        <FullPageLoader className="loader" />
      </ShouldRender>

      <ShouldRender if={!isLoading && loadedPosts.length === 0}>
        <div className="empty">{emptyDivMessage}</div>
      </ShouldRender>

      <ShouldRender if={!isLoading && loadedPosts.length > 0}>
        <FlatList
          list={loadedPosts}
          listView={(post, i) => (
            <NewsFeedTab
              key={`tab-${i}`}
              author={post.username}
              profession={post.brand_name}
              userSrc={profilePic(post)}
              src={`${origin}/${post.image_path}`}
              caption={post.caption}
              category={post.category}
              categoryId={post.categoryId}
              time={calcTime(post.unix_time)}
              likes={post.likes_count}
              isChangingLikeStatus={fetchStatusOf(post.post_id)}
              userLikesPost={post.liked_by_me}
              comments={post.comments_count}
              loadComments={() => loadComments(post.post_id)}
              changeLikeStatus={() => changeLikeStatus(post.post_id, post.liked_by_me)}
              isViewingFromNewsFeed={props.isViewingFromNewsFeed}
            />
          )}
        />
      </ShouldRender>
    </section >
  )
}