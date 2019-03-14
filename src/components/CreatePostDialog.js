import React, { useState, useEffect } from 'react';
import Spinner from './Spinner';
import { CREATE_POST } from '../Actions';
import Icon from './Icon';

export default function CreatePostDialog(props) {
  const [isLoading, setIsLoading] = useState(false);
  const [posted, setPosted] = useState(false);

  useEffect(() => {
    return () => {
      props.dispatch({
        type: 'NULL PREVIEW URL',
      });
    }
  });

  const onSubmit = e => {
    e.preventDefault();
    setIsLoading(true);
    const [category, caption] = e.target;
    const dependencies = [ category.value, caption.value, props.image ];

    if(dependencies.some(i => i === null)) {
      setIsLoading(false);
      return;
    }

    const callback = () => {
      setIsLoading(false);
      setPosted(true);
      caption.value = null;
      category.value = 'null';
      props.resetImage(null);
      setTimeout(() => {
        setPosted(false);
      }, 2000);
    }

    const form = new FormData();
    form.append('caption', caption.value);
    form.append('category', category.value);
    form.append('userId', props.userId);
    form.append('image', props.image);
    CREATE_POST(props.dispatch, props.token, form, callback);

  }

  let button = isLoading ? <Spinner style={{animationDuration: '.55s'}} /> : 'CREATE POST';
  button = posted ? <Icon name="check" /> : button;

  return (
    <div className="create-post-dialog">
      <form onSubmit={onSubmit}>
        <select name="category" required={true}>
          <option value="null">Category</option>
          <option value="gowns">Gowns</option>
          <option value="suits">Suits</option>
          <option value="Jackets">Jackets</option>
        </select>
        <input
          type="text"
          name="caption"
          placeholder="Caption your post..."
          autoCapitalize="on"
          autoComplete="on"
          spellCheck="true"
          required={true}
        />
        <button type="submit">
          { button }
        </button>
      </form>
    </div>
  )
}
