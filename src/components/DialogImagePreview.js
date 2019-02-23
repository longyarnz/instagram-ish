import React, { useRef, useEffect } from 'react'
import PickAFile from './PickAFile';

export default function DialogImagePreview(props) {
  const div = useRef(null);

  const style = {
    opacity: 0
  }

  useEffect(() => {
    document.documentElement.style.overflow = 'hidden';
    
    const x = setTimeout(() => div.current.style.opacity = 1, 250);
    
    return () => {
      div.current.style.opacity = 0;
      clearTimeout(x);
    }
  });

  return (
    <div className="dialog-image-preview" ref={div} style={style}>
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
