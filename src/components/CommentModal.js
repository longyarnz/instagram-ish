import React from 'react';
import Dialog from './Dialog';
import CommentDialog from './CommentDialog';

export default function CommentModal(props) {
  const onClose = () => {
    props.dispatch({
      type: 'NULL MODAL VIEW'
    });

    props.dispatch({
      type: 'RELOAD NEWSFEED'
    });
  };

  return (
    <Dialog
      className={'comment-dialog'}
      slide="bottom"
      header="COMMENTS"
      onClose={onClose}
      upperDialog={null}
      lowerDialog={
        <CommentDialog
          dispatch={props.dispatch}
          goTo={props.goTo}
          state={props.state}
        />
      }
      lowerDialogHeight="100%"
      upperDialogHeight="0%"
    />
  );
}