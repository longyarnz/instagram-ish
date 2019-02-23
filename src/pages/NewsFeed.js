import React, { useEffect } from 'react';
import NavBar from '../components/NavBar';
import NewsFeedSlide from '../components/NewsFeedSlide';
import Stories from '../components/Stories';
import Footer from '../components/Footer';
import AddPostButton from '../components/AddPostButton';
import ShouldRender from '../components/ShouldRender';
import { CreatePostModal, MenuModal } from '../components/Modals';

export default function NewsFeed(props) {
  useEffect(() => {
    const { scrollTop } = props.state;
    if (scrollTop === null) return;
    document.scrollingElement.scrollTop = scrollTop;
  });

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
        <MenuModal dispatch={props.dispatch} className="menu-dialog" />
      </ShouldRender>

      <ShouldRender if={props.state.showDialog}>
        <CreatePostModal dispatch={props.dispatch} />
      </ShouldRender>

      <NavBar dispatch={props.dispatch} showAppMenu={props.state.showAppMenu} />

      <ShouldRender if={props.state.userIsLoggedIn}>
        <Stories />
      </ShouldRender>
      
      <NewsFeedSlide userIsLoggedIn={props.state.userIsLoggedIn} />
      <Footer />
    </>
  )
}