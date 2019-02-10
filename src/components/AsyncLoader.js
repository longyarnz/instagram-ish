import React, { Suspense, useContext } from 'react';
import { AppContext } from '../App';
import Spinner from './Spinner';

export default function AsyncLoader({ path, ...props }) {
  const [ state, dispatch ] = useContext(AppContext);
  
  const Payload = React.lazy(
    () => import(`${path}`)
  );

  return (
    <Suspense fallback={<Spinner />}>
      <Payload state={state} dispatch={dispatch} {...props} />
    </Suspense>
  );
}