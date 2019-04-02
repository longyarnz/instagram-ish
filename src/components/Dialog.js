import React, { useEffect, useRef } from 'react'
import Icon from './Icon';

export default function Dialog(props) {
  const div = useRef(null);
  const inner = useRef(null);

  const style = {
    lower: {
      left: {
        height: props.lowerDialogHeight,
        left: '-100%'
      },
      bottom: {
        height: props.lowerDialogHeight,
        bottom: `-${props.lowerDialogHeight}`
      },
      right: {
        height: props.lowerDialogHeight,
        right: '-100%'
      }
    },
    upper: {
      height: props.upperDialogHeight || ''
    }
  }

  const onClick = props.onClose;

  useEffect(() => {
    document.documentElement.style.overflow = 'hidden';
    const y = setTimeout(
      () => div.current.style.backgroundColor = 'rgba(0, 0, 0, 0)'
    , 250);

    return () => {
      document.documentElement.style.overflow = '';
      clearTimeout(y);
    }
  });

  useEffect(() => {
    if(props.slide !== 'left') return;
    const x = setTimeout(() => inner.current.style.left = '0px', 50);
    
    return () => {
      inner.current.style.left = '-50px';
      clearTimeout(x);
    }
  });
  
  useEffect(() => {
    if(props.slide !== 'right') return;

    const x = setTimeout(() => inner.current.style.right = '0px', 50);
    
    return () => {
      inner.current.style.right = '-50px';
      clearTimeout(x);
    }
  });
  
  useEffect(() => {
    if(props.slide !== 'bottom') return;
    if(props.removeTransition) {
      inner.current.style.bottom = '0px';
      return;
    }

    const x = setTimeout(() => inner.current.style.bottom = '0px', 0);

    return () => {
      inner.current.style.bottom = '-50%';
      clearTimeout(x);
    }
  });

  const removeTransition = props.removeTransition ? {
    transition: 'none'
  } : null;

  return (
    <div className={`dialog ${props.className}`} ref={div} style={removeTransition}>
      <div className="dialog-upper-section" style={style.upper}>
        {props.upperDialog}
      </div>
      <div className="dialog-lower-section" ref={inner} style={style.lower[props.slide]}>
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
