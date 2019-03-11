import React, { useState, useEffect } from 'react';
import { FlatList } from './Utils';
import NewsFeedTab from './NewsFeedTab';
import { FullPageLoader } from './FullPageSpinner';
import { LIKE_A_POST, UNLIKE_A_POST } from '../Actions';

const time = (i) => `${i}hr${i > 1 ? 's' : ''} ago`;

export const Posts = [
  {
    author: 'Eleanor Harper',
    profession: 'Continental Fashionist',
    time: `${Math.ceil(Math.random() * 5)}hrs ago`,
    likes_count: 25,
    comments_count: 13,
    caption: 'Lorem, ipsum dolor sit amet consectetur adipisicing elit. Ut, exercitationem!'
  },
  {
    author: 'Christopher Williamson',
    profession: 'Hard Suite Tailor',
    time: `${Math.ceil(Math.random() * 5)}hrs ago`,
    likes_count: 75,
    comments_count: 52,
    caption: 'Lorem, ipsum dolor sit amet consectetur adipisicing elit. Ut, exercitationem!'
  },
  {
    author: 'Felicity Smoak',
    profession: '+La Roiuge',
    time: `${Math.ceil(Math.random() * 5)}hrs ago`,
    likes_count: 2,
    comments_count: 14,
    caption: 'Lorem, ipsum dolor sit amet consectetur adipisicing elit. Ut, exercitationem!'
  }
]

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

  const changeLikeStatus = (postId) => {
    console.log(postId);
    const userLikesStatus = fetchLikeStatusOf(postId);
    const changeLikeStatus = userLikesStatus ? LIKE_A_POST : UNLIKE_A_POST;
    changeLikeStatus(props.dispatch, props.token, props.userId, postId);
  }

  const loadedPosts = props.posts;
  const fetchStatusOf = postId => props.changingLikeStatus.some(id => id === postId);
  const fetchLikeStatusOf = postId => props.likes.some(id => id === postId);

  console.log(props.changingLikeStatus);

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
                    author={post.username || post.author}
                    profession={post.brand_name || post.profession || ''}
                    userSrc={post.profile_photo || `assets/img/users/${Math.ceil(Math.random() * 10)}.jpg`}
                    src={post.image_path || `assets/img/posts/1.jpg`}
                    caption={post.caption}
                    time={post.time || time(i)}
                    likes={post.likes_count}
                    isChangingLikeStatus={fetchStatusOf(post.post_id)}
                    userLikesPost={fetchLikeStatusOf(post.post_id)}
                    comments={post.comments_count}
                    loadComments={() => loadComments(post.post_id)}
                    changeLikeStatus={() => changeLikeStatus(post.post_id)}
                  />
                )}
              />
            )
        )
      }
    </section >
  )
}