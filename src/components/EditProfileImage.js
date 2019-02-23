import React from 'react';
import AsyncImage from './AsyncImage';
import PickAFile from './PickAFile';

export default function EditProfileImage(props) {
  const onSelect = image => props.onSelect && props.onSelect(image);

  return (
    <div className="edit-profile-image">
      <div>
        <AsyncImage src="assets/img/users/14.jpg" alt="profile" />
      </div>
      <div>
        <PickAFile
          width="150px"
          height="150px"
          radius="50%"
          border="2px solid #f8ba0d"
          className="pick-a-file"
          src="assets/img/bg/white.png"
          onSelect={onSelect}
          review={true}
        />
      </div>
    </div>
  )
}