import React, { useRef, useEffect } from 'react';
import AddStoryButton from './AddStoryButton';
import { injectScrollSetter } from './Utils';

export default function AddPostButton(props) {
  const div = useRef(null);
  const { dispatch, state } = props;
  const { modalView } = state;

  const onClick = injectScrollSetter(
    dispatch, state.view, () => {
      props.dispatch({
        type: 'SET MODAL VIEW',
        payload: `./components/CreatePostModal`
      });
    }
  );

  useEffect(() => {
    if (!props.hasPosts) return;
    if (modalView) {
      const opacity = '0';
      setTimeout(() => div.current.style.opacity = opacity, 50);
    }

    const position = '35px';
    setTimeout(() => div.current.style.bottom = position, 50);
  }, []);

  let style = null;
  if (modalView) {
    const bottom = '35px';
    style = { bottom }
  }

  return (
    <div className="add-post-container" style={style} ref={div} onClick={onClick}>
      <AddStoryButton
        name="bubble_chart"
        hideText={true}
      />
    </div>
  )
}