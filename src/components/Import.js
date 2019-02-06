import React, { Suspense, useContext } from 'react';
import { AppContext } from '../App';

export default function Import({ name }) {
  const Payload = React.lazy(
    () => import(`./${name}`)
  );
  const appState = useContext(AppContext);

  return (
    <Suspense fallback={<div>Loading...</div>}>
      <Payload appState={appState} />
    </Suspense>
  );
}