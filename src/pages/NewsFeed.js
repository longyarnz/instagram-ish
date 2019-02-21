import React from 'react';
import NavBar from '../components/NavBar';
import NewsFeedSlide from '../components/NewsFeedSlide';
import Stories from '../components/Stories';
import Footer from '../components/Footer';
import Dialog from '../components/Dialog';
import AddPostButton from '../components/AddPostButton';
import ShouldRender from '../components/ShouldRender';
import CreatePostDialog from '../components/CreatePostDialog';

export default function NewsFeed(props) {
  return (
    <>
      <ShouldRender if={props.state.userIsLoggedIn && props.state.user.accountType === 'Fashion Designer'}>
        <AddPostButton dispatch={props.dispatch} />
      </ShouldRender>
      <ShouldRender if={props.state.showDialog}>
        <Dialog dispatch={props.dispatch}>
          <CreatePostDialog header="CREATE POST" height="62%" />
        </Dialog>
      </ShouldRender>
      <NavBar />
      <ShouldRender if={props.state.userIsLoggedIn}>
        <Stories />
      </ShouldRender>
      <NewsFeedSlide />
      <Footer />
    </>
  )
}