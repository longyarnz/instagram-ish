import React, { useEffect } from 'react';
import NavBar from '../components/NavBar';
import NewsFeedSlide from '../components/NewsFeedSlide';
import Stories from '../components/Stories';
import Footer from '../components/Footer';
import ShouldRender from '../components/ShouldRender';
import { FETCH_POSTS } from '../Actions';

export default function NewsFeed(props) {
  const { state } = props;
  useEffect(() => {
    const { scrollTop } = state;
    if (scrollTop === null) return;
    document.scrollingElement.scrollTop = scrollTop;
  });

  useEffect(() => {
    if (!state.hasPosts && state.token !== null) {
      FETCH_POSTS(props.dispatch, state.token)
        .then(res => res && props.dispatch({ type: 'CACHE STATE' }));
    }
  }, [state.hasPosts, state.token]);

  return (
    <>
      <NavBar
        dispatch={props.dispatch}
        state={state}
        goTo={props.goTo}
      />

      <ShouldRender if={state.userIsLoggedIn}>
        <Stories />
      </ShouldRender>

      <NewsFeedSlide
        changingLikeStatus={state.isChangingLikeStatus}
        token={state.token}
        userId={state.user.id}
        likes={state.likes}
        hasPosts={state.hasPosts}
        posts={state.posts}
        dispatch={props.dispatch}
        userIsLoggedIn={state.userIsLoggedIn}
      />
      
      <Footer />
    </>
  )
}