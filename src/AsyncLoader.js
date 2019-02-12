import React, { Suspense, useContext } from 'react';
import { AppContext } from './App';
import Spinner from './components/Spinner';

export default function AsyncLoader({ path, ...props }) {
  const [ state, dispatch ] = useContext(AppContext);
  const goTo = page => dispatch({ type: 'CHANGE VIEW', payload: `${page}` });
  const LoadComponent = () => import(`${path}`);
  const Payload = React.lazy(LoadComponent);

  return (
    <Suspense fallback={props.fallback || <Spinner />}>
      <Payload state={state} dispatch={dispatch} goTo={goTo} {...props} />
    </Suspense>
  );
}