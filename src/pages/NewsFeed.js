/* eslint-disable jsx-a11y/anchor-is-valid */
import React from 'react';
import NewsFeedHeader from '../components/NewsFeedHeader';
import NewsFeedSlide from '../components/NewsFeedSlide';
import Stories from '../components/Stories';

export default function NewsFeed() {
  return (
    <>
      <NewsFeedHeader />
      <Stories />
      <NewsFeedSlide />
    </>
  )
}