import React, { useReducer } from 'react';
import AsyncLoader from './components/AsyncLoader';

function reducer(state, action) {
  const mutations = state.mutations.concat([action.type]);
  
  switch (action.type) {
    case 'CHANGE VIEW':
      return { ...state, mutations, view: action.payload }
    default: return state;
  }
}

export const AppContext = React.createContext([]);

export default function App() {
  const initialState = { view: './NewsFeed', mutations: [] };
  const appState = useReducer(reducer, initialState);
  const [state] = appState;

  return (
    <AppContext.Provider value={appState}>
      <AsyncLoader path={state.view} />
    </AppContext.Provider>
  )
}