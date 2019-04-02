import React, { Suspense, useContext, useMemo } from 'react';
import { AppContext } from './App';
import Spinner from './components/Spinner';

export default function AsyncLoader({ path, ...props }) {
  const [state, dispatch] = useContext(AppContext);
  const goTo = page => dispatch({ type: 'CHANGE VIEW', payload: `${page}` });
  const LoadComponent = () => import(`${path}`);
  const Payload = React.lazy(LoadComponent);

  let dependencies = {
    string: () => ['FIXED'],
    object: () => props.dependencies.map(dep => state[dep]),
    undefined: () => [state.mutations]
  }

  const type = typeof props.dependencies;

  dependencies = props.localState ? () => props.dependencies : dependencies[type];

  dependencies = JSON.stringify(dependencies());

  return useMemo(() => (
    <Suspense fallback={props.fallback ? props.fallback : <Spinner />}>
      <Payload state={state} dispatch={dispatch} goTo={goTo} {...props} />
    </Suspense>
  ), [dependencies]);
}