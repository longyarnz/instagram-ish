import React from 'react';
import ProfileTab from './ProfileTab';
import ShouldRender from './ShouldRender';
import NewsFeedSlide from './NewsFeedSlide';

export default function Gallery(props) {
  const { tabs: [tab] } = props;
  const posts = props.state.posts.filter(i => i.liked_by_me);

  return (
    <div className="gallery">
      <ShouldRender if={tab === 0}>
        <ProfileTab {...props} />
      </ShouldRender>

      <ShouldRender if={tab === 2}>
        <NewsFeedSlide
          isViewingFromNewsFeed={false}
          hasPosts={true}
          posts={posts}
          emptyDivMessage="YOU HAVEN'T LIKED ANY POSTS"
          changingLikeStatus={props.state.isChangingLikeStatus}
          token={props.state.token}
          userId={props.state.user.id}
          likes={props.state.likes}
          dispatch={props.dispatch}
          userIsLoggedIn={props.state.userIsLoggedIn}
        />
      </ShouldRender>
    </div>
  )
}
