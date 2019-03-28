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
      className="menu-dialog"
      slide="bottom"
      header="MENU"
      onClose={onClose}
      upperDialog={null}
      lowerDialog={
        <MenuDialog
          dispatch={props.dispatch}
          goTo={props.goTo}
          userIsLoggedIn={props.state.userIsLoggedIn}
          categories={props.state.categories}
        />
      }
      lowerDialogHeight="100%"
      upperDialogHeight="0%"
    />
  );
}