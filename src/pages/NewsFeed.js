/* eslint-disable jsx-a11y/anchor-is-valid */
import React from 'react';
import NewsFeedHeader from '../components/NewsFeedHeader';
import NewsFeedNav from '../components/NewsFeedNav';
import NewsFeedSlide from '../components/NewsFeedSlide';

export default function NewsFeed() {
  return (
    <>
      <NewsFeedHeader />
      <NewsFeedNav />
      <NewsFeedSlide />
    </>
  )
}