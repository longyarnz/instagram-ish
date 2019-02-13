import React from 'react';
import Icon from './Icon';

export default function AddStoryButton() {
  return (
    <div className="add-story-button">
      <div></div>
      <figure>
        <Icon name="add" width="100%" height="100%" />
        <figcaption>
          Add Story
        </figcaption>
      </figure>
    </div>
  );
}
