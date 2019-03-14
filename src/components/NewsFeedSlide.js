import React, { useState, useEffect } from 'react';
import { FlatList } from './Utils';
import NewsFeedTab from './NewsFeedTab';
import { FullPageLoader } from './FullPageSpinner';
import { LIKE_A_POST, UNLIKE_A_POST } from '../Actions';

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

  const loadedPosts = props.posts;
  const fetchStatusOf = postId => props.changingLikeStatus.some(id => id === postId);

  return (
    <section className="newsfeed-slide" style={style}>
      {
        isLoading ? <FullPageLoader /> : (
          loadedPosts.length === 0 ?
            <div className="empty">MORE POSTS COMING SOON!</div> :
            (
              <FlatList
                list={loadedPosts}
                listView={(post, i) => (
                  <NewsFeedTab
                    key={`tab-${i}`}
                    author={post.username}
                    profession={post.brand_name}
                    userSrc={post.profile_photo || `assets/img/users/${Math.ceil(Math.random() * 10)}.jpg`}
                    src={post.image_path || `assets/img/posts/1.jpg`}
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
                  />
                )}
              />
            )
        )
      }
    </section >
  )
}