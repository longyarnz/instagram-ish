import React, { useEffect } from 'react';
import NavBar from '../components/NavBar';
import NewsFeedSlide from '../components/NewsFeedSlide';
import Stories from '../components/Stories';
import Footer from '../components/Footer';
import AddPostButton from '../components/AddPostButton';
import ShouldRender from '../components/ShouldRender';
import { CreatePostModal, MenuModal, NotificationModal, SearchModal, CommentModal } from '../components/Modals';

export default function NewsFeed(props) {
  useEffect(() => {
    const { scrollTop } = props.state;
    if (scrollTop === null) return;
    document.scrollingElement.scrollTop = scrollTop;
  });

  useEffect(() => {
      
  }, []);

  return (
    <>
      <ShouldRender
        if={
          props.state.userIsLoggedIn &&
          props.state.user.accountType === 'Fashion Designer'
        }
      >
        <AddPostButton dispatch={props.dispatch} />
      </ShouldRender>

      <ShouldRender if={props.state.showAppMenu}>
        <MenuModal
          dispatch={props.dispatch}
          goTo={props.goTo}
          userIsLoggedIn={props.state.userIsLoggedIn}
          className="menu-dialog"
        />
      </ShouldRender>

      <ShouldRender if={props.state.showNotifications}>
        <NotificationModal
          dispatch={props.dispatch}
          goTo={props.goTo}
          className="notifications-dialog"
        />
      </ShouldRender>

      <ShouldRender if={props.state.showSearch}>
        <SearchModal
          dispatch={props.dispatch}
          goTo={props.goTo}
          className="search-dialog"
        />
      </ShouldRender>

      <ShouldRender if={props.state.showComment}>
        <CommentModal
          dispatch={props.dispatch}
          goTo={props.goTo}
          className="comment-dialog"
        />
      </ShouldRender>

      <ShouldRender if={props.state.showDialog}>
        <CreatePostModal dispatch={props.dispatch} />
      </ShouldRender>

      <NavBar
        dispatch={props.dispatch}
        state={props.state}
        goTo={props.goTo}
      />

      <ShouldRender if={props.state.userIsLoggedIn}>
        <Stories />
      </ShouldRender>

      <NewsFeedSlide dispatch={props.dispatch} userIsLoggedIn={props.state.userIsLoggedIn} />
      <Footer />
    </>
  )
}