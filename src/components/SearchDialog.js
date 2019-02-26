import React, { useState } from 'react';
import { FlatList } from './Utils';
import AsyncImage from './AsyncImage';
import Divider from './Divider';
import Icon from './Icon';
import Spinner from './Spinner';
import ShouldRender from './ShouldRender';

const results = [
  {
    userSrc: 'assets/img/users/10.jpg',
    text: 'Lorem ipsum dolor sit amet consectetur adipisicing elit.'
  },
  {
    userSrc: 'assets/img/users/11.jpg',
    text: 'Fugit quaerat reprehenderit culpa sint soluta voluptas eos illum modi sapiente maxime sequi repellendus blanditiis.'
  },
  {
    userSrc: 'assets/img/users/12.jpg',
    text: 'Explicabo corporis, veritatis sint minima voluptates sequi eligendi debitis maxime, quidem quia sunt.'
  },
  {
    userSrc: 'assets/img/users/13.jpg',
    text: 'Laboriosam architecto unde temporibus qui numquam et assumenda distinctio obcaecati sunt'
  },
];

function SearchResults(props) {
  return (
    <div className="search-results">
      <h3>Search Results</h3>

      <ShouldRender if={props.isLoading}>
        <div className="spinner">
          <Spinner style={{ fontSize: '360%', color: '#ccc', animationDuration: '.5s' }} />
        </div>
      </ShouldRender>

      <FlatList
        list={results}
        listView={(result, i) => (
          <div key={`search-${i}`}>
            <div>
              <AsyncImage src={result.userSrc} alt="user" />
              <span>{result.text}</span>
            </div>
            <Divider color="#f4f4f4" width="100%" />
          </div>
        )}
      />
    </div>
  )
}

export default function SearchDialog(props) {
  const [isLoading, setIsLoading] = useState(false);

  const onSubmit = e => {
    e.preventDefault();
    setIsLoading(true);
    console.log(e.target[0]);
  }
  return (
    <div className="search">
      <form onSubmit={onSubmit}>
        <input type="search" name="search" />
        <button type="submit">
          <Icon name="arrow_forward" />
        </button>
      </form>
      <SearchResults isLoading={isLoading} />
    </div>
  )
}
