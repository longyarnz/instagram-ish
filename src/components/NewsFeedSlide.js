/* eslint-disable jsx-a11y/anchor-is-valid */

import React from 'react';
import { FlatList, ForLoop } from './Utils';
import AsyncImage from './AsyncImage';
import { NewsFeedTab } from './NewsFeedTab';

export const Users = [
  {
    name: 'Eleanor Harper',
    profession: 'Continental Fashionist',
    time: (i) => `${i}hr${i > 1 ? 's' : ''} ago`,
  },
  {
    name: 'Christopher Williamsom',
    profession: 'Hard Suite Tailor',
    time: (i) => `${i}hr${i > 1 ? 's' : ''} ago`,
  },
  {
    name: 'Felicity Smoak',
    profession: '+La Roiuge',
    time: (i) => `${i}hr${i > 1 ? 's' : ''} ago`,
  }
]

export default function NewsFeedSlide() {
  return (
    <section className="newsfeed-slide">
      <div className="container-fluid">
        <div className="row">
          <div className="col-lg-3">
            <FlatList
              list={Users}
              listView={(user, i) => (
                <NewsFeedTab
                  name={user.name}
                  profession={user.profession}
                  userSrc={`assets/img/users/${++i}.jpg`}
                  src={`assets/img/posts/1.jpg`}
                  time={user.time(i)}
                  key={`tab-${i}`}
                />
              )}
            />

            <div className="trending-box hidden-xs hidden-md">
              <div className="row">
                <div className="col-lg-12">
                  <a href="photo_stories.html"><h4>More stories</h4></a>
                </div>
              </div>
            </div>
          </div>

        </div>
      </div>
    </section >
  )
}

function NewsFeedCardBox(props) {
  return (
    <div className="cardbox">
      <div className="cardbox-heading">
        <div className="dropdown pull-right">
          <button className="btn btn-secondary btn-flat btn-flat-icon" type="button" data-toggle="dropdown" aria-expanded="false">
            <em className="fa fa-ellipsis-h"></em>
          </button>

          <div className="dropdown-menu dropdown-scale dropdown-menu-right" role="menu" style={props.style}>
            <a className="dropdown-item" href="#">Hide post</a>
            <a className="dropdown-item" href="#">Stop following</a>
            <a className="dropdown-item" href="#">Report</a>
          </div>
        </div>

        <div className="media m-0">
          <div className="d-flex mr-3">
            <a href="#">
              <AsyncImage className="img-responsive img-circle" src={props.userSrc} alt="User" />
            </a>
          </div>
          <div className="media-body">
            <p className="m-0">{props.name}</p>
            <small><span>10 hours ago</span></small>
          </div>
        </div>
      </div>

      <div className="cardbox-item">
        <a href="#myModal" data-toggle="modal">
          <AsyncImage className="img-responsive" src={props.postSrc} alt="MaterialImg" />
        </a>
      </div>
      <div className="cardbox-base">
        <ul>
          <ForLoop
            times={5}
            loopView={i => (
              <li key={`link-${i}`}>
                <a href="#">
                  <AsyncImage
                    src={`assets/img/users/${++i}.jpg`}
                    className="img-responsive img-circle"
                    alt="User"
                  />
                </a>
              </li>)
            }
          />
        </ul>
      </div>
      <div className="cardbox-like">
        <ul>
          <li>
            <a href="#"><i className="fa fa-heart"></i></a>
            <span> 786,286</span>
          </li>
          <li>
            <a href="#" title="" className="com"><i className="fa fa-comments"></i></a>
            <span className="span-last"> 126,400</span>
          </li>
        </ul>
      </div>
    </div>
  );
}