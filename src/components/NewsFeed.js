/* eslint-disable jsx-a11y/anchor-is-valid */
import React from 'react';
import NewsFeedHeader from './NewsFeedHeader';
import NewsFeedNav from './NewsFeedNav';
import NewsFeedSlide from './NewsFeedSlide';

export default function NewsFeed() {
  return (
    <>
      <NewsFeedHeader />
      <NewsFeedNav />
      <NewsFeedSlide />
    </>
  )
}