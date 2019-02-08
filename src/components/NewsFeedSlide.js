/* eslint-disable jsx-a11y/anchor-is-valid */

import React, { Suspense } from 'react';
import { FlatList, ForLoop } from './Utils';
import AsyncImage from './AsyncImage';

export function NewsFeedTab(props) {
  return (
    <a href="#">
      <div className="storybox" style={props.style}>
        <div className="story-body text-center">
          <div className="">
            <Suspense fallback="yes">
              <AsyncImage className="img-circle" src={props.src} alt="user" />
            </Suspense>
          </div>
          <h4>{props.name}</h4>
          <p>{props.time}</p>
        </div>
      </div>
    </a>
  )
}

export const Users = [
  {
    name: 'Eleanor Harper',
    time: (i) => `${i}hr${i > 1 ? 's' : ''} ago`,
  },
  {
    name: 'Christopher Williamsom',
    time: (i) => `${i}hr${i > 1 ? 's' : ''} ago`,
  },
  {
    name: 'Felicity Smoak',
    time: (i) => `${i}hr${i > 1 ? 's' : ''} ago`,
  }
]

export default function NewsFeedSlide() {
  const style = {
    background: `linear-gradient( rgba(34,34,34,0.78), rgba(34,34,34,0.78)), url('assets/img/posts/${1}.jpg') no-repeat`,
    backgroundSize: 'cover',
    backgroundPosition: 'center center',
    WebkitBackgroundSize: 'cover',
    MozBackgroundSize: 'cover',
    BackgroundSize: 'cover'
  };

  return (
    <section className="newsfeed">
      <div className="container-fluid">
        <div className="row">
          <div className="col-lg-3">
            <FlatList
              list={Users}
              listView={(user, i) => (
                <NewsFeedTab
                  name={user.name}
                  style={style}
                  src={`assets/img/users/${++i}.jpg`}
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

          <div className="col-lg-6">
            <FlatList
              list={Users}
              listView={(user, i) => (
                <NewsFeedCardBox
                  style={style}
                  userSrc={`assets/img/users/${1}.jpg`}
                  postSrc={`assets/img/posts/${1}.jpg`}
                  name={user.name}
                  key={`box-${i}`}
                />
              )}
            />
          </div>

          <div className="col-lg-3">
            <div className="suggestion-box full-width">
              <div className="suggestions-list">
                <FlatList
                  list={Users}
                  listView={(user, i) => (
                    <NewsFeedSuggestion
                      src={`assets/img/users/1${Math.floor(Math.random() * 7)}.jpg`}
                      name={user.name}
                      key={`sug-${i}`}
                    />
                  )}
                />
            </div>
          </div>
          <div className="trending-box">
            <div className="row">
              <div className="col-lg-12">
                <h4>Trending Photos</h4>
              </div>
            </div>
          </div>
          <div className="trending-box">
            <div className="row">
              <ForLoop
                times={3}
                loopView={i => (
                  <div className="row" key={`row-${i}`}>
                    <div className="col-lg-6">
                      <a href="#">
                        <AsyncImage
                          src={`assets/img/posts/${Math.floor(Math.random() * 20)}.jpg`}
                          className="img-responsive"
                          alt="story-pictures"
                        />
                      </a>
                    </div>
                    <div className="col-lg-6">
                      <a href="#">
                        <AsyncImage
                          src={`assets/img/posts/${Math.floor(Math.random() * 20)}.jpg`}
                          className="img-responsive"
                          alt="story-pictures"
                        />
                      </a>
                    </div>
                  </div>
                )}
              />
            </div>
          </div>
        </div>
      </div>
      </div>
    </section >
  )
}

function NewsFeedSuggestion(props) {
  return (
    <div className="suggestion-body">
      <AsyncImage className="img-responsive img-circle" src={props.src} alt="story-pictures" />
      <div className="name-box">
        <h4>{props.name}</h4>
        <span>@{props.name.split(' ')[0].toLowerCase()}</span>
      </div>
      <span><i className="fa fa-plus"></i></span>
    </div>
  );
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