import React from 'react';
import { ForLoop } from './Utils';
import AddStoryButton from './AddStoryButton';
import Divider from './Divider';

export default function Stories() {
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
                  <img src="assets/img/users/18.jpg" alt="story-caption" />
                  <figcaption>
                    Dominerf
                  </figcaption>
                </figure>
              </li>
            )
          }}
        />
      </ul>
      <Divider width="90%" color="#ccc" />
    </section>
  )
}