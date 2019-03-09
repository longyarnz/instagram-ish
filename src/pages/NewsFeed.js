import React, { useEffect } from 'react';
import NavBar from '../components/NavBar';
import NewsFeedSlide from '../components/NewsFeedSlide';
import Stories from '../components/Stories';
import Footer from '../components/Footer';
import AddPostButton from '../components/AddPostButton';
import ShouldRender from '../components/ShouldRender';
import { CreatePostModal, MenuModal, NotificationModal, SearchModal, CommentModal } from '../components/Modals';
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
      FETCH_POSTS(props.dispatch, state.token);
    }
  }, [state.hasPosts, state.token]);

  return (
    <>
      <ShouldRender
        if={
          state.userIsLoggedIn &&
          state.user.accountType === 'Fashion Designer'
        }
      >
        <AddPostButton
          hasPosts={state.hasPosts}
          lastAction={[...state.mutations].pop()}
          dispatch={props.dispatch}
        />
      </ShouldRender>

      <ShouldRender if={state.showAppMenu}>
        <MenuModal
          dispatch={props.dispatch}
          goTo={props.goTo}
          userIsLoggedIn={state.userIsLoggedIn}
          className="menu-dialog"
        />
      </ShouldRender>

      <ShouldRender if={state.showNotifications}>
        <NotificationModal
          dispatch={props.dispatch}
          goTo={props.goTo}
          className="notifications-dialog"
        />
      </ShouldRender>

      <ShouldRender if={state.showSearch}>
        <SearchModal
          dispatch={props.dispatch}
          goTo={props.goTo}
          className="search-dialog"
        />
      </ShouldRender>

      <ShouldRender if={state.showComment}>
        <CommentModal
          dispatch={props.dispatch}
          goTo={props.goTo}
          state={state}
          className="comment-dialog"
        />
      </ShouldRender>

      <ShouldRender if={state.showDialog}>
        <CreatePostModal dispatch={props.dispatch} />
      </ShouldRender>

      <NavBar
        dispatch={props.dispatch}
        state={state}
        goTo={props.goTo}
      />

      <ShouldRender if={state.userIsLoggedIn}>
        <Stories />
      </ShouldRender>

      <NewsFeedSlide
        hasPosts={state.hasPosts}
        posts={state.posts}
        dispatch={props.dispatch}
        userIsLoggedIn={state.userIsLoggedIn}
      />
      <Footer />
    </>
  )
}