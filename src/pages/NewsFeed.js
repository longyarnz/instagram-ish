import React, { useEffect } from 'react';
import NavBar from '../components/NavBar';
import NewsFeedSlide from '../components/NewsFeedSlide';
import Stories from '../components/Stories';
import NewsFeedHeader from '../components/NewsFeedHeader';
import Footer from '../components/Footer';
import ShouldRender from '../components/ShouldRender';
import { FETCH_POSTS } from '../Actions';
import useScroll from '../components/useScroll';

export default function NewsFeed(props) {
  const { state, dispatch, goTo } = props;
  useScroll(props);

  useEffect(() => {
    if (!state.hasPosts && state.token !== null) {
      FETCH_POSTS(dispatch, state.token)
        .then(res => res && dispatch({ type: 'CACHE STATE' }));
    }
  }, [state.hasPosts, state.token]);

  let name = '';
  const getFilteredPosts = () => {
    const { filter, posts } = state;
    const x = text => text.toLowerCase();
    
    if (filter.by === 'categories') {
      name = state.categories[parseInt(filter.id)].name;
      return posts.filter(post => {
        return x(name) === 'show all'
          ? post
          : x(post.category) === x(name);
      });
    }

    else if (filter.by === 'posts') {
      const filteredPost = state.posts[parseInt(filter.id)];
      name = 'Cancel Search';
      return [ filteredPost ];
    }
  }

  const posts = state.filter.id === null ? state.posts : getFilteredPosts();

  return (
    <>
      <NavBar
        dispatch={dispatch}
        state={state}
        goTo={goTo}
      />

      <ShouldRender if={false && state.userIsLoggedIn}>
        <Stories />
      </ShouldRender>

      <ShouldRender if={state.filter.id !== null}>
        <NewsFeedHeader name={name} dispatch={dispatch} />
      </ShouldRender>

      <NewsFeedSlide
        isViewingFromNewsFeed={true}
        changingLikeStatus={state.isChangingLikeStatus}
        token={state.token}
        userId={state.user.id}
        likes={state.likes}
        hasPosts={state.hasPosts}
        posts={posts}
        dispatch={dispatch}
        view={state.view}
        userIsLoggedIn={state.userIsLoggedIn}
        profilePic={state.user.photo}
        postIsFiltered={Boolean(state.filter.id)}
      />

      <Footer />
    </>
  )
}