import React, { useRef, useState } from 'react';
import Icon from './Icon';
import AsyncImage from './AsyncImage';

export default function PickAFile(props) {
  const [ src, setSrc ] = useState(props.src);
  const input = useRef(null);

  const style = {
    width: 0,
    height: 0,
    visibility: 'hidden'
  }

  const divStyle = {
    height: props.height,
    width: props.width
  }

  const onChange = async e => {
    const image = e.target.files[0];
    const src = URL.createObjectURL(image);
    setSrc(src);
    props.onSelect && props.onSelect(image);
  }

  const onClick = () => {
    input.current.click();
  }

  const container = {
    ...props.iconContainer,
    zIndex: src === props.src ? 1 : -1
  }

  return (
    <div className={props.className} style={divStyle} onClick={onClick}>
      <input type="file" style={style} ref={input} onChange={onChange} />
      <Icon name="add_a_photo" container={container} />
      <AsyncImage src={src} alt="upload" className={props.imageClass} />
    </div>
  )
}