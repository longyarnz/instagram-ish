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
  const [showUsers, setUsers] = useState(false);
  const [showCats, setCats] = useState(false);
  const [showPosts, setPosts] = useState(false);

  const users = showUsers ? 'expand_less' : 'expand_more';
  const categories = showCats ? 'expand_less' : 'expand_more';
  const posts = showPosts ? 'expand_less' : 'expand_more';

  return (
    <div className="search-results">
      <h3>Search Results</h3>

      <ShouldRender if={props.isLoading}>
        <div className="spinner">
          <Spinner style={{ fontSize: '360%', color: '#ccc', animationDuration: '.5s' }} />
        </div>
      </ShouldRender>

      <ShouldRender if={!props.isLoading && props.fetchedSearch}>
        <SearchTab
          totalResult={5}
          title="Users"
          icon={users}
          onClick={() => setUsers(!showUsers)}
          list={results}
          view={(result, i) => (
            <li key={`user-${i}`}>
              <div>
                <AsyncImage src={result.userSrc} alt="user" />
                <span>{result.text}</span>
              </div>
              <Divider color="#f4f4f4" width="100%" />
            </li>
          )}
        />

        <SearchTab
          totalResult={5}
          title="Categories"
          icon={categories}
          onClick={() => setCats(!showCats)}
          list={results}
          view={(result, i) => (
            <li key={`user-${i}`}>
              <div>
                <AsyncImage src={result.userSrc} alt="user" />
                <span>{result.text}</span>
              </div>
              <Divider color="#f4f4f4" width="100%" />
            </li>
          )}
        />

        <SearchTab
          totalResult={0}
          title="Posts"
          icon={posts}
          onClick={() => setPosts(!showPosts)}
          list={results}
          view={(result, i) => (
            <li key={`user-${i}`}>
              <div>
                <AsyncImage src={result.userSrc} alt="user" />
                <span>{result.text}</span>
              </div>
              <Divider color="#f4f4f4" width="100%" />
            </li>
          )}
        />
      </ShouldRender>
    </div>
  )
}

function SearchTab(props) {
  return (
    <ul className={props.icon}>
      <h3 onClick={props.onClick}>
        <span>
          <small>{props.totalResult}</small>
          {props.title}
        </span>

        <ShouldRender if={props.totalResult > 0}>
          <Icon name={props.icon} />
        </ShouldRender>
      </h3>
      <FlatList
        list={props.list}
        listView={props.view}
      />
    </ul>
  );
}

export default function SearchDialog(props) {
  const [isLoading, setIsLoading] = useState(false);

  const onSubmit = e => {
    e.preventDefault();
    setIsLoading(true);
  }

  let button = isLoading ?
    <Spinner style={{ animationDuration: '.55s' }} /> : <Icon name="arrow_forward" />;

  return (
    <div className="search">
      <form onSubmit={onSubmit}>
        <input type="search" name="search" placeholder="Search for Users and Posts" />
        <button type="submit">{button}</button>
      </form>

      <SearchResults isLoading={isLoading} fetchedSearch={true} />
    </div>
  )
}
