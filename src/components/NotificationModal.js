import React from 'react';
import Dialog from './Dialog';
import NotificationDialog from './NotificationDialog';

export default function NotificationModal(props) {
  const onClose = () => {
    props.dispatch({
      type: 'NULL MODAL VIEW'
    });
  }

  return (
    <Dialog
      className={'notifications-dialog'}
      slide="bottom"
      header="NOTIFICATIONS"
      onClose={onClose}
      upperDialog={null}
      lowerDialog={
        <NotificationDialog
          dispatch={props.dispatch}
          goTo={props.goTo}
        />
      }
      lowerDialogHeight="80%"
      upperDialogHeight="20%"
    />
  )
}


