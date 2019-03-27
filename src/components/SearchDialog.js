import React, { useState, useRef, useEffect } from 'react';
import Icon from './Icon';
import Spinner from './Spinner';
import { SEARCH } from '../Actions';
import SearchResults from './SearchResults';

export default function SearchDialog(props) {
  const _this = useRef(null);
  const [text, setText] = useState('');
  const [results, setResults] = useState({});
  const [isLoading, setIsLoading] = useState(false);
  const [placeholder, setPlaceholder] = useState('Search for Users and Posts');

  useEffect(() => {
    document.getElementsByTagName('input')[0].focus();
  }, []);

  useEffect(() => {
    _this.current = 'MOUNTED';
    return () => {
      _this.current = 'UNMOUNTED';
    }
  }, []);

  const onSubmit = e => {
    e.preventDefault();
    e.persist();
    if (isLoading) return;

    const text = e.target[0].value;
    setText(text);
    setIsLoading(true);

    const callback = results => {
      if (_this.current === 'UNMOUNTED') return;
      setIsLoading(false);
      setResults(results);
    }

    const onError = () => {
      if (_this.current === 'UNMOUNTED') return;
      e.target[0].value = '';
      setPlaceholder('Network Error: Unable to complete search.');
      setIsLoading(false);
      setTimeout(() => {
        _this.current === 'MOUNTED' && setPlaceholder('Search for Users and Posts');
      }, 5000);
    }

    if (props.state.search[text]) {
      callback(props.state.search[text]);
    }

    else SEARCH(props.dispatch, props.token, text, callback, onError);
  }

  let button = isLoading ?
    <Spinner style={{ animationDuration: '.35s' }} /> : <Icon name="arrow_forward" />;

  return (
    <div className="search">
      <form onSubmit={onSubmit} autoFocus={true}>
        <input
          type="search"
          name="search"
          placeholder={placeholder}
          defaultValue={props.state.searchText}
        />
        <button type="submit">{button}</button>
      </form>

      <SearchResults
        state={props.state}
        isLoading={isLoading}
        results={results}
        dispatch={props.dispatch}
        goTo={props.goTo}
        text={text}
      />
    </div>
  )
}