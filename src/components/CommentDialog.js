import React, { useState, useEffect } from 'react';
import { FlatList } from './Utils';
import AsyncImage from './AsyncImage';
import Divider from './Divider';
import Icon from './Icon';
import Spinner from './Spinner';
import ShouldRender from './ShouldRender';
import { FETCH_COMMENTS } from '../Actions';

const results = [
  {
    userSrc: 'assets/img/users/10.jpg',
    text: 'Lorem ipsum dolor sit amet consectetur adipisicing elit.'
  },
  {
    userSrc: 'assets/img/users/11.jpg',
    text: 'Fugit quaerat reprehenderit culpa sint soluta voluptas eos illum modi sapiente maxime sequi repellendus blanditiis.'
  },
  {
    userSrc: 'assets/img/users/12.jpg',
    text: 'Explicabo corporis, veritatis sint minima voluptates sequi eligendi debitis maxime, quidem quia sunt.'
  },
  {
    userSrc: 'assets/img/users/13.jpg',
    text: 'Laboriosam architecto unde temporibus qui numquam et assumenda distinctio obcaecati sunt'
  },
  {
    userSrc: 'assets/img/users/10.jpg',
    text: 'Lorem ipsum dolor sit amet consectetur adipisicing elit.'
  },
  {
    userSrc: 'assets/img/users/11.jpg',
    text: 'Fugit quaerat reprehenderit culpa sint soluta voluptas eos illum modi sapiente maxime sequi repellendus blanditiis.'
  },
  {
    userSrc: 'assets/img/users/12.jpg',
    text: 'Explicabo corporis, veritatis sint minima voluptates sequi eligendi debitis maxime, quidem quia sunt.'
  },
  {
    userSrc: 'assets/img/users/13.jpg',
    text: 'Laboriosam architecto unde temporibus qui numquam et assumenda distinctio obcaecati sunt'
  },
];

function Comments(props) {
  let totalComments = results && props.comments && props.comments.length;
  totalComments = `${totalComments} comment${totalComments > 1 ? 's' : ''}`;

  return (
    <div className="search-results">
      <h3>{totalComments}</h3>

      <ShouldRender if={props.isLoading}>
        <div className="spinner">
          <Spinner style={{ fontSize: '360%', color: '#ccc', animationDuration: '.5s' }} />
        </div>
      </ShouldRender>

      <ShouldRender if={!props.isLoading}>
        <FlatList
          list={props.comments && props.comments.length > 0 && props.comments}
          listView={(result, i) => (
            <div key={`search-${i}`}>
              <div>
                <AsyncImage src={result.userSrc} alt="user" />
                <span>{result.text}</span>
              </div>
              <footer>{new Date().toLocaleTimeString()}</footer>
              <Divider color="#f4f4f4" width="100%" />
            </div>
          )}
        />
      </ShouldRender>
    </div>
  )
}

function LoadMore() {
  return (
    <div className="load-more">
      Load more comments
    </div>
  )
}

export default function CommentDialog(props) {
  const { state, dispatch } = props;
  const [isLoading, setIsLoading] = useState(true);
  const [placeholder, setPlaceholder] = useState('Make a comment');
  const { comments, hasComments, postId } = state;
  const isAlreadyFetched = Object.keys(comments).includes(postId.toString());
  const loadedComments = comments && comments[postId] ? comments[postId] : [];

  const onSubmit = e => {
    e.preventDefault();
    setIsLoading(true);
  }

  useEffect(() => {
    if (state.isFetchingComments) {
      return;
    }

    if (hasComments && isAlreadyFetched) {
      setIsLoading(false);
      return;
    }

    FETCH_COMMENTS(dispatch, state.token, postId);
  }, []);

  useEffect(() => {
    if (isLoading) return;
    const text = loadedComments.length > 0 ? 'Make a comment.' : 'Be the first to make a comment.';
    setPlaceholder(text);
  });

  return (
    <div className="comment">
      <form onSubmit={onSubmit}>
        <input type="text" name="comment" placeholder={placeholder} />
        <button type="submit">
          <Icon name="chat_bubble_outline" />
        </button>
      </form>
      <Comments
        isLoading={isLoading}
        comments={loadedComments}
      />
      <LoadMore />
    </div>
  )
}
