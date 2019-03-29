import React, { useState } from 'react';
import ShouldRender from './ShouldRender';
import { UserSearchTab, SearchTab, PostSearchTab, CategorySearchTab } from './SearchTab';

export default function SearchResults(props) {
  const [showUsers, setUsers] = useState(false);
  const [showCats, setCats] = useState(false);
  const [showPosts, setPosts] = useState(false);
  const userNav = showUsers ? 'expand_less' : 'expand_more';
  const categoryNav = showCats ? 'expand_less' : 'expand_more';
  const postNav = showPosts ? 'expand_less' : 'expand_more';
  const { searchText, search } = props.state;
  let { users = [], posts = [], categories = [] } = props.results;
  posts = searchText ? search[searchText].posts : posts;
  users = searchText ? search[searchText].users : users;
  categories = searchText ? search[searchText].categories : categories;
  const total = users.length + posts.length + categories.length;

  return (
    <div className="search-results">
      <h3>
        Search Results
      <small>{total}</small>
      </h3>

      <ShouldRender if={!props.isLoading}>
        <SearchTab
          totalResult={posts.length}
          title={`Post${posts.length > 1 ? 's' : ''}`}
          icon={postNav}
          onClick={() => setPosts(!showPosts)}
          list={posts}
          view={(post, i) => (
            <PostSearchTab
              key={`post-${i}`}
              post={post}
              i={i}
              text={props.text}
              dispatch={props.dispatch}
              posts={props.state.posts}
            />
          )}
        />

        <SearchTab
          totalResult={users.length}
          title={`User${users.length > 1 ? 's' : ''}`}
          icon={userNav}
          onClick={() => setUsers(!showUsers)}
          list={users}
          view={(user, i) => (
            <UserSearchTab
              id={props.state.user.id}
              key={`user-${i}`}
              user={user}
              goTo={props.goTo}
              text={props.text}
              dispatch={props.dispatch}
            />
          )}
        />

        <SearchTab
          totalResult={categories.length}
          title={`Categor${posts.length > 1 ? 'ies' : 'y'}`}
          icon={categoryNav}
          onClick={() => setCats(!showCats)}
          list={categories}
          view={(result, i) => (
            <CategorySearchTab
              key={`cat-${i}`}
              name={result.name}
              id={result.id}
              text={props.text}
              dispatch={props.dispatch}
              goTo={props.goTo}
            />
          )}
        />
      </ShouldRender>
    </div>
  );
}
