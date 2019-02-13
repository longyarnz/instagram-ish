import React from 'react';
import Icon from './Icon';

export default function AddStoryButton() {
  return (
    <div className="add-story-button" style={{
      position: 'relative',
      display: 'flex',
      justifyContent: 'center',
      alignItems: 'center',
      width: '100%',
      height: '100%',
      overflow: 'visible'
    }}>
      <div style={{
        position: 'absolute',
        borderRadius: '50%',
        backgroundColor: '#fff',
        width: 'calc(100% - 4px)',
        height: 'calc(100% - 4px)',
        top: 2,
        left: '2px',
        zIndex: 1,
        boxShadow: '0px 0px 2px rgba(0, 0, 0, .2)'
      }}>
      </div>
      <figure style={{
        width: '55px',
        height: '55px'
      }}>
        <Icon name="add" style={{
          color: '#000',
          zIndex: 2,
          textAlign: 'center'
        }} />
        <figcaption style={{
          fontSize: '10px',
          fontWeight: 400,
          textAlign: 'center'
        }}>
          Ajegunle
        </figcaption>
      </figure>
    </div>
  );
}
