import React from 'react';
import AsyncImage from './AsyncImage';
import Divider from './Divider';

export function UserSearchTab(i, origin, result) {
  const src = result.photoPath ? `${origin}/${result.photoPath}`
    : 'assets/img/user.png';

  return (
    <li key={`user-${i}`}>
      <div>
        <AsyncImage src={src} alt="user" />
        <div>
          <span>{result.fullName}</span>
          <span>{result.username}</span>
          <span>{result.email}</span>
          <span>{result.phone}</span>
        </div>
      </div>
      <Divider className="line" color="#f4f4f4" width="100%" />
    </li>
  );
}
