import React from 'react';
import Dialog from './Dialog';
import MenuDialog from './MenuDialog';

export default function MenuModal(props) {
  const onClose = () => {
    props.dispatch({
      type: 'NULL MODAL VIEW'
    });
  };

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
  );
}