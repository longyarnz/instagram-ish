import React from 'react';
import { FlatList } from './Utils';
import AsyncImage from './AsyncImage';
import Divider from './Divider';

function NotificationsTab(props) {
  return (
    <div className="notifications-tab">
      <div>
        <AsyncImage src={props.userSrc} alt="user" />
        <span>{props.text}</span>
      </div>
      <Divider color="#f4f4f4" width="100%" />
    </div>
  );
}

const notifications = [
  {
    userSrc: 'assets/img/users/10.jpg',
    text: 'Lorem ipsum dolor sit amet consectetur adipisicing elit.'
  },
  {
    userSrc: 'assets/img/users/11.jpg',
    text: 'Fugit quaerat reprehenderit culpa sint soluta voluptas eos illum modi sapiente maxime sequi repellendus blanditiis.'
  },
  {
    userSrc: 'assets/img/users/12.jpg',
    text: 'Explicabo corporis, veritatis sint minima voluptates sequi eligendi debitis maxime, quidem quia sunt.'
  },
  {
    userSrc: 'assets/img/users/13.jpg',
    text: 'Laboriosam architecto unde temporibus qui numquam et assumenda distinctio obcaecati sunt'
  },
];

export default function NotificationDialog(props) {
  return (
    <>
      <FlatList
        list={notifications}
        listView={(post, i) => (
          <NotificationsTab
            userSrc={post.userSrc}
            text={post.text}
            key={`tab-${i}`}
          />
        )}
      />
    </>
  )
}
