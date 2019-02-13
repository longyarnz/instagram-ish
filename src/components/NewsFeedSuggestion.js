import React from 'react';
import AsyncImage from './AsyncImage';
export default function NewsFeedSuggestion(props) {
  return (<div className="suggestion-body">
    <AsyncImage className="img-responsive img-circle" src={props.src} alt="story-pictures" />
    <div className="name-box">
      <h4>{props.name}</h4>
      <span>@{props.name.split(' ')[0].toLowerCase()}</span>
    </div>
    <span><i className="fa fa-plus"></i></span>
  </div>);
}
