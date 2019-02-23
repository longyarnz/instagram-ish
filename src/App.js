import React, { useReducer, useEffect } from 'react';
import AsyncLoader from './AsyncLoader';
import { Reducers, InitialState } from './Store';

export const AppContext = React.createContext([]);

export default function App() {
  const appState = useReducer(Reducers, InitialState);
  const [ state ] = appState;
  window.onbeforeunload = () => `Don't leave yet`;
  const dependencies = {
    './pages/NewsFeed': ['showDialog', 'showAppMenu'],
    './pages/Login': undefined
  }

  useEffect(() => {
    localStorage.clear();
  }, [])

  useEffect(() => {
    console.log([ document.scrollingElement.scrollTop ]);
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