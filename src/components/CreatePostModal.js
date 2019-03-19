import React, { useMemo, useState, useEffect } from 'react';
import Dialog from './Dialog';
import DialogImagePreview from './DialogImagePreview';
import CreatePostDialog from './CreatePostDialog';

export default function CreatePostModal(props) {
  const [src, setSrc] = useState(undefined);
  const [image, setImage] = useState(null);
  const [removeTransition, setRemoveTransition] = useState(false);

  useEffect(() => {
    if(image) setRemoveTransition(true);
  }, [image]);

  const onClose = () => {
    props.dispatch({
      type: 'NULL MODAL VIEW'
    });
  };

  const upperDialog = useMemo(
    () => (
      <DialogImagePreview
        onSelect={(image) => {
          setImage(image);
        }}
        src={src}
      />
    ), [src]
  );

  const lowerDialog = useMemo(
    () => (
      <CreatePostDialog
        image={image}
        resetImage={x => {
          setImage(x);
          setSrc(x);
          setTimeout(() => {
            setSrc(undefined);
          }, 100)
        }}
        dispatch={props.dispatch}
        userId={props.state.userId}
        token={props.state.token}
        categories={props.state.categories}
      />
    ), [image]
  );

  return (
    <Dialog slide="bottom"
      className="create-post-dialog"
      header="CREATE POST"
      onClose={onClose}
      upperDialog={upperDialog}
      lowerDialog={lowerDialog}
      lowerDialogHeight="50%"
      upperDialogHeight="50%"
      removeTransition={removeTransition}
    />
  );
}