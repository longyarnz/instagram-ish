import React, { useState, useEffect } from 'react';
import { FlatList } from './Utils';
import NewsFeedTab from './NewsFeedTab';
import { FullPageLoader } from './FullPageSpinner';
import { LIKE_A_POST, UNLIKE_A_POST } from '../Actions';
import ShouldRender from './ShouldRender';

export default function NewsFeedSlide(props) {
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    !localStorage.staleState && setIsLoading(false);
  }, []);

  useEffect(() => {
    props.hasPosts && setIsLoading(false);
  });

  const style = props.userIsLoggedIn ? {
    paddingTop: 0
  } : {};

  const loadComments = (postId) => {
    props.dispatch({
      type: 'SET MODAL VIEW',
      payload: './components/CommentModal'
    });

    props.dispatch({
      type: 'SHOW COMMENTS',
      payload: postId
    });
  }

  const changeLikeStatus = (postId, userLikesStatus) => {
    const likeAction = userLikesStatus ? UNLIKE_A_POST : LIKE_A_POST;
    likeAction(props.dispatch, props.token, props.userId, postId);
  }

  const origin = 'http://18.223.1.218';
  const loadedPosts = props.posts;
  const fetchStatusOf = postId => props.changingLikeStatus.some(id => id === postId);
  const emptyDivMessage = props.emptyDivMessage || 'MORE POSTS COMING SOON!';
  const profilePic = post => {
    if (post.userId === props.userId) {
      return props.profilePic;
    }
    else {
      return post.profile_photo ?
        `${origin}/${post.profile_photo}` : `assets/img/user.png`;
    }
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
              time={post.time}
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