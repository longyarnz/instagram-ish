import React from 'react';
import Icon from './Icon';
import Divider from './Divider';
import AsyncImage from './AsyncImage';
import ShouldRender from './ShouldRender';
import { FlatList } from './Utils';

export function SearchTab(props) {
  return (
    <ul className={props.icon}>
      <h3 onClick={props.onClick}>
        <span>
          <small>{props.totalResult}</small>
          {props.title}
        </span>

        <ShouldRender if={props.totalResult > 0}>
          <Icon name={props.icon} />
        </ShouldRender>
      </h3>
      <FlatList list={props.list} listView={props.view} />
    </ul>
  );
}

export function UserSearchTab(props) {
  const origin = 'http://18.223.1.218';
  const src = props.user.photoPath ? `${origin}/${props.user.photoPath}`
    : '/assets/img/user.png';

  const showUserProfile = () => {
    if (props.id === props.user.userId) {
      props.goTo('./pages/Profile');

      // props.dispatch({
      //   type: 'NULL MODAL VIEW',
      // });
    }

    else {
      props.dispatch({
        type: 'VIEW A DIFFERENT USER PROFILE',
        payload: props.user
      });

      props.goTo('./pages/ViewProfile');
    }

    props.dispatch({
      type: 'SET SEARCH TEXT',
      payload: props.text
    });
  }

  return (
    <li className="search-user" key={`user-${props.i}`} onClick={showUserProfile}>
      <div>
        <AsyncImage src={src} alt="user" />
        <div>
          <span>{props.user.fullName}</span>
          <span>{props.user.username}</span>
        </div>
      </div>
      <Divider className="line" color="#f4f4f4" width="100%" />
    </li>
  );
}

export function CategorySearchTab(props) {
  const selectCategory = () => {
    props.dispatch({
      type: 'FILTER POSTS',
      payload: {
        by: 'categories',
        id: props.id
      }
    });

    props.dispatch({
      type: 'SET SEARCH TEXT',
      payload: props.text
    });

    props.dispatch({
      type: 'NULL MODAL VIEW'
    });
  }

  return (
    <li className="search-cat" onClick={selectCategory}>
      <span>
        {props.name}
      </span>
    </li>
  );
}

export function PostSearchTab(props) {
  const { posts, dispatch, post } = props;
  const origin = 'http://18.223.1.218';

  const selectPost = () => {
    const id = posts.findIndex(i => i.post_id === post.post_id);

    dispatch({
      type: 'SET SEARCH TEXT',
      payload: props.text
    });

    dispatch({
      type: 'FILTER POSTS',
      payload: {
        id, by: 'posts',
      }
    })

    dispatch({
      type: 'NULL MODAL VIEW'
    });
  }

  return (
    <li className="search-post" onClick={selectPost}>
      <div>
        {post.caption}
        <i className="material-icons">chevron_right</i>
      </div>
      <AsyncImage src={`${origin}/${post.image_path}`} alt="post" />
      <Divider className="line" color="#f4f4f4" width="100%" />
    </li>
  );
}