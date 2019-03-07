import React, { useReducer, useEffect } from 'react';
import AsyncLoader from './AsyncLoader';
import { Reducers, InitialState } from './Store';

export const AppContext = React.createContext([]);

export default function App() {
  const appState = useReducer(Reducers, InitialState);
  const [ state, dispatch ] = appState;
  window.onbeforeunload = () => `Don't leave yet`;
  const dependencies = {
    './pages/NewsFeed': [
      'showDialog',
      'showAppMenu',
      'showNotifications',
      'showSearch',
      'userIsLoggedIn',
      'showComment',
      'hasPosts',
      'hasComments'
    ],
    './pages/Login': undefined
  }

  useEffect(() => {
    let cache = localStorage.staleState;
    if (cache && typeof JSON.parse(cache) === 'object') {
      console.log('Remount');
      dispatch({
        type: 'RESTORE STATE',
        payload: JSON.parse(localStorage.staleState)
      });

      return () => {
        dispatch({ type: 'CACHE STATE' })
      }
    }
  }, []);

  useEffect(() => {
    localStorage.removeItem('cachedImages');
  }, []);

  useEffect(() => {
    console.log([document.scrollingElement.scrollTop]);
  });

  return (
    <AppContext.Provider value={appState}>
      <AsyncLoader
        path={state.view}
        fallback={<div></div>}
        dependencies={dependencies[state.view]}
      />
    </AppContext.Provider>
  )
}