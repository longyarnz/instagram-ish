import React, { useState } from 'react';

export default function NewsFeedHeader({ name, dispatch }) {
  const [closed, setClosed] = useState(false);

  const resetFilter = () => {
    setClosed(!closed);

    const x = setTimeout(() => {
      dispatch({
        type: 'REMOVE FILTER'
      });

      dispatch({
        type: 'NULL SEARCH TEXT'
      });

      clearTimeout(x);
    }, 400);
  }

  const className = closed ? 'newsfeed-header closed' : 'newsfeed-header';

  return (
    <section className={className}>
      <h2>
        <span>
          {name}
        </span>
        <i className="material-icons" onClick={resetFilter}>close</i>
      </h2>
    </section>
  )
}