import React from 'react';
import Dialog from './Dialog';
import DialogImagePreview from './DialogImagePreview';
import CreatePostDialog from './CreatePostDialog';
import MenuDialog from './MenuDialog';
import SearchDialog from './SearchDialog';
import CommentDialog from './CommentDialog';
import NotificationDialog from './NotificationDialog';

export function CreatePostModal(props) {
  const onClose = () => {
    props.dispatch({
      type: 'HIDE DIALOG BOX'
    });

    props.dispatch({
      type: 'NULL POST IMAGE'
    });
  }

  return (
    <Dialog
      slide="bottom"
      header="CREATE POST"
      onClose={onClose}
      upperDialog={
        <DialogImagePreview
          onSelect={image => {
            props.dispatch({
              type: 'STORE POST IMAGE',
              payload: image
            })
          }}
        />
      }
      lowerDialog={
        <CreatePostDialog dispatch={props.dispatch} />
      }
      lowerDialogHeight="50%"
      upperDialogHeight="50%"
    />
  )
}

export function MenuModal(props) {
  const onClose = () => {
    props.dispatch({
      type: 'HIDE APP MENU'
    });
  }

  return (
    <Dialog
      className={props.className}
      slide="bottom"
      header="MENU"
      onClose={onClose}
      upperDialog={null}
      lowerDialog={
        <MenuDialog
          dispatch={props.dispatch}
          goTo={props.goTo}
          userIsLoggedIn={props.userIsLoggedIn}
        />
      }
      lowerDialogHeight="80%"
      upperDialogHeight="20%"
    />
  )
}

export function NotificationModal(props) {
  const onClose = () => {
    props.dispatch({
      type: 'HIDE NOTIFICATIONS'
    });
  }

  return (
    <Dialog
      className={props.className}
      slide="bottom"
      header="NOTIFICATIONS"
      onClose={onClose}
      upperDialog={null}
      lowerDialog={
        <NotificationDialog dispatch={props.dispatch} goTo={props.goTo} />
      }
      lowerDialogHeight="80%"
      upperDialogHeight="20%"
    />
  )
}

export function SearchModal(props) {
  const onClose = () => {
    props.dispatch({
      type: 'HIDE SEARCH'
    });
  }

  return (
    <Dialog
      className={props.className}
      slide="bottom"
      header="SEARCH"
      onClose={onClose}
      upperDialog={null}
      lowerDialog={
        <SearchDialog dispatch={props.dispatch} goTo={props.goTo} />
      }
      lowerDialogHeight="100%"
      upperDialogHeight="0%"
    />
  )
}

export function CommentModal(props) {
  const onClose = () => {
    props.dispatch({
      type: 'HIDE COMMENTS'
    });
  }

  return (
    <Dialog
      className={props.className}
      slide="bottom"
      header="COMMENTS"
      onClose={onClose}
      upperDialog={null}
      lowerDialog={
        <CommentDialog dispatch={props.dispatch} goTo={props.goTo} />
      }
      lowerDialogHeight="100%"
      upperDialogHeight="0%"
    />
  )
}