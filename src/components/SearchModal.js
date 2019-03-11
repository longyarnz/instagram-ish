import React from 'react';
import Dialog from './Dialog';
import SearchDialog from './SearchDialog';

export default function SearchModal(props) {
  const onClose = () => {
    props.dispatch({
      type: 'NULL MODAL VIEW'
    });
  };

  return (
    <Dialog
      className={'search-dialog'}
      slide="bottom"
      header="SEARCH"
      onClose={onClose}
      upperDialog={null}
      lowerDialog={
        <SearchDialog
          dispatch={props.dispatch}
          goTo={props.goTo}
        />
      }
      lowerDialogHeight="100%"
      upperDialogHeight="0%"
    />
  );
}