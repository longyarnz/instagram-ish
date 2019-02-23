import React from 'react';
import { FlatList } from './Utils';
import NewsFeedTab from './NewsFeedTab';

export const Posts = [
  {
    author: 'Eleanor Harper',
    profession: 'Continental Fashionist',
    time: (i) => `${i}hr${i > 1 ? 's' : ''} ago`,
    likes: 25,
    comments: 13
  },
  {
    author: 'Christopher Williamson',
    profession: 'Hard Suite Tailor',
    time: (i) => `${i}hr${i > 1 ? 's' : ''} ago`,
    likes:  75,
    comments: 52
  },
  {
    author: 'Felicity Smoak',
    profession: '+La Roiuge',
    time: (i) => `${i}hr${i > 1 ? 's' : ''} ago`,
    likes: 2,
    comments: 14
  }
]

export default function NewsFeedSlide() {
  return (
    <section className="newsfeed-slide">
      <div className="container-fluid">
        <div className="row">
          <div className="col-lg-3">
            <FlatList
              list={Posts}
              listView={(post, i) => (
                <NewsFeedTab
                  author={post.author}
                  profession={post.profession}
                  userSrc={`assets/img/users/${++i}.jpg`}
                  src={`assets/img/posts/1.jpg`}
                  time={post.time(i)}
                  likes={post.likes}
                  comments={post.comments}
                  key={`tab-${i}`}
                />
              )}
            />
          </div>
        </div>
      </div>
    </section >
  )
}