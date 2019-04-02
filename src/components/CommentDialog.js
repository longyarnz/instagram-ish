import React, { useState, useEffect, useRef } from 'react';
import { FlatList, calcTime } from './Utils';
import Divider from './Divider';
import Icon from './Icon';
import Spinner from './Spinner';
import ShouldRender from './ShouldRender';
import { FETCH_COMMENTS, POST_A_COMMENT } from '../Actions';

function Comments(props) {
  const _this = useRef(null);
  const [counter, setCounter] = useState(0);

  useEffect(() => {
    _this.current = 'MOUNTED';
    return () => {
      _this.current = 'UNMOUNTED';
    }
  }, []);

  useEffect(() => {
    const x = setTimeout(() => {
      if (_this.current === 'MOUNTED') setCounter(counter + 1);
    }, 60000);

    return () => {
      clearTimeout(x);
    }
  }, [counter]);

  let totalComments = props.comments.length;
  totalComments = `${totalComments || 'No'} comment${totalComments !== 1 ? 's' : ''}`;

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
          list={props.comments}
          listView={(result, i) => (
            <div key={`search-${i}`}>
              <div>
                <span>{result.user[0].username}:</span>
                <span>{result.comment}</span>
              </div>
              <footer>{calcTime(result.unix_time)}</footer>
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
  const [isLoading, setIsLoading] = useState(true);
  const [localComments, setLocalComments] = useState([]);
  const [isSending, setIsSending] = useState(false);
  const [placeholder, setPlaceholder] = useState('Make a comment');

  const _this = useRef(null);
  const { state, dispatch } = props;
  const { comments, hasComments, postId } = state;
  const isAlreadyFetched = Object.keys(comments).includes(postId.toString());

  useEffect(() => {
    _this.current = 'MOUNTED';
    return () => {
      _this.current = 'UNMOUNTED';
    }
  }, []);

  useEffect(() => {
    if (state.isFetchingComments || isSending) {
      return;
    }

    if (hasComments && isAlreadyFetched && state.comments[postId]) {
      setIsLoading(false);
      return;
    }

    const callback = response => {
      if (_this.current === 'UNMOUNTED') return;
      setIsLoading(false);
      !Array.isArray(response) && setPlaceholder('Error: Failed To Fetch Comments');
      Array.isArray(response) && setLocalComments(response);
    }

    const onError = () => {
      if (_this.current === 'UNMOUNTED') return;
      setPlaceholder('Network Error: Failed to load comments.');
      setIsLoading(false);
    }

    FETCH_COMMENTS(dispatch, state.token, postId, callback, onError);
  }, []);

  useEffect(() => {
    if (isLoading) return;
    const text = loadedComments.length > 0 ? 'Make a comment.' : 'Be the first to make a comment.';
    setPlaceholder(text);
  }, [localComments]);

  const onSubmit = e => {
    e.preventDefault();
    if (isLoading || isSending) return;

    const callback = response => {
      if (_this.current === 'UNMOUNTED') return;
      comment.value = null;
      typeof response === 'string' && setPlaceholder(response);
      setLocalComments(localComments.concat([response]));
      setIsSending(false);
    }

    const onError = () => {
      if (_this.current === 'UNMOUNTED') return;
      setPlaceholder('Network Error: Unable to post comment.');
      setIsSending(false);
    }

    setIsSending(true);
    const [comment] = e.target;
    POST_A_COMMENT(props.dispatch, state.token, state.user.id, postId, comment.value, callback, onError);
  }

  const loadedComments = comments && comments[postId] ?
    [...comments[postId], ...localComments] : localComments;

  return (
    <div className="comment">
      <form onSubmit={onSubmit}>
        <input type="text" name="comment" placeholder={placeholder} />

        <button type="submit">
          <ShouldRender if={isSending}>
            <Spinner style={{ color: '#1c3451', animationDuration: '.5s' }} />
          </ShouldRender>

          <ShouldRender if={!isSending}>
            <Icon name="chat_bubble_outline" />
          </ShouldRender>
        </button>
      </form>

      <Divider className="border" color="#f8ba0d" width="calc(100% - 28px)" height="3px" />

      <Comments
        isLoading={isLoading}
        comments={loadedComments}
      />

      <ShouldRender if={false}>
        <LoadMore />
      </ShouldRender>
    </div>
  )
}
