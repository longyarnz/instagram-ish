import React from 'react';
import Dialog from './Dialog';
import DialogImagePreview from './DialogImagePreview';
import CreatePostDialog from './CreatePostDialog';
import MenuDialog from './MenuDialog';

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
        <MenuDialog dispatch={props.dispatch} />
      }
      lowerDialogHeight="80%"
      upperDialogHeight="20%"
    />
  )
}