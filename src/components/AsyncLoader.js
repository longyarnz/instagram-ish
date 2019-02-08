import React, { Suspense, useContext } from 'react';
import { AppContext } from '../App';

export default function AsyncLoader({ path, ...props }) {
  const [ state, dispatch ] = useContext(AppContext);
  
  const Payload = React.lazy(
    () => import(`${path}`)
  );

  return (
    <Suspense fallback={<div>Loading...</div>}>
      <Payload state={state} dispatch={dispatch} {...props} />
    </Suspense>
  );
}