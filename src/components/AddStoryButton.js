import React from 'react';
import Icon from './Icon';
import ShouldRender from './ShouldRender';

export default function AddStoryButton(props) {
  return (
    <div className="add-story-button" style={props.divStyle}>
      <div></div>
      <figure>
        <Icon name="add" width="100%" height="100%" style={props.iconStyle} />
        <ShouldRender if={!props.hideText}>
          <figcaption>
            Add Story
        </figcaption>
        </ShouldRender>
      </figure>
    </div>
  );
}
