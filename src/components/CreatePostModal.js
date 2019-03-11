import React from 'react';
import Dialog from './Dialog';
import DialogImagePreview from './DialogImagePreview';
import CreatePostDialog from './CreatePostDialog';

export default function CreatePostModal(props) {
  const onClose = () => {
    props.dispatch({
      type: 'NULL MODAL VIEW'
    });
  };

  return (
    <Dialog slide="bottom"
      header="CREATE POST"
      onClose={onClose} upperDialog={
        <DialogImagePreview
          onSelect={image => {
            props.dispatch({
              type: 'STORE POST IMAGE',
              payload: image
            });
          }}
        />
      }
      lowerDialog={
        <CreatePostDialog
          dispatch={props.dispatch}
        />
      }
      lowerDialogHeight="50%"
      upperDialogHeight="50%"
    />
  );
}