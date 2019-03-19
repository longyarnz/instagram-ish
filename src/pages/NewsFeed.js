import React, { useEffect } from 'react';
import NavBar from '../components/NavBar';
import NewsFeedSlide from '../components/NewsFeedSlide';
import Stories from '../components/Stories';
import Footer from '../components/Footer';
import ShouldRender from '../components/ShouldRender';
import { FETCH_POSTS } from '../Actions';

export default function NewsFeed(props) {
  const { state, dispatch, goTo } = props;

  useEffect(() => {
    const { scrollTop, view } = state;
     
    setTimeout(() => {
      document.scrollingElement.scrollTop = scrollTop[view];
      dispatch({
        type: 'NULL SCROLL TOP',
        payload: {
          [view]: 0
        }
      })
    }, 10);
  }, []);

  useEffect(() => {
    if (!state.hasPosts && state.token !== null) {
      FETCH_POSTS(dispatch, state.token)
        .then(res => res && dispatch({ type: 'CACHE STATE' }));
    }
  }, [state.hasPosts, state.token]);

  return (
    <>
      <NavBar
        dispatch={dispatch}
        state={state}
        goTo={goTo}
      />

      <ShouldRender if={state.userIsLoggedIn}>
        <Stories />
      </ShouldRender>

      <NewsFeedSlide
        isViewingFromNewsFeed={true}
        changingLikeStatus={state.isChangingLikeStatus}
        token={state.token}
        userId={state.user.id}
        likes={state.likes}
        hasPosts={state.hasPosts}
        posts={state.posts}
        dispatch={dispatch}
        userIsLoggedIn={state.userIsLoggedIn}
        profilePic={state.user.photo}
      />

      <Footer />
    </>
  )
}