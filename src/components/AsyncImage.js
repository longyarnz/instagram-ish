import React, { useState, useEffect } from 'react';
import Spinner from './Spinner';

export default function AsyncImage({ src, ...props }) {
  const [ view, setView ] = useState(
    <Spinner style={{ fontSize: '300%' }} />
  );

  const fetchImage = async () => {
    let image = await fetch(src);
    image = await image.blob();
    image = URL.createObjectURL(image);
    setView(
      <img src={image} alt={props.alt} {...props} />
    );
  }

  useEffect(() => {fetchImage()}, [])
  
  return view;
}