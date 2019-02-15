import React from 'react';
import { ForLoop } from './Utils';
import AddStoryButton from './AddStoryButton';
import Divider from './Divider';

export default function Stories() {
  const caption = [ 'Trouble', 'Faux Pais', 'Scream', 'Toy', "Skrillex", 'Marvel', 'Gift', 'Valentine' ];
  return (
    <section className="stories">
      <h2>Stories</h2>
      <ul>
        <li>
          <AddStoryButton />
        </li>
        <ForLoop
          times={8}
          loopView={i => {
            return (
              <li key={`store ${i}`}>
                <figure>
                  <img src={`assets/img/users/${i + 2}.jpg`} alt="story-caption" />
                  <figcaption>
                    {caption[i]}
                  </figcaption>
                </figure>
              </li>
            )
          }}
        />
      </ul>
      <Divider width="90%" color="#ccc" height="2px" extras={{marginTop: '-4.8px'}} />
    </section>
  )
}