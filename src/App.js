import React, { useReducer } from 'react';
import AsyncLoader from './AsyncLoader';
import { Reducers, InitialState } from './Store';

export const AppContext = React.createContext([]);

export default function App() {
  const appState = useReducer(Reducers, InitialState);
  const [state] = appState;

  return (
    <AppContext.Provider value={appState}>
      <AsyncLoader path={state.view} />
    </AppContext.Provider>
  )
}