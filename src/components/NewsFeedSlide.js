import React from 'react';
import { FlatList } from './Utils';
import NewsFeedTab from './NewsFeedTab';

const time = (i) => `${i}hr${i > 1 ? 's' : ''} ago`;

export const Posts = [
  {
    author: 'Eleanor Harper',
    profession: 'Continental Fashionist',
    time: (i) => `${i}hr${i > 1 ? 's' : ''} ago`,
    likes: 25,
    comments: 13
  },
  {
    author: 'Christopher Williamson',
    profession: 'Hard Suite Tailor',
    time: (i) => `${i}hr${i > 1 ? 's' : ''} ago`,
    likes: 75,
    comments: 52
  },
  {
    author: 'Felicity Smoak',
    profession: '+La Roiuge',
    time: (i) => `${i}hr${i > 1 ? 's' : ''} ago`,
    likes: 2,
    comments: 14
  }
]

export default function NewsFeedSlide(props) {
  const tyle = props.userIsLoggedIn ? {
    marginTop: 0
  } : {};

  const loadComments = (postId) => {
    props.dispatch({
      type: 'SHOW COMMENTS',
      payload: postId
    });
  }

  const loadedPosts = props.posts.length === 0 ? Posts : props.posts;

  return (
    <section className="newsfeed-slide" style={tyle}>
      <FlatList
        list={loadedPosts}
        listView={(post, i) => (
          <NewsFeedTab
            author={post.name || post.author}
            profession={post.brandName || post.profession || ''}
            userSrc={`assets/img/users/${Math.ceil(Math.random() * 10)}.jpg`}
            src={post.imagePath || `assets/img/posts/1.jpg`}
            caption={post.caption}
            time={post.time && post.time(i) | time(i)}
            likes={post.likes || Math.floor(Math.random() * 20)}
            comments={post.comments || Math.floor(Math.random() * 20)}
            loadComments={() => loadComments(post.postId)}
            key={`tab-${i}`}
          />
        )}
      />
    </section >
  )
}