import React from 'react';
import ProfileTab from './ProfileTab';
import ShouldRender from './ShouldRender';
import NewsFeedSlide from './NewsFeedSlide';

export default function Gallery(props) {
  const { tabs: [tab], state } = props;
  const posts = state.posts.filter(i => i.user_id === props.state.userId);
  const emptyDivMessage = props.emptyDivMessage || `YOU HAVEN'T CREATED ANY POSTS YET`;

  return (
    <div className="gallery">
      <ShouldRender if={tab === 0}>
        <ProfileTab {...props} />
      </ShouldRender>

      <ShouldRender if={tab === 2}>
        <NewsFeedSlide
          isViewingFromNewsFeed={false}
          isViewingFromOwnProfile={props.isViewingFromOwnProfile}
          hasPosts={true}
          posts={posts}
          emptyDivMessage={emptyDivMessage}
          changingLikeStatus={state.isChangingLikeStatus}
          token={state.token}
          userId={state.user.id}
          likes={state.likes}
          dispatch={props.dispatch}
          userIsLoggedIn={state.userIsLoggedIn}
        />
      </ShouldRender>
    </div>
  )
}
