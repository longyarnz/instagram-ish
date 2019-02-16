import React from 'react';
import { ForLoop } from './Utils';
import ProfileTab from './ProfileTab';
import AsyncImage from './AsyncImage';
import ShouldRender from './ShouldRender';
import NewsFeedSlide from './NewsFeedSlide';

export default function Gallery(props) {
  const { tabs: [ tab ] } = props;

  return (
    <div className="gallery">
      <ShouldRender if={tab === 0}>
        <ProfileTab {...props} />
      </ShouldRender>

      <ShouldRender if={tab === 1}>
        <ForLoop
          times={9}
          loopView={
            i => (
              <AsyncImage key={`tile=${i}`} className="tiles" src={`assets/img/users/${++i}.jpg`} />
            )
          }
        />
      </ShouldRender>

      <ShouldRender if={tab === 2}>
        <NewsFeedSlide />
      </ShouldRender>
    </div>
  )
}
