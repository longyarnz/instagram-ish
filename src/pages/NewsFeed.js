import React from 'react';
import NavBar from '../components/NavBar';
import NewsFeedSlide from '../components/NewsFeedSlide';
import Stories from '../components/Stories';
import Footer from '../components/Footer';
import Dialog from '../components/Dialog';
import DialogImagePreview from '../components/DialogImagePreview';
import AddPostButton from '../components/AddPostButton';
import ShouldRender from '../components/ShouldRender';
import CreatePostDialog from '../components/CreatePostDialog';

export default function NewsFeed(props) {
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
      <ShouldRender if={props.state.showDialog}>
        <Dialog 
          header="CREATE POST"
          dispatch={props.dispatch}
          upperDialog={
            <DialogImagePreview
              onSelect={image => {
                console.log(image);
                props.dispatch({
                type: 'STORE POST IMAGE',
                payload: image
              })}}
            />
          }
          upperDialogHeight="50%"
          lowerDialog={
            <CreatePostDialog height="50%" dispatch={props.dispatch} />
          }
          lowerDialogHeight="50%"
        />
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