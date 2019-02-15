import React from 'react';
import { ForLoop } from './Utils';
import AsyncImage from './AsyncImage';
import ShouldRender from './ShouldRender';
import NewsFeedSlide from './NewsFeedSlide';

export default function Gallery(props) {
  const [ state ] = props.state;

  return (
    <div className="gallery">
      <ShouldRender if={state === 0}>
        <ForLoop
          times={9}
          loopView={
            i => (
              <AsyncImage key={`tile=${i}`} className="tiles" src={`assets/img/users/${++i}.jpg`} />
            )
          }
        />
      </ShouldRender>
      <ShouldRender if={state === 1}>
        <NewsFeedSlide />
      </ShouldRender>
    </div>
  )
}
