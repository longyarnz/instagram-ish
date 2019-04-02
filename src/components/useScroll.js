import { useEffect } from 'react';
import { animateScroll } from './Utils';

export default function useScroll(props) {
  const { scrollTop, view } = props.state;
  
  useEffect(() => {
    const y = setTimeout(() => {
      animateScroll(scrollTop[view]);
      props.dispatch({
        type: 'NULL SCROLL TOP',
        payload: {
          [view]: 0
        }
      });
      clearTimeout(y);
    }, 10);
    return;
  }, []);
}
