import React, { useEffect, useRef } from 'react'
import Icon from './Icon';

export default function Dialog(props) {
  const div = useRef(null);
  const inner = useRef(null);
  // const [ isClicked, setIsClicked ] = useState(false);

  const style = {
    height: props.children.props.height,
    bottom: `-${props.children.props.height}`
  }

  const onClick = () => {
    props.dispatch({
      type: 'HIDE DIALOG BOX'
    })
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
      <div className="dialog-inner" ref={inner} style={style}>
        <header>
          <h3>
            {props.children.props.header || ''}
          </h3>
          <Icon name="close" onClick={onClick} />
        </header>
        { props.children }
      </div>
    </div>
  )
}
