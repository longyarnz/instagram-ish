import React, { useState, useEffect, useRef } from 'react';
import Spinner from './Spinner';
import { CREATE_POST } from '../Actions';
import Icon from './Icon';
import { FlatList } from './Utils';

export default function CreatePostDialog(props) {
  const _this = useRef(null);
  const [isPosting, setIsPosting] = useState(false);
  const [posted, setPosted] = useState(false);
  const [select, setSelect] = useState(undefined);

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

  const onSubmit = e => {
    e.preventDefault();

    if (isPosting) return;

    else if (select === undefined) {
      e.target[6].setCustomValidity('Select an account type');
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

  let button = isPosting ? <Spinner style={{ animationDuration: '.55s' }} /> : 'CREATE POST';
  button = posted === true ? <Icon name="check" /> : (
    posted === 'error' ? 'NETWORK ERROR' : button);

  const backgroundColor = posted === true ? '#5cb85c' : (
    posted === 'error' ? '#d9534f' : null
  );

  const style = { backgroundColor };

  const onChangeSelect = e => {
    const select = e.target;
    const check = select.value === undefined ? 'Select an account type' : '';
    select.setCustomValidity(check);
    setSelect(select.value);
  }

  return (
    <div className="create-post-dialog">
      <form onSubmit={onSubmit}>
        <select name="category" required={true} onChange={onChangeSelect}>
          <option value={undefined}>Select a category</option>
          <FlatList
            list={props.categories}
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
        <input
          type="text"
          name="caption"
          placeholder="Caption your post..."
          autoCapitalize="on"
          autoComplete="on"
          spellCheck="true"
          required={true}
          maxLength={30}
        />
        <button type="submit" style={style}>
          {button}
        </button>
      </form>
    </div>
  )
}
