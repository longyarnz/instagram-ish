import React, { useState } from 'react';
import ShouldRender from './ShouldRender';
import Icon from './Icon';
import { FlatList } from './Utils';

export default function MenuDialog(props) {
  const [showNots, setNots] = useState(false);
  const [showCats, setCats] = useState(true);
  const [showSets, setSets] = useState(true);

  const notifications = showNots ? 'expand_less' : 'expand_more';
  const categories = showCats ? 'expand_less' : 'expand_more';
  const settings = showSets ? 'expand_less' : 'expand_more';

  const selectCategory = id => {
    props.dispatch({
      type: 'SET SCROLL TOP',
      payload: {
        './pages/NewsFeed': 0
      }
    });

    props.dispatch({
      type: 'FILTER POSTS',
      payload: {
        id, by: 'categories',
      }
    })

    props.dispatch({
      type: 'NULL MODAL VIEW'
    });
  }

  return (
    <>
      <ShouldRender if={false}>
        <ul className={`no-decoration ${notifications}`}>
          <h3 onClick={() => setNots(!showNots)}>
            Notifications
            <span></span>
            <Icon name={notifications} />
          </h3>
          <li>Sarah Added Pictures</li>
          <li>Michael changed his cover picture</li>
        </ul>
      </ShouldRender>

      <ShouldRender if={props.userIsLoggedIn}>
        <ul className={categories}>
          <h3 onClick={() => setCats(!showCats)}>
            Categories <Icon name={categories} />
          </h3>
          <FlatList
            list={props.categories}
            listView={(cat, i) => (
              <li
                key={`menu-${i}`}
                value={cat.id}
                onClick={() => selectCategory(cat.id)}
              >
                {cat.name}
              </li>
            )}
          />
        </ul>

        <ul className={settings}>
          <h3 onClick={() => setSets(!showSets)}>
            Profile <Icon name={settings} />
          </h3>
          <li onClick={() => {
            props.dispatch({ type: 'NULL MODAL VIEW' });
            props.goTo('./pages/Profile');
          }}>View Profile</li>
          <li onClick={() => {
            props.dispatch({ type: 'LOG USER OUT' });
            props.goTo('./pages/NewsFeed');
          }}>Log Out</li>
        </ul>
      </ShouldRender>

      <ShouldRender if={!props.userIsLoggedIn}>
        <ul className="profile-menu">
          <h3>Profile</h3>
          <li onClick={() => props.goTo('./pages/Register')}>
            <Icon name="contacts" />
            <span>
              Register
            </span>
          </li>
          <li onClick={() => props.goTo('./pages/Login')}>
            <Icon name="account_circle" />
            <span>
              Login
            </span>
          </li>
        </ul>
      </ShouldRender>
    </>
  )
}
