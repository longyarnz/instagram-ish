import React from 'react'
import PickAFile from './PickAFile';

export default function DialogImagePreview(props) {
  return (
    <div className="dialog-image-preview">
      <PickAFile
        width="100%"
        height="100%"
        radius="5px"
        className="pick-a-file"
        src={null}
        required={true}
        name="image"
        preview={true}
        onSelect={props.onSelect}
      />
    </div>
  );
}
