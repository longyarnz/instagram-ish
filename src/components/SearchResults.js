import React, { useState } from 'react';
import AsyncImage from './AsyncImage';
import Divider from './Divider';
import ShouldRender from './ShouldRender';
import { UserSearchTab, SearchTab, PostSearchTab } from './SearchTab';

export default function SearchResults(props) {
  const [showUsers, setUsers] = useState(false);
  const [showCats, setCats] = useState(false);
  const [showPosts, setPosts] = useState(false);
  const userNav = showUsers ? 'expand_less' : 'expand_more';
  const categoryNav = showCats ? 'expand_less' : 'expand_more';
  const postNav = showPosts ? 'expand_less' : 'expand_more';
  const { users = [], posts = [], categories = [] } = props.results;
  const total = users.length + posts.length;

  return (
    <div className="search-results">
      <h3>
        Search Results
      <small>{total}</small>
      </h3>

      <ShouldRender if={!props.isLoading}>
        <SearchTab
          totalResult={users.length}
          title={`User${users.length > 1 ? 's' : ''}`}
          icon={userNav}
          onClick={() => setUsers(!showUsers)}
          list={users}
          view={(user, i) => (
            <UserSearchTab key={`user-${i}`} user={user} />
          )}
        />

        <ShouldRender if={false}>
          <SearchTab
            totalResult={categories.length}
            title="Categories"
            icon={categoryNav}
            onClick={() => setCats(!showCats)}
            list={categories}
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

        <SearchTab
          totalResult={posts.length}
          title={`Post${posts.length > 1 ? 's' : ''}`}
          icon={postNav}
          onClick={() => setPosts(!showPosts)}
          list={posts}
          view={(post, i) => (
            <PostSearchTab key={`post-${i}`} post={post} i={i} />
          )}
        />
      </ShouldRender>
    </div>
  );
}
