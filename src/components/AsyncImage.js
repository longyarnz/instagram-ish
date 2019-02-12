import React, { useState } from 'react';
import Spinner from './Spinner';
import ShouldRender from './ShouldRender';

export default function AsyncImage({ src, ...props }) {
  const [view, setView] = useState(true);
  
  const removeSpinner = () => {
    setView(false);
    let cachedImages = localStorage.getItem('cachedImages');
    cachedImages = cachedImages !== null && JSON.parse(cachedImages);

    cachedImages = Array.isArray(cachedImages) ? (
      !cachedImages.some(imageSrc => imageSrc === src) ? cachedImages.concat([src]) : cachedImages
    ) : [src];

    cachedImages = JSON.stringify(cachedImages);
    localStorage.setItem('cachedImages', cachedImages);
  }

  const imageHasNotBeenLoaded = (() => {
    let cachedImages = localStorage.getItem('cachedImages');
    cachedImages = cachedImages !== null && JSON.parse(cachedImages);

    return Array.isArray(cachedImages) ?
      !cachedImages.some(imageSrc => imageSrc === src) :
      true;
  })()

  return (
    <>
      <ShouldRender if={view && imageHasNotBeenLoaded}>
        <Spinner style={{ fontSize: '300%' }} />
      </ShouldRender>
      <img src={src} alt={props.alt} {...props} onLoad={removeSpinner} />
    </>
  );
}