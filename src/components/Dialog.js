import React, { useEffect, useRef } from 'react'
import Icon from './Icon';

export default function Dialog(props) {
  const div = useRef(null);
  const inner = useRef(null);

  const lowerStyle = {
    height: props.lowerDialogHeight,
    bottom: `-${props.lowerDialogHeight}`
  }

  const upperStyle = {
    height: props.upperDialogHeight || '',
  }

  const onClick = () => {
    props.dispatch({
      type: 'HIDE DIALOG BOX'
    });

    props.dispatch({
      type: 'NULL POST IMAGE'
    });
  }

  useEffect(() => {
    document.documentElement.style.overflow = 'hidden';

    const x = setTimeout(() => inner.current.style.bottom = '0', 50);

    const y = setTimeout(() => div.current.style.backgroundColor = 'rgba(0, 0, 0, .6)', 250);

    return () => {
      document.documentElement.style.overflow = '';
      inner.current.style.bottom = '-50%';
      clearTimeout(x);
      clearTimeout(y);
    }
  });

  return (
    <div className="dialog" ref={div}>
      <div className="dialog-upper-section" style={upperStyle}>
        {props.upperDialog}
      </div>
      <div className="dialog-lower-section" ref={inner} style={lowerStyle}>
        <header>
          <h3>
            {props.header || ''}
          </h3>
          <Icon name="close" onClick={onClick} />
        </header>
        {props.lowerDialog}
      </div>
    </div>
  )
}
