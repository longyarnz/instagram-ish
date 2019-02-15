import React from 'react';
import NavBar from '../components/NavBar';
import NewsFeedSlide from '../components/NewsFeedSlide';
import Stories from '../components/Stories';
import Footer from '../components/Footer';
import ShouldRender from '../components/ShouldRender';

export default function NewsFeed(props) {
  return (
    <>
      <NavBar />
      <ShouldRender if={props.state.userIsLoggedIn}>
        <Stories />
      </ShouldRender>
      <NewsFeedSlide />
      <Footer />
    </>
  )
}