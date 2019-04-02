import React, { useState, useEffect, useRef } from 'react';
import Spinner from './Spinner';
import { CREATE_POST } from '../Actions';
import Icon from './Icon';
import { FlatList } from './Utils';

export default function CreatePostDialog(props) {
  const _this = useRef(null);
  const [counter, setCounter] = useState(0);
  const [posted, setPosted] = useState(false);
  const [select, setSelect] = useState(undefined);
  const [isPosting, setIsPosting] = useState(false);
  const [readyToPost, setReadyToPost] = useState(false);

  useEffect(() => {
    _this.current = 'MOUNTED';
    return () => {
      _this.current = 'UNMOUNTED';
    }
  }, []);

  useEffect(() => {
    return () => {
      props.dispatch({
        type: 'NULL PREVIEW URL',
      });
    }
  });

  useEffect(() => {
    const form = document.getElementsByTagName('form')[0];
    const [category, caption] = form;
    const dependencies = [category.value, caption.value, props.image];

    if (dependencies.some(i => i === null || i === '' || i === 'Select a category')) {
      setIsPosting(false);
      setReadyToPost(false);

      if (category.value === undefined) {
        category.setCustomValidity('Select a category type');
      }

      else if (props.image === null) {
        category.setCustomValidity('Click the camera icon and select an image');
      }

      else {
        category.setCustomValidity('');
      }
    }

    else {
      setReadyToPost(true);
    }
  });

  const onSubmit = e => {
    e.preventDefault();

    if (isPosting || !readyToPost) return;

    else if (select === undefined) {
      e.target[0].setCustomValidity('Select a category type');
      return;
    }

    setIsPosting(true);
    const [category, caption] = e.target;
    const dependencies = [category.value, caption.value, props.image];

    if (dependencies.some(i => i === null)) {
      setIsPosting(false);
      return;
    }

    const callback = () => {
      if (_this.current === 'UNMOUNTED') return;

      setIsPosting(false);
      setPosted(true);
      caption.value = null;
      category.value = 'null';
      props.resetImage(null);
      setTimeout(() => {
        _this.current === 'MOUNTED' && setPosted(false);
      }, 2000);
    }

    const onError = () => {
      if (_this.current === 'UNMOUNTED') return;

      setIsPosting(false);
      setPosted('error');
      setTimeout(() => {
        _this.current === 'MOUNTED' && setPosted(false);
      }, 2000);
    }

    const form = new FormData();
    form.append('caption', caption.value);
    form.append('categoryId', category.value);
    form.append('image', props.image);

    CREATE_POST(props.dispatch, props.token, form, callback, onError);
  }

  let button = isPosting ? (
    <Spinner style={{ animationDuration: '.55s' }} />
  ) : 'CREATE POST';

  button = posted === true ? <Icon name="check" /> : (
    posted === 'error' ? 'NETWORK ERROR' : button);

  const backgroundColor = posted === true ? '#5cb85c' : (
    posted === 'error' ? '#d9534f' : null
  );

  const style = { backgroundColor };

  const onChangeSelect = e => {
    const select = e.target;
    const condition = [undefined, 'Select a category', null].includes(select.value);

    const check = condition ? 'Select a category type' : '';
    condition && setReadyToPost(false);

    select.setCustomValidity(check);
    setSelect(select.value);
  }

  const onChangeText = e => {
    const text = e.target;
    const condition = text.value === '';
    setCounter(counter + 1);
    condition && setReadyToPost(false);
  }

  const buttonStyle = !readyToPost ? {
    backgroundColor: '#ccc', color: '#f9f9f9'
  } : null;

  return (
    <div className="create-post-tab">
      <form onSubmit={onSubmit}>
        <select name="category" required={true} onChange={onChangeSelect}>
          <option value={undefined}>Select a category</option>
          <FlatList
            list={props.categories.filter(i => i.name !== 'Show All')}
            listView={(cat, i) => (
              <option
                key={`option-${i}`}
                value={cat.id}
              >
                {cat.name}
              </option>
            )}
          />
        </select>

        <textarea
          type="text"
          name="caption"
          placeholder="Caption your post..."
          autoCapitalize="on"
          autoComplete="on"
          spellCheck="true"
          required={true}
          rows={4}
          onChange={onChangeText}
        />
        
        <button 
          type="submit" 
          style={{ ...buttonStyle, ...style }} 
          disabled={!readyToPost}
        >
          { button }
        </button>
      </form>
    </div>
  )
}
