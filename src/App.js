import React, { useReducer, useEffect } from 'react';
import AsyncLoader from './AsyncLoader';
import { Reducers, InitialState } from './Store';
import ShouldRender from './components/ShouldRender';

export const AppContext = React.createContext({});

export default function App() {
  const appState = useReducer(Reducers, InitialState);
  const [state, dispatch] = appState;
  window.onbeforeunload = () => `Don't leave yet`;

  useEffect(() => {
    let cache = localStorage.staleState;
    if (cache && typeof JSON.parse(cache) === 'object') {
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

  const reloadComponentWhenThisChanges = {
    './pages/NewsFeed': [
      'userIsLoggedIn',
      'hasPosts',
      'newsfeedCounter'
    ],
    './pages/Login': 'DO NOT RERENDER',
    './pages/Register': 'DO NOT RERENDER',
    './pages/Profile': 'DO NOT RERENDER',
    './components/CommentModal': 'DO NOT RERENDER',
    './components/CreatePostModal': [
      'modalView'
    ],
    './pages/EditProfile': ['user']
  }

  return (
    <AppContext.Provider value={appState}>
      <AsyncLoader
        path={state.view}
        fallback={<div></div>}
        dependencies={reloadComponentWhenThisChanges[state.view]}
      />

      <ShouldRender if={state.modalView}>
        <AsyncLoader
          path={state.modalView}
          fallback={<div></div>}
          dependencies={reloadComponentWhenThisChanges[state.modalView]}
        />
      </ShouldRender>

      <ShouldRender
        if={
          state.userIsLoggedIn &&
          state.user.accountType === 'Fashion Designer' &&
          state.view === './pages/NewsFeed' 
        }
      >
        <AsyncLoader
          path="./components/AddPostButton"
          hasPosts={state.hasPosts}
          lastAction={[...state.mutations].pop()}
          dispatch={dispatch}
          dependencies={['createPostImage', 'hasPosts', 'view', 'modalView']}
        />
      </ShouldRender>
    </AppContext.Provider>
  )
}