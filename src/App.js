import React, { useReducer } from 'react';

function reducer(state, action) {
  switch (action.type) {
    default: return state;
  }
}

export const AppContext = React.createContext([]);

export default function App() {
  const AppState = useReducer(reducer, { view: 'Hello World' });
  return (
    <AppContext.Provider value={ AppState }>
      <section className="container">
        { AppState[0].view }
      </section>
    </AppContext.Provider>
  )
}